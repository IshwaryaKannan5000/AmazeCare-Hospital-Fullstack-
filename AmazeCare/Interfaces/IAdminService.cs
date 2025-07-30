using AmazeCare.Models.DTOs;
using AmazeCare.Models;

namespace AmazeCare.Interfaces{
    public interface IAdminService
        {
        //Patient Management
        Task<AdminPatientResponseDto> AddPatientAsync(PatientDto patientDto);
        Task<bool> UpdatePatientAsync(UpdatePatientDto updatePatientDto);
        Task<bool> DeletePatientAsync(int userId);

        //Doctor Management
        Task<AdminDoctorResponseDto> AddDoctorAsync(DoctorDto doctorDto);
        Task<bool> UpdateDoctorAsync(UpdateDoctorDto updateDoctorDto);
        Task<bool> DeleteDoctorAsync(int userId);

        //Appointment management
        Task<bool> RescheduleAppointmentAsync(int appointmentId, DateTime newDate);
        Task<bool> CancelAppointmentAsync(int appointmentId);

    }
}
