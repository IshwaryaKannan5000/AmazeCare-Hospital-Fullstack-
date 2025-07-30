using AmazeCare.Contexts;
using AmazeCare.Interfaces;
using AmazeCare.Models;
using AmazeCare.Models.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AmazeCare.Repositories
{
    public class PatientRepository : Repository<int , Patient>,IPatientRepository
    {
        public PatientRepository(AmazecareContext context) : base(context)
        {

        }

        public override async Task<IEnumerable<Patient>> GetAll()
        {
            return await _context.Patients
                         .Include(p => p.User)  // Only include User
                         .ToListAsync();
        }

       

        public override async Task<Patient> GetById(int id)
        {
            return await _context.Patients.Include(p => p.User).FirstOrDefaultAsync(p => p.PatientId == id);

        }

        public async Task<Patient?> GetByUserId(int userId)
        {
            return await _context.Patients.Include(p => p.User)
                .FirstOrDefaultAsync(p => p.UserId == userId);
        }
        public async Task<Patient?> GetPatientByUserIdAsync(int userId)
        {
            return await _context.Patients
                .Include(p => p.User) // Include related User entity if necessary
                .FirstOrDefaultAsync(p => p.UserId == userId);
        }

        public async Task<bool> Update(Patient patient)
        {
            _context.Patients.Update(patient);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeletePatient(int userId)
        {
            var patient = await _context.Patients.FirstOrDefaultAsync(p => p.UserId == userId);
            if (patient == null) return false;

            _context.Patients.Remove(patient);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Patient>> GetAllWithUserDetails()
        {
            return await _context.Patients.Include(p => p.User).ToListAsync();
        }

       






    }
}
