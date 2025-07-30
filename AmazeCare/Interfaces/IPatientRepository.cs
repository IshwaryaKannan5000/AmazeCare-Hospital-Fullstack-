using AmazeCare.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AmazeCare.Interfaces
{
    public interface IPatientRepository : IRepository<int, Patient>
    {
        Task<IEnumerable<Patient>> GetAll();
        Task<Patient> GetById(int id);
        Task<Patient?> GetByUserId(int userId);
        Task<bool> Update(Patient patient);

        Task<bool> DeletePatient(int userId);

        Task<IEnumerable<Patient>> GetAllWithUserDetails();

        Task<Patient?> GetPatientByUserIdAsync(int userId);





    }
}
