using AmazeCare.Models;

namespace AmazeCare.Interfaces
{
    public interface IEmergencyContactRepository
    {
        Task<EmergencyContact?> GetByPatientId(int patientId);
        Task<EmergencyContact> AddAsync(EmergencyContact contact);
        Task UpdateAsync(EmergencyContact contact);
        Task UpdateEmergencyContact(EmergencyContact contact);
        Task<bool> DeleteEmergencyContact(int patientId);

        Task<List<EmergencyContact>> GetByPatientIdAsync(int patientId);


    }
}

