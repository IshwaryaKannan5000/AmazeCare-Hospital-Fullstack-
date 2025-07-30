using AmazeCare.Models;
using AmazeCare.Models.DTOs;

namespace AmazeCare.Services
{
    public interface IAppointmentService
    {
        Task<AppointmentResponseDto> ScheduleAppointmentAsync(AppointmentDto dto);
        Task<IEnumerable<AppointmentResponseDto>> GetAppointmentsByPatientIdAsync(int patientId);
        Task<bool> DeleteAppointmentAsync(int appointmentId);

        Task<IEnumerable<Appointment>> GetAppointmentsByDoctorIdAsync(int doctorId); //  NEW
        Task<Appointment?> GetAppointmentByIdAsync(int appointmentId);                //  NEW
        Task<Appointment?> UpdateAppointmentAsync(AppointmentDto dto); //new

        Task<bool> CancelAppointmentAsync(int appointmentId);

        Task<IEnumerable<AppointmentResponseDto>> GetAllAppointmentsAsync();
    }
}

