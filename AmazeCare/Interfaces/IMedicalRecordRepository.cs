using AmazeCare.Models;

namespace AmazeCare.Interfaces
{
    public interface IMedicalRecordRepository : IRepository<int, MedicalRecord>
    {
        Task<MedicalRecord?> GetByAppointmentId(int appointmentId);
        Task<IEnumerable<MedicalRecord>> GetRecordsByPatientIdAsync(int patientId);
        Task<List<MedicalRecord>> GetAllMedicalRecords();
        Task<List<MedicalRecord>> GetMedicalRecordsByDoctorId(int doctorId);


    }
}
