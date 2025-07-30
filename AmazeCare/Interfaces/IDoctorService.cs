using AmazeCare.Models;
using AmazeCare.Models.DTOs;
namespace AmazeCare.Interfaces

{
    public interface IDoctorService
    {
        Task<IEnumerable<AppointmentViewDto>> GetAppointmentsByDoctorId(int doctorId);
        Task<AppointmentViewDto?> UpdateAppointmentStatus(int appointmentId, string newStatus);
        Task<IEnumerable<AppointmentViewDto>> FilterAppointments(int doctorId, AppointmentFilterDto filter);
        Task<PatientDetailsDto> GetPatientDetailsForAppointment(int appointmentId);
        Task<bool> IsDoctorAvailableAsync(int doctorId, DateTime desiredTime);
        Task<List<TimeSlotViewDto>> GetTimeSlotsForDoctorAsync(int doctorId);
        Task<TimeSlotViewDto?> UpdateTimeSlotForDoctorAsync(int doctorId, int timeSlotId, TimeSlotUpdateDto updateDto);

        Task<IEnumerable<DoctorDetailsDto>> GetAllDoctorDetails();  // To fetch all doctors
        Task<DoctorDetailsDto?> GetDoctorDetails(int doctorId);  // To fetch specific doctor by ID

        Task<DoctorDetailsDto?> GetDoctorByUserIdAsync(int userId);

        Task<IEnumerable<SpecialityDto>> GetAllSpecialtiesAsync();

        Task<TimeSlotViewDto> AddTimeSlotForDoctorAsync(int doctorId, TimeSlotCreateDto createDto);
    }
}
