using AmazeCare.Contexts;
using AmazeCare.Models;
using Microsoft.EntityFrameworkCore;
using AmazeCare.Interfaces;

namespace AmazeCare.Repositories
{
    public class DoctorRepository : Repository<int, Doctor>, IDoctorRepository
    {
        public DoctorRepository(AmazecareContext context) : base(context)
        {
        }

        public override async Task<IEnumerable<Doctor>> GetAll()
        {
            return await _context.Doctors
                .Include(d => d.User)
                .Include(d => d.Specialty)
                .ToListAsync();
        }

        public override async Task<Doctor> GetById(int id)
        {
            return await _context.Doctors
                .Include(d => d.User)
                .Include(d => d.Specialty)
                .FirstOrDefaultAsync(d => d.DoctorId == id);
        }

        public async Task<Doctor?> GetByUserId(int userId)
        {
            return await _context.Doctors
                .Include(d => d.User)
                .Include(d => d.Specialty)
                .FirstOrDefaultAsync(d => d.UserId == userId);
        }

        public async Task<IEnumerable<Doctor>> GetDoctorsBySpecialty(int specialtyId)
        {
            return await _context.Doctors
                .Include(d => d.User)
                .Include(d => d.Specialty)
                .Where(d => d.SpecialtyId == specialtyId)
                .ToListAsync();
        }

        public async Task<bool> Update(Doctor doctor)
        {
            _context.Doctors.Update(doctor);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteDoctor(int userId)
        {
            var doctor = await _context.Doctors.FirstOrDefaultAsync(d => d.UserId == userId);
            if (doctor == null) return false;

            _context.Doctors.Remove(doctor);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
