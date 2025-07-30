using AmazeCare.Models.DTOs;
using AmazeCare.Models;

namespace AmazeCare.Interfaces
{
    public interface IPatientService
    {
        Task<LoginResponseDto> RegisterPatient(PatientUserDto dto);
        //Task<LoginResponseDto> Login(LoginDto dto);

        Task<Patient?> GetPatientByUserIdAsync(int userId);
        Task<IEnumerable<PatientUserViewDto>> GetAllPatients();
        Task<bool> DeleteUserWithPatientAsync(int patientId);
        Task<IEnumerable<FilteredPatientDto>> FilterPatientsAsync(PatientFilterDto filters, int? sortBy = null);
        Task<EmergencyContactResponseDto> AddEmergencyContactAsync(EmergencyContactDto dto);
        Task<bool> UpdateEmergencyContactAsync(EmergencyContactUpdateDto dto);
        Task<List<PatientMedicalHistoryDto>> GetMedicalHistoryByPatientIdAsync(int patientId);

        Task<List<EmergencyContactResponseDto>> GetEmergencyContactsByPatientIdAsync(int patientId);





    }
}
