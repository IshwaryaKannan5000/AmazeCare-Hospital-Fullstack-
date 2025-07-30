using AmazeCare.Models;

namespace AmazeCare.Interfaces
{
    public interface IMedicalTestService
    {
        Task<IEnumerable<MedicalTest>> GetAllMedicalTestsAsync();
        Task<MedicalTest?> GetMedicalTestByIdAsync(int id);
    }
}
