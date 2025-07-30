using AmazeCare.Contexts;
using AmazeCare.Interfaces;
using AmazeCare.Models;
using AmazeCare.Services;
using Microsoft.EntityFrameworkCore;

namespace AmazeCare.Service
{
    public class MedicalTestService : IMedicalTestService
    {
        private readonly AmazecareContext _context;

        public MedicalTestService(AmazecareContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MedicalTest>> GetAllMedicalTestsAsync()
        {
            return await _context.MedicalTests.ToListAsync();
        }

        public async Task<MedicalTest?> GetMedicalTestByIdAsync(int id)
        {
            return await _context.MedicalTests.FindAsync(id);
        }
    }
}
