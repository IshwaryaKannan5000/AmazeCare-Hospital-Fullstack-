using AmazeCare.Models;
using AmazeCare.Models.DTOs;

namespace AmazeCare.Interfaces
{
    public interface IMedicalRecordService
    {
        Task<MedicalRecordViewDto> CreateMedicalRecordAsync(MedicalRecordCreateDto dto);

        // Get a medical record by appointment ID
        Task<MedicalRecordViewDto?> GetMedicalRecordByAppointmentIdAsync(int appointmentId);

        // Update an existing medical record (if you're using the entity directly for updates)
        Task<MedicalRecordViewDto?> UpdateMedicalRecordAsync(UpdateMedicalRecordDto dto);

        // New method to get all medical records
        Task<List<MedicalRecordViewDto>> GetAllMedicalRecordsAsync();

        Task<List<MedicalRecordViewDto>> GetMedicalRecordsByDoctorIdAsync(int doctorId);
    }
}
