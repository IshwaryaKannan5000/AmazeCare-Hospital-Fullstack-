using AmazeCare.Exceptions;
using AmazeCare.Interfaces;
using AmazeCare.Misc;
using AmazeCare.Models;
using AmazeCare.Models.DTOs;
using AmazeCare.Repositories;
using AmazeCare.Services;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace AmazeCare.Business
{
    public class PatientService : IPatientService
    {
        private readonly IUserRepository _userRepository; // Interface instead of class
        private readonly IPatientRepository _patientRepository;
        private readonly TokenService _tokenService;
        private readonly IEmergencyContactRepository _emergencyContactRepository;
        private readonly IMedicalRecordRepository _medicalRecordRepo;
        private readonly IPrescriptionRepository _prescriptionRepo;
        private readonly ILogger<PatientService> _logger;
        private readonly IAppointmentRepository _appointmentRepository;

        public PatientService(
            IUserRepository userRepository, // Inject interface here
            IPatientRepository patientRepository,
            TokenService tokenService,
            IEmergencyContactRepository emergencyContactRepository,
            IMedicalRecordRepository medicalRecordRepo,
            IPrescriptionRepository prescriptionRepo,
            ILogger<PatientService> logger,
            IAppointmentRepository appointmentRepository)
        {
            _userRepository = userRepository;
            _patientRepository = patientRepository;
            _tokenService = tokenService;
            _emergencyContactRepository = emergencyContactRepository;
            _medicalRecordRepo = medicalRecordRepo;
            _prescriptionRepo = prescriptionRepo;
            _logger = logger;
            _appointmentRepository = appointmentRepository;
        }




        public async Task<LoginResponseDto> RegisterPatient(PatientUserDto dto)
        {
            var existingUser = await _userRepository.GetUserByEmail(dto.Email);
            if (existingUser != null)
                throw new EmailAlreadyExistsException("Email already exists");

            var role = await _userRepository.GetRoleByName("patient");
            if (role == null)
                throw new RoleNotFoundException("Role 'patient' not found");

            // Hash the password using BCrypt
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                Password = hashedPassword, // Store hashed password
                ContactNo = dto.ContactNo,
                DateOfBirth = dto.DateOfBirth,
                Gender = dto.Gender,
                RoleId = role.RoleId,
                RoleName = "patient"
            };

            user = await _userRepository.AddUser(user);

            var patient = new Patient
            {
                UserId = user.UserId,
                
            };
            await _patientRepository.Add(patient);

            var token = _tokenService.GenerateToken(user, role.RoleName);

            return new LoginResponseDto
            {
                Token = token,
                Role = role.RoleName,
                UserId = user.UserId
            };
        }



        public async Task<IEnumerable<PatientUserViewDto>> GetAllPatients()
        {
            var patients = await _patientRepository.GetAll();

            return patients.Select(p => new PatientUserViewDto
            {
                PatientId = p.PatientId,
                UserId = p.UserId,
                FullName = p.User?.FullName ?? "",
                Email = p.User?.Email ?? "",
                ContactNo = p.User?.ContactNo ?? "",
                Gender = p.User?.Gender ?? "",
                DateOfBirth = p.User?.DateOfBirth ?? DateTime.MinValue,
                RoleName = p.User?.RoleName ?? ""
            }).ToList();
        }
        public async Task<Patient?> GetPatientByUserIdAsync(int userId)
        {
            _logger.LogInformation("Fetching patient with UserId: {UserId}", userId);

            // Get the patient by UserId
            var patient = await _patientRepository.GetPatientByUserIdAsync(userId);

            if (patient == null)
            {
                _logger.LogWarning("Patient with UserId {UserId} not found.", userId);
                return null;
            }

            _logger.LogInformation("Patient with UserId {UserId} found.", userId);
            return patient;
        }





        public async Task<bool> DeleteUserWithPatientAsync(int patientId)
        {
            // Get Patient using PatientId
            var patient = await _patientRepository.GetById(patientId);
            if (patient == null) return false;

            // Get the associated user for the patient
            var user = await _userRepository.GetById(patient.UserId);
            if (user == null) return false;

            // Change the RoleName to "inactive" instead of deleting the user
            user.RoleName = "inactive";
            await _userRepository.UpdateUser(user);  // Update the user in the repository

            

            return true;  // Successfully changed the role and preserved data
        }



        public async Task<IEnumerable<FilteredPatientDto>> FilterPatientsAsync(PatientFilterDto filters, int? sortBy = null)
        {
            var patients = await _patientRepository.GetAllWithUserDetails();
            var filtered = ApplyFilters(patients.ToList(), filters, sortBy);

            if (!filtered.Any())
                throw new PatientNotFoundException();

            // Map to DTO
            var result = filtered.Select(p => new FilteredPatientDto
            {
                PatientId = p.PatientId,
                UserId = p.UserId,
                MedicalHistory = p.MedicalHistory,
                User = new FilteredUserDto
                {
                    UserId = p.User.UserId,
                    FullName = p.User.FullName,
                    Email = p.User.Email,
                    ContactNo = p.User.ContactNo,
                    DateOfBirth = p.User.DateOfBirth,
                    Gender = p.User.Gender,
                    RoleId = p.User.RoleId,
                    RoleName = p.User.RoleName
                }
            });

            return result;
        }



        private List<Patient> SortPatients(int sortBy, List<Patient> patients)
        {
            switch (sortBy)
            {
                case -4:
                    patients = patients.OrderByDescending(p => p.User.FullName).ToList();
                    break;
                case -3:
                    patients = patients.OrderByDescending(p => p.User.DateOfBirth).ToList();
                    break;
                case -2:
                    patients = patients.OrderByDescending(p => p.User.Gender).ToList();
                    break;
                case -1:
                    patients = patients.OrderByDescending(p => p.UserId).ToList();
                    break;
                case 1:
                    patients = patients.OrderBy(p => p.UserId).ToList();
                    break;
                case 2:
                    patients = patients.OrderBy(p => p.User.FullName).ToList();
                    break;
                case 3:
                    patients = patients.OrderBy(p => p.User.DateOfBirth).ToList();
                    break;
                case 4:
                    patients = patients.OrderBy(p => p.User.Gender).ToList();
                    break;
            }

            return patients;
        }


        public List<Patient> ApplyFilters(List<Patient> patients, PatientFilterDto filters, int? sortBy = null)
        {
            var query = patients.AsQueryable();

            query = query.Where(p => p.User != null && p.User.RoleName.ToLower() == "patient");
            // Filtering
            if (!string.IsNullOrWhiteSpace(filters.FullName))
            {
                query = query.Where(p => p.User != null &&
                    p.User.FullName.ToLower().Contains(filters.FullName.ToLower()));
            }

            if (!string.IsNullOrWhiteSpace(filters.ContactNo))
            {
                query = query.Where(p => p.User != null &&
                    p.User.ContactNo.Contains(filters.ContactNo));
            }

            if (!string.IsNullOrWhiteSpace(filters.Gender))
            {
                query = query.Where(p => p.User != null &&
                    p.User.Gender.Equals(filters.Gender, StringComparison.OrdinalIgnoreCase));
            }

            if (filters.DateOfBirthRange?.From != null && filters.DateOfBirthRange?.To != null)
            {
                query = query.Where(p => p.User != null &&
                    p.User.DateOfBirth >= filters.DateOfBirthRange.From &&
                    p.User.DateOfBirth <= filters.DateOfBirthRange.To);
            }

            var result = query.ToList();

            // Sorting
            if (sortBy.HasValue)
            {
                result = SortPatients(sortBy.Value, result);
            }

            if (!result.Any())
                throw new PatientNotFoundException();

            return result;
        }

        public async Task<EmergencyContactResponseDto> AddEmergencyContactAsync(EmergencyContactDto dto)
        {
            var patient = await _patientRepository.GetById(dto.PatientId);
            if (patient == null || patient.User == null)
                throw new Exception("Patient not found");

            var contact = new EmergencyContact
            {
                PatientId = dto.PatientId,
                ContactName = dto.ContactName,
                Relationship = dto.Relationship,
                ContactPhone = dto.ContactNumber
            };

            var added = await _emergencyContactRepository.AddAsync(contact);

            return new EmergencyContactResponseDto
            {
                ContactId = added.ContactId,
                PatientId = patient.PatientId,
                PatientName = patient.User.FullName,
                ContactName = added.ContactName,
                Relationship = added.Relationship,
                ContactPhone = added.ContactPhone
            };
        }

        public async Task<List<EmergencyContactResponseDto>> GetEmergencyContactsByPatientIdAsync(int patientId)
        {
            var patient = await _patientRepository.GetById(patientId);
            if (patient == null || patient.User == null)
                throw new Exception("Patient not found");

            var contacts = await _emergencyContactRepository.GetByPatientIdAsync(patientId);

            return contacts.Select(c => new EmergencyContactResponseDto
            {
                ContactId = c.ContactId,
                PatientId = patient.PatientId,
                PatientName = patient.User.FullName,
                ContactName = c.ContactName,
                Relationship = c.Relationship,
                ContactPhone = c.ContactPhone
            }).ToList();
        }


        public async Task<bool> UpdateEmergencyContactAsync(EmergencyContactUpdateDto dto)
        {
            var contact = await _emergencyContactRepository.GetByPatientId(dto.PatientId);
            if (contact == null)
                return false;

            if (!string.IsNullOrEmpty(dto.NewContactName))
                contact.ContactName = dto.NewContactName;

            if (!string.IsNullOrEmpty(dto.NewContactNumber))
                contact.ContactPhone = dto.NewContactNumber;

            if (!string.IsNullOrEmpty(dto.NewRelationship))
                contact.Relationship = dto.NewRelationship;

            await _emergencyContactRepository.UpdateEmergencyContact(contact);
            return true;
        }

        public async Task<List<PatientMedicalHistoryDto>> GetMedicalHistoryByPatientIdAsync(int patientId)
        {
            var records = await _medicalRecordRepo.GetRecordsByPatientIdAsync(patientId);
            var result = new List<PatientMedicalHistoryDto>();

            foreach (var record in records)
            {
                // Fetch the appointment using the record's appointment ID
                var appointment = await _appointmentRepository.GetAppointmentByIdAsync(record.AppointmentId);

                // If appointment exists, include the appointment date
                var appointmentDate = appointment?.AppointmentDate ?? DateTime.MinValue;

                // Fetch prescription details for the appointment
                var prescriptionDetails = await _prescriptionRepo.GetDetailsByAppointmentId(record.AppointmentId);

                result.Add(new PatientMedicalHistoryDto
                {
                    AppointmentId = record.AppointmentId,
                    AppointmentDate = appointmentDate,
                    DoctorName = record.Doctor?.User?.FullName,
                    Symptoms = record.Symptoms,
                    Diagnosis = record.Diagnosis,
                    TreatmentPlan = record.TreatmentPlan,
                    PrescribedMedications = record.PrescribedMedications,
                    RecommendedTests = record.RecommendedTests?.Select(rt => rt.MedicalTest?.TestName ?? "N/A").ToList(),
                    PrescriptionDetails = prescriptionDetails.Select(d => new PrescriptionDetailResponseDTO
                    {
                        DetailId = d.DetailId,
                        MedicineName = d.Medicine?.MedicineName,
                        RecommendedTests = d.RecommendedTests,
                        DosageMorning = d.DosageMorning,
                        DosageAfternoon = d.DosageAfternoon,
                        DosageEvening = d.DosageEvening,
                        FoodTiming = d.FoodTiming?.TimingName
                    }).ToList()
                });
            }

            return result;
        }











    }

}
