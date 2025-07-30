// Services/MedicineService.cs
using AmazeCare.Contexts;
using AmazeCare.Interfaces;
using AmazeCare.Models;
using Microsoft.EntityFrameworkCore;

namespace AmazeCare.Service
{
    public class MedicineService : IMedicineService
    {
        private readonly AmazecareContext _context;

        public MedicineService(AmazecareContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Medicine>> GetAllMedicinesAsync()
        {
            return await _context.Medicines.ToListAsync();
        }

        public async Task<Medicine?> GetMedicineByIdAsync(int id)
        {
            return await _context.Medicines.FindAsync(id);
        }
    }
}
