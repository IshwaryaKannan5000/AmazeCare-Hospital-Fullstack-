using AmazeCare.Models;


namespace AmazeCare.Interfaces
{
    public interface IDoctorRepository : IRepository<int,Doctor>
    {
        Task<Doctor?> GetByUserId(int userId);
        Task<IEnumerable<Doctor>> GetDoctorsBySpecialty(int specialtyId);
        Task<bool> Update(Doctor doctor); 
        Task<bool> DeleteDoctor(int userId);

    }
}
