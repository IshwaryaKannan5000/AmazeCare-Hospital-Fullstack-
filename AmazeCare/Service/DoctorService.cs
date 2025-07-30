using AmazeCare.Contexts;
using AmazeCare.Interfaces;
using AmazeCare.Models;
using AmazeCare.Models.DTOs;
using AmazeCare.Repositories;
using Microsoft.EntityFrameworkCore;

namespace AmazeCare.Service
{
    public class DoctorService : IDoctorService
    {
        //private readonly IAppointmentRepository _appointmentRepo;
        //private readonly IUserRepository _userRepo;
        //private readonly IPatientRepository _patientRepo;
        //private readonly AmazecareContext _context;
        //private readonly ITimeSlotRepository _timeSlotRepo;

        //public DoctorService(
        //    IAppointmentRepository appointmentRepo,
        //    IUserRepository userRepo,
        //    IPatientRepository patientRepo,
        //         AmazecareContext context,
        //          ITimeSlotRepository timeSlotRepo)
        //{
        //    _appointmentRepo = appointmentRepo;
        //    _userRepo = userRepo;
        //    _patientRepo = patientRepo;
        //    _context = context;
        //    _timeSlotRepo = timeSlotRepo;


        //}


        //// 1. Get doctor details by DoctorId
        //public async Task<DoctorDetailsDto?> GetDoctorDetails(int doctorId)
        //{
        //    var doctor = await _context.Doctors
        //        .Include(d => d.User) // Assuming User contains FullName, ContactNo, etc.
        //        .Include(d => d.Specialty) // Assuming Specialty contains details like name of specialty
        //        .FirstOrDefaultAsync(d => d.DoctorId == doctorId);

        //    if (doctor == null) return null;

        //    var timeSlots = await _context.TimeSlots
        //        .Where(ts => ts.DoctorId == doctorId && ts.IsAvailable)
        //        .ToListAsync();

        //    return new DoctorDetailsDto
        //    {
        //        DoctorId = doctor.DoctorId,


        //        FullName = doctor.User?.FullName ?? "N/A",
        //        Designation = doctor.Designation ?? "N/A",
        //        Specialty = doctor.Specialty?.SpecialtyName ?? "N/A",
        //        Experience = doctor.Experience ?? 0,
        //        Qualification = doctor.Qualification ?? "N/A",
        //        IsAvailable = timeSlots.Any(ts => ts.IsAvailable) // If there are available time slots
        //    };
        //}

        //// 2. Get all doctor details
        //public async Task<IEnumerable<DoctorDetailsDto>> GetAllDoctorDetails()
        //{
        //    var doctors = await _context.Doctors
        //        .Include(d => d.User)
        //        .Include(d => d.Specialty)
        //        .ToListAsync();

        //    return doctors.Select(doctor => new DoctorDetailsDto
        //    {
        //        DoctorId = doctor.DoctorId,
        //        UserId = doctor.UserId,

        //        FullName = doctor.User?.FullName ?? "N/A",
        //        Designation = doctor.Designation ?? "N/A",
        //        Specialty = doctor.Specialty?.SpecialtyName ?? "N/A",
        //        Experience = doctor.Experience ?? 0,
        //        Qualification = doctor.Qualification ?? "N/A",
        //        IsAvailable = _context.TimeSlots
        //            .Any(ts => ts.DoctorId == doctor.DoctorId && ts.IsAvailable),
        //             // Fetch RoleName from the associated User entity
        //RoleName = doctor.User?.RoleName ?? "N/A"
        //    });
        //}

        //// 3. Get appointments by DoctorId
        //public async Task<IEnumerable<AppointmentViewDto>> GetAppointmentsByDoctorId(int doctorId)
        //{
        //    var appointments = await _appointmentRepo.GetAppointmentsByDoctorIdAsync(doctorId);

        //    return appointments.Select(a => new AppointmentViewDto
        //    {
        //        AppointmentId = a.AppointmentId,
        //        AppointmentDate = a.AppointmentDate,
        //        Status = a.Status,
        //        Symptoms = a.Symptoms,
        //        PatientId = a.PatientId,
        //        PatientName = a.Patient?.User?.FullName ?? "Unknown",
        //        ContactNo = a.Patient?.User?.ContactNo ?? "N/A"
        //    });
        //}


        //public async Task<AppointmentViewDto?> UpdateAppointmentStatus(int appointmentId, string newStatus)
        //{
        //    var appointment = await _appointmentRepo.GetAppointmentByIdAsync(appointmentId);
        //    if (appointment == null)
        //        return null;

        //    appointment.Status = newStatus;

        //    var updatedAppointment = await _appointmentRepo.UpdateAppointmentAsync(appointment);
        //    if (updatedAppointment == null) return null;

        //    return new AppointmentViewDto
        //    {
        //        AppointmentId = updatedAppointment.AppointmentId,
        //        AppointmentDate = updatedAppointment.AppointmentDate,
        //        Status = updatedAppointment.Status,
        //        Symptoms = updatedAppointment.Symptoms,
        //        PatientId = updatedAppointment.PatientId,
        //        PatientName = updatedAppointment.Patient?.User?.FullName ?? "Unknown",
        //        ContactNo = updatedAppointment.Patient?.User?.ContactNo ?? "N/A"
        //    };
        //}

        //public async Task<IEnumerable<AppointmentViewDto>> FilterAppointments(int doctorId, AppointmentFilterDto filter)
        //{
        //    var appointments = await _appointmentRepo.GetAppointmentsByDoctorIdAsync(doctorId);

        //    var filtered = ApplyFilters(appointments.ToList(), filter);

        //    return filtered.Select(a => new AppointmentViewDto
        //    {
        //        AppointmentId = a.AppointmentId,
        //        AppointmentDate = a.AppointmentDate,
        //        Status = a.Status,
        //        Symptoms = a.Symptoms,
        //        PatientId = a.PatientId,
        //        PatientName = a.Patient?.User?.FullName ?? "Unknown",
        //        ContactNo = a.Patient?.User?.ContactNo ?? "N/A"
        //    });
        //}

        //public async Task<PatientDetailsDto> GetPatientDetailsForAppointment(int appointmentId)
        //{
        //    var appointment = await _appointmentRepo.GetAppointmentByIdAsync(appointmentId);
        //    if (appointment == null)
        //        throw new Exception("Appointment not found");

        //    var patient = await _patientRepo.GetById(appointment.PatientId);
        //    if (patient == null)
        //        throw new Exception("Patient not found");

        //    return new PatientDetailsDto
        //    {
        //        PatientId = patient.PatientId,
        //        FullName = patient.User?.FullName ?? "N/A",
        //        Gender = patient.User?.Gender ?? "N/A",
        //        ContactNo = patient.User?.ContactNo ?? "N/A",
        //        DateOfBirth = patient.User?.DateOfBirth ?? DateTime.MinValue,
        //        MedicalHistory = patient.MedicalHistory ?? "N/A"
        //    };
        //}

        //private List<Appointment> ApplyFilters(List<Appointment> appointments, AppointmentFilterDto filter)
        //{
        //    var query = appointments.AsQueryable();

        //    // Filter by Status (case-insensitive)
        //    if (!string.IsNullOrWhiteSpace(filter.Status))
        //    {
        //        query = query.Where(a => a.Status.Equals(filter.Status, StringComparison.OrdinalIgnoreCase));
        //    }

        //    // Filter by From Date only
        //    if (filter.DateRange?.From != null)
        //    {
        //        query = query.Where(a => a.AppointmentDate >= filter.DateRange.From.Value.Date);
        //    }

        //    // Filter by To Date only
        //    if (filter.DateRange?.To != null)
        //    {
        //        query = query.Where(a => a.AppointmentDate <= filter.DateRange.To.Value.Date);
        //    }

        //    return query.ToList();
        //}

        //public async Task<bool> IsDoctorAvailableAsync(int doctorId, DateTime desiredTime)
        //{
        //    // Check if there is an available time slot for the doctor
        //    var timeSlot = await _context.TimeSlots
        //        .Where(ts => ts.DoctorId == doctorId && ts.StartTime <= desiredTime && ts.EndTime >= desiredTime && ts.IsAvailable)
        //        .FirstOrDefaultAsync();

        //    if (timeSlot == null || !timeSlot.IsAvailable)
        //        return false; // Doctor is not available at this time.

        //    // Check if there is already an appointment at that time
        //    var appointmentExists = await _context.Appointments
        //        .Where(a => a.DoctorId == doctorId && a.AppointmentDate == desiredTime)
        //        .AnyAsync();

        //    return !appointmentExists; // Returns false if an appointment already exists at that time
        //}

        //// Method to get time slots for a specific doctor
        //public async Task<List<TimeSlotViewDto>> GetTimeSlotsForDoctorAsync(int doctorId)
        //{
        //    var timeSlots = await _timeSlotRepo.GetByDoctorId(doctorId);

        //    if (timeSlots == null || !timeSlots.Any())
        //        return null;

        //    var result = new List<TimeSlotViewDto>();

        //    foreach (var ts in timeSlots)
        //    {
        //        // Get booking count for each slot (you need a repository method for this)
        //        int bookingCount = await _appointmentRepo.GetBookingCountForSlotAsync(ts.DoctorId, ts.StartTime);

        //        result.Add(new TimeSlotViewDto
        //        {
        //            TimeSlotId = ts.TimeSlotId,
        //            DoctorId = ts.DoctorId,
        //            StartTime = ts.StartTime,
        //            EndTime = ts.EndTime,
        //            IsAvailable = ts.IsAvailable,
        //            BookingCount = bookingCount
        //        });
        //    }

        //    return result;
        //}



        //// Method to update a time slot for a doctor
        //public async Task<TimeSlotViewDto?> UpdateTimeSlotForDoctorAsync(int doctorId, int timeSlotId, TimeSlotUpdateDto updateDto)
        //{
        //    var doctorTimeSlots = await _timeSlotRepo.GetByDoctorId(doctorId);

        //    var timeSlot = doctorTimeSlots.FirstOrDefault(ts => ts.TimeSlotId == timeSlotId);
        //    if (timeSlot == null)
        //        return null;

        //    if (updateDto.StartTime.HasValue)
        //        timeSlot.StartTime = updateDto.StartTime.Value;

        //    if (updateDto.EndTime.HasValue)
        //        timeSlot.EndTime = updateDto.EndTime.Value;

        //    if (updateDto.IsAvailable.HasValue)
        //        timeSlot.IsAvailable = updateDto.IsAvailable.Value;

        //    var updated = await _timeSlotRepo.Update(timeSlotId, timeSlot);

        //    return new TimeSlotViewDto
        //    {
        //        TimeSlotId = updated.TimeSlotId,
        //        DoctorId = updated.DoctorId,
        //        StartTime = updated.StartTime,
        //        EndTime = updated.EndTime,
        //        IsAvailable = updated.IsAvailable
        //    };
        //}

        ////ive added this new code -fiza
        //public async Task<DoctorDetailsDto?> GetDoctorByUserIdAsync(int userId)
        //{
        //    var doctor = await _context.Doctors
        //        .Include(d => d.User)
        //        .Include(d => d.Specialty)
        //        .FirstOrDefaultAsync(d => d.UserId == userId);

        //    if (doctor == null)
        //        return null;

        //    var isAvailable = await _context.TimeSlots
        //        .AnyAsync(ts => ts.DoctorId == doctor.DoctorId && ts.IsAvailable);

        //    return new DoctorDetailsDto
        //    {
        //        DoctorId = doctor.DoctorId,
        //        UserId = doctor.UserId, // <-- Add this line
        //        FullName = doctor.User?.FullName ?? "N/A",
        //        Contact = doctor.User?.ContactNo ?? "N/A",
        //        Gender = doctor.User?.Gender ?? "N/A",
        //        Designation = doctor.Designation ?? "N/A",
        //        Specialty = doctor.Specialty?.SpecialtyName ?? "N/A",
        //        Experience = doctor.Experience ?? 0,
        //        Qualification = doctor.Qualification ?? "N/A",
        //        IsAvailable = isAvailable
        //    };
        //}

        //public async Task<IEnumerable<SpecialityDto>> GetAllSpecialtiesAsync()
        //{
        //    var specialties = await _context.Specialties
        //        .Select(s => new SpecialityDto
        //        {
        //            SpecialtyId = s.SpecialtyId,
        //            SpecialtyName = s.SpecialtyName
        //        })
        //        .ToListAsync();

        //    return specialties;
        //}

        private readonly IAppointmentRepository _appointmentRepo;
        private readonly IUserRepository _userRepo;
        private readonly IPatientRepository _patientRepo;
        private readonly AmazecareContext _context;
        private readonly ITimeSlotRepository _timeSlotRepo;

        public DoctorService(
            IAppointmentRepository appointmentRepo,
            IUserRepository userRepo,
            IPatientRepository patientRepo,
                 AmazecareContext context,
                  ITimeSlotRepository timeSlotRepo)
        {
            _appointmentRepo = appointmentRepo;
            _userRepo = userRepo;
            _patientRepo = patientRepo;
            _context = context;
            _timeSlotRepo = timeSlotRepo;


        }


        // 1. Get doctor details by DoctorId
        public async Task<DoctorDetailsDto?> GetDoctorDetails(int doctorId)
        {
            var doctor = await _context.Doctors
                .Include(d => d.User) // Assuming User contains FullName, ContactNo, etc.
                .Include(d => d.Specialty) // Assuming Specialty contains details like name of specialty
                .FirstOrDefaultAsync(d => d.DoctorId == doctorId);

            if (doctor == null) return null;

            var timeSlots = await _context.TimeSlots
                .Where(ts => ts.DoctorId == doctorId && ts.IsAvailable)
                .ToListAsync();

            return new DoctorDetailsDto
            {
                DoctorId = doctor.DoctorId,


                FullName = doctor.User?.FullName ?? "N/A",
                Designation = doctor.Designation ?? "N/A",
                Specialty = doctor.Specialty?.SpecialtyName ?? "N/A",
                Experience = doctor.Experience ?? 0,
                Qualification = doctor.Qualification ?? "N/A",
                IsAvailable = timeSlots.Any(ts => ts.IsAvailable) // If there are available time slots
            };
        }

        // 2. Get all doctor details
        public async Task<IEnumerable<DoctorDetailsDto>> GetAllDoctorDetails()
        {
            var doctors = await _context.Doctors
                .Include(d => d.User)
                .Include(d => d.Specialty)
                .ToListAsync();

            return doctors.Select(doctor => new DoctorDetailsDto
            {
                DoctorId = doctor.DoctorId,
                UserId = doctor.UserId,

                FullName = doctor.User?.FullName ?? "N/A",
                Designation = doctor.Designation ?? "N/A",
                Specialty = doctor.Specialty?.SpecialtyName ?? "N/A",
                Experience = doctor.Experience ?? 0,
                Qualification = doctor.Qualification ?? "N/A",
                IsAvailable = _context.TimeSlots
                    .Any(ts => ts.DoctorId == doctor.DoctorId && ts.IsAvailable),
                // Fetch RoleName from the associated User entity
                RoleName = doctor.User?.RoleName ?? "N/A"
            });
        }

        // 3. Get appointments by DoctorId
        public async Task<IEnumerable<AppointmentViewDto>> GetAppointmentsByDoctorId(int doctorId)
        {
            var appointments = await _appointmentRepo.GetAppointmentsByDoctorIdAsync(doctorId);

            return appointments.Select(a => new AppointmentViewDto
            {
                AppointmentId = a.AppointmentId,
                AppointmentDate = a.AppointmentDate,
                Status = a.Status,
                Symptoms = a.Symptoms,
                PatientId = a.PatientId,
                PatientName = a.Patient?.User?.FullName ?? "Unknown",
                ContactNo = a.Patient?.User?.ContactNo ?? "N/A"
            });
        }


        public async Task<AppointmentViewDto?> UpdateAppointmentStatus(int appointmentId, string newStatus)
        {
            var appointment = await _appointmentRepo.GetAppointmentByIdAsync(appointmentId);
            if (appointment == null)
                return null;

            appointment.Status = newStatus;

            var updatedAppointment = await _appointmentRepo.UpdateAppointmentAsync(appointment);
            if (updatedAppointment == null) return null;

            return new AppointmentViewDto
            {
                AppointmentId = updatedAppointment.AppointmentId,
                AppointmentDate = updatedAppointment.AppointmentDate,
                Status = updatedAppointment.Status,
                Symptoms = updatedAppointment.Symptoms,
                PatientId = updatedAppointment.PatientId,
                PatientName = updatedAppointment.Patient?.User?.FullName ?? "Unknown",
                ContactNo = updatedAppointment.Patient?.User?.ContactNo ?? "N/A"
            };
        }

        public async Task<IEnumerable<AppointmentViewDto>> FilterAppointments(int doctorId, AppointmentFilterDto filter)
        {
            var appointments = await _appointmentRepo.GetAppointmentsByDoctorIdAsync(doctorId);

            var filtered = ApplyFilters(appointments.ToList(), filter);

            return filtered.Select(a => new AppointmentViewDto
            {
                AppointmentId = a.AppointmentId,
                AppointmentDate = a.AppointmentDate,
                Status = a.Status,
                Symptoms = a.Symptoms,
                PatientId = a.PatientId,
                PatientName = a.Patient?.User?.FullName ?? "Unknown",
                ContactNo = a.Patient?.User?.ContactNo ?? "N/A"
            });
        }

        public async Task<PatientDetailsDto> GetPatientDetailsForAppointment(int appointmentId)
        {
            var appointment = await _appointmentRepo.GetAppointmentByIdAsync(appointmentId);
            if (appointment == null)
                throw new Exception("Appointment not found");

            var patient = await _patientRepo.GetById(appointment.PatientId);
            if (patient == null)
                throw new Exception("Patient not found");

            return new PatientDetailsDto
            {
                PatientId = patient.PatientId,
                FullName = patient.User?.FullName ?? "N/A",
                Gender = patient.User?.Gender ?? "N/A",
                ContactNo = patient.User?.ContactNo ?? "N/A",
                DateOfBirth = patient.User?.DateOfBirth ?? DateTime.MinValue,
                MedicalHistory = patient.MedicalHistory ?? "N/A"
            };
        }

        private List<Appointment> ApplyFilters(List<Appointment> appointments, AppointmentFilterDto filter)
        {
            var query = appointments.AsQueryable();

            // Filter by Status (case-insensitive)
            if (!string.IsNullOrWhiteSpace(filter.Status))
            {
                query = query.Where(a => a.Status.Equals(filter.Status, StringComparison.OrdinalIgnoreCase));
            }

            // Filter by From Date only
            if (filter.DateRange?.From != null)
            {
                query = query.Where(a => a.AppointmentDate >= filter.DateRange.From.Value.Date);
            }

            // Filter by To Date only
            if (filter.DateRange?.To != null)
            {
                query = query.Where(a => a.AppointmentDate <= filter.DateRange.To.Value.Date);
            }

            return query.ToList();
        }

        public async Task<bool> IsDoctorAvailableAsync(int doctorId, DateTime desiredTime)
        {
            // Check if there is an available time slot for the doctor
            var timeSlot = await _context.TimeSlots
                .Where(ts => ts.DoctorId == doctorId && ts.StartTime <= desiredTime && ts.EndTime >= desiredTime && ts.IsAvailable)
                .FirstOrDefaultAsync();

            if (timeSlot == null || !timeSlot.IsAvailable)
                return false; // Doctor is not available at this time.

            // Check if there is already an appointment at that time
            var appointmentExists = await _context.Appointments
                .Where(a => a.DoctorId == doctorId && a.AppointmentDate == desiredTime)
                .AnyAsync();

            return !appointmentExists; // Returns false if an appointment already exists at that time
        }

        // Method to get time slots for a specific doctor
        public async Task<List<TimeSlotViewDto>> GetTimeSlotsForDoctorAsync(int doctorId)
        {
            var timeSlots = await _timeSlotRepo.GetByDoctorId(doctorId);

            if (timeSlots == null || !timeSlots.Any())
                return null;

            var result = new List<TimeSlotViewDto>();

            foreach (var ts in timeSlots)
            {
                // Get booking count for each slot (you need a repository method for this)
                int bookingCount = await _appointmentRepo.GetBookingCountForSlotAsync(ts.DoctorId, ts.StartTime);

                result.Add(new TimeSlotViewDto
                {
                    TimeSlotId = ts.TimeSlotId,
                    DoctorId = ts.DoctorId,
                    StartTime = ts.StartTime,
                    EndTime = ts.EndTime,
                    IsAvailable = ts.IsAvailable,
                    BookingCount = bookingCount
                });
            }

            return result;
        }

        public async Task<TimeSlotViewDto> AddTimeSlotForDoctorAsync(int doctorId, TimeSlotCreateDto createDto)
        {
            var newTimeSlot = new TimeSlot
            {
                DoctorId = doctorId,
                StartTime = createDto.StartTime,
                EndTime = createDto.EndTime,
                IsAvailable = createDto.IsAvailable
            };

            var createdSlot = await _timeSlotRepo.Add(newTimeSlot);

            return new TimeSlotViewDto
            {
                TimeSlotId = createdSlot.TimeSlotId,
                DoctorId = createdSlot.DoctorId,
                StartTime = createdSlot.StartTime,
                EndTime = createdSlot.EndTime,
                IsAvailable = createdSlot.IsAvailable
            };
        }




        // Method to update a time slot for a doctor
        public async Task<TimeSlotViewDto?> UpdateTimeSlotForDoctorAsync(int doctorId, int timeSlotId, TimeSlotUpdateDto updateDto)
        {
            var doctorTimeSlots = await _timeSlotRepo.GetByDoctorId(doctorId);

            var timeSlot = doctorTimeSlots.FirstOrDefault(ts => ts.TimeSlotId == timeSlotId);
            if (timeSlot == null)
                return null;

            if (updateDto.StartTime.HasValue)
                timeSlot.StartTime = updateDto.StartTime.Value;

            if (updateDto.EndTime.HasValue)
                timeSlot.EndTime = updateDto.EndTime.Value;

            if (updateDto.IsAvailable.HasValue)
                timeSlot.IsAvailable = updateDto.IsAvailable.Value;

            var updated = await _timeSlotRepo.Update(timeSlotId, timeSlot);

            return new TimeSlotViewDto
            {
                TimeSlotId = updated.TimeSlotId,
                DoctorId = updated.DoctorId,
                StartTime = updated.StartTime,
                EndTime = updated.EndTime,
                IsAvailable = updated.IsAvailable
            };
        }

        //ive added this new code -fiza
        public async Task<DoctorDetailsDto?> GetDoctorByUserIdAsync(int userId)
        {
            var doctor = await _context.Doctors
                .Include(d => d.User)
                .Include(d => d.Specialty)
                .FirstOrDefaultAsync(d => d.UserId == userId);

            if (doctor == null)
                return null;

            var isAvailable = await _context.TimeSlots
                .AnyAsync(ts => ts.DoctorId == doctor.DoctorId && ts.IsAvailable);

            return new DoctorDetailsDto
            {
                DoctorId = doctor.DoctorId,
                UserId = doctor.UserId, // <-- Add this line
                FullName = doctor.User?.FullName ?? "N/A",
                Contact = doctor.User?.ContactNo ?? "N/A",
                Gender = doctor.User?.Gender ?? "N/A",
                Designation = doctor.Designation ?? "N/A",
                Specialty = doctor.Specialty?.SpecialtyName ?? "N/A",
                Experience = doctor.Experience ?? 0,
                Qualification = doctor.Qualification ?? "N/A",
                IsAvailable = isAvailable
            };
        }

        public async Task<IEnumerable<SpecialityDto>> GetAllSpecialtiesAsync()
        {
            var specialties = await _context.Specialties
                .Select(s => new SpecialityDto
                {
                    SpecialtyId = s.SpecialtyId,
                    SpecialtyName = s.SpecialtyName
                })
                .ToListAsync();

            return specialties;
        }


    }
}
