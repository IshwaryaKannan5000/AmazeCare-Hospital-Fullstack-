using AmazeCare.Interfaces;
using AmazeCare.Models;
using AmazeCare.Models.DTOs;
using AmazeCare.Service;
using AutoMapper;

namespace AmazeCare.Services
{
    public class AppointmentService : IAppointmentService
    {
        private readonly IAppointmentRepository _repository;
        private readonly IDoctorService _doctorService;
        private readonly IMapper _mapper;
        private readonly ILogger<AppointmentService> _logger;

        public AppointmentService(IAppointmentRepository repository,
                                   IDoctorService doctorService,
                                      IMapper mapper,
                                      ILogger<AppointmentService> logger)
        {
            _repository = repository;
            _doctorService = doctorService;
            _mapper = mapper;
            _logger = logger;

        }

        public async Task<AppointmentResponseDto> ScheduleAppointmentAsync(AppointmentDto dto)
        {

            _logger.LogInformation("Attempting to schedule appointment for patient {PatientId} with doctor {DoctorId} at {AppointmentDate}",
               dto.PatientId, dto.DoctorId, dto.AppointmentDate);

            // Step 1: Check if patient already booked this doctor at the same time
            var existingAppointment = await _repository.GetExistingAppointmentAsync(dto.PatientId, dto.DoctorId, dto.AppointmentDate);
            if (existingAppointment != null)
            {
                _logger.LogWarning("Duplicate appointment attempt for patient {PatientId} with doctor {DoctorId} at {AppointmentDate}",
                    dto.PatientId, dto.DoctorId, dto.AppointmentDate);
                throw new Exception("You have already booked with the same doctor at the same time. Please choose another slot.");
            }

            // Step 2: Check if doctor is available at the requested time
            bool isAvailable = await _doctorService.IsDoctorAvailableAsync(dto.DoctorId, dto.AppointmentDate);
            if (!isAvailable)
            {
                _logger.LogWarning("Doctor {DoctorId} not available at {AppointmentDate}", dto.DoctorId, dto.AppointmentDate);
                throw new Exception("The doctor is not available at this time. Please choose a different slot.");
            }

            // Step 3: Check if the slot is already fully booked (max of 7 bookings)
            int bookingCount = await _repository.GetBookingCountForSlotAsync(dto.DoctorId, dto.AppointmentDate);
            if (bookingCount >= 7)
            {
                _logger.LogWarning("The requested time slot is fully booked for doctor {DoctorId} at {AppointmentDate}", dto.DoctorId, dto.AppointmentDate);
                throw new Exception("The time slot is already fully booked. Please choose another time.");
            }

            var appointment = _mapper.Map<Appointment>(dto);
            appointment.Status = "Pending";


            var savedAppointment = await _repository.ScheduleAppointmentAsync(appointment);
            _logger.LogInformation("Appointment successfully scheduled. Appointment ID: {AppointmentId}", savedAppointment.AppointmentId);

            return _mapper.Map<AppointmentResponseDto>(savedAppointment);
        }





        public async Task<IEnumerable<AppointmentResponseDto>> GetAppointmentsByPatientIdAsync(int patientId)
        {
            _logger.LogInformation("Retrieving appointments for patient ID: {PatientId}", patientId);
            var appointments = await _repository.GetAppointmentsByPatientIdAsync(patientId);

            return _mapper.Map<IEnumerable<AppointmentResponseDto>>(appointments);
        }


        public async Task<bool> DeleteAppointmentAsync(int appointmentId)
        {
            _logger.LogInformation("Deleting appointment with ID: {AppointmentId}", appointmentId);
            return await _repository.DeleteAppointmentAsync(appointmentId);
        }

        public async Task<IEnumerable<Appointment>> GetAppointmentsByDoctorIdAsync(int doctorId)
        {
            _logger.LogInformation("Fetching appointments for doctor ID: {DoctorId}", doctorId);
            return await _repository.GetAppointmentsByDoctorIdAsync(doctorId);
        }

        public async Task<Appointment?> GetAppointmentByIdAsync(int appointmentId)
        {
            _logger.LogInformation("Fetching appointment by ID: {AppointmentId}", appointmentId);
            return await _repository.GetAppointmentByIdAsync(appointmentId);
        }

        public async Task<Appointment?> UpdateAppointmentAsync(AppointmentDto dto)
        {
            _logger.LogInformation("Updating appointment for PatientId: {PatientId} and DoctorId: {DoctorId} on {AppointmentDate}",
               dto.PatientId, dto.DoctorId, dto.AppointmentDate);
            var appointment = new Appointment
            {
               // ✅ Ensure AppointmentDto includes this
                PatientId = dto.PatientId,
                DoctorId = dto.DoctorId,
                AppointmentDate = dto.AppointmentDate,
                Symptoms = dto.Symptoms,
                
            };

            return await _repository.UpdateAppointmentAsync(appointment);
        }

        public async Task<bool> CancelAppointmentAsync(int appointmentId)
        {
            _logger.LogInformation("Canceling appointment with ID: {AppointmentId}", appointmentId);
            var success = await _repository.DeleteAppointmentAsync(appointmentId);
            if (success)
            {
                _logger.LogInformation("Appointment with ID: {AppointmentId} successfully canceled", appointmentId);
            }
            else
            {
                _logger.LogWarning("Failed to cancel appointment with ID: {AppointmentId}. Appointment not found.", appointmentId);
            }
            return success;
        }


        public async Task<IEnumerable<AppointmentResponseDto>> GetAllAppointmentsAsync()
        {
            _logger.LogInformation("Fetching all appointments for admin view");

            var appointments = await _repository.GetAllAppointmentsAsync();

            return _mapper.Map<IEnumerable<AppointmentResponseDto>>(appointments);
        }

    }
}
