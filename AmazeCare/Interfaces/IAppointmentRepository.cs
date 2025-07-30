using AmazeCare.Models;

namespace AmazeCare.Interfaces
{
    public interface IAppointmentRepository
    {
        Task<Appointment> ScheduleAppointmentAsync(Appointment appointment);
        Task<IEnumerable<Appointment>> GetAppointmentsByPatientIdAsync(int patientId);
        Task<bool> DeleteAppointmentAsync(int appointmentId);

        Task<IEnumerable<Appointment>> GetAppointmentsByDoctorIdAsync(int doctorId);


        // ✅ NEW: Get appointment by its ID
        Task<Appointment?> GetAppointmentByIdAsync(int appointmentId);

        // ✅ NEW: Update an existing appointment (if you want to avoid delete & re-add)
        Task<Appointment?> UpdateAppointmentAsync(Appointment appointment);

        Task<Appointment?> GetExistingAppointmentAsync(int patientId, int doctorId, DateTime appointmentDate);

        // ✅ NEW: Get the count of appointments for a doctor at a specific time slot
        Task<int> GetBookingCountForSlotAsync(int doctorId, DateTime appointmentDate);

        Task<IEnumerable<Appointment>> GetAllAppointmentsAsync();
    }
}
