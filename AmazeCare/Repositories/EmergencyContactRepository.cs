using AmazeCare.Contexts;
using AmazeCare.Interfaces;
using AmazeCare.Models;
using Microsoft.EntityFrameworkCore;

namespace AmazeCare.Repositories
{
    public class EmergencyContactRepository : IEmergencyContactRepository
    {
        private readonly AmazecareContext _context;

        public EmergencyContactRepository(AmazecareContext context)
        {
            _context = context;
        }

        public async Task<EmergencyContact> AddAsync(EmergencyContact contact)
        {
            _context.EmergencyContacts.Add(contact);
            await _context.SaveChangesAsync();
            return contact;
        }

        public async Task<EmergencyContact?> GetByPatientId(int patientId)
        {
            return await _context.EmergencyContacts.FirstOrDefaultAsync(e => e.PatientId == patientId);
        }

        public async Task UpdateAsync(EmergencyContact contact)
        {
            _context.EmergencyContacts.Update(contact);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateEmergencyContact(EmergencyContact contact)
        {
            _context.EmergencyContacts.Update(contact);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteEmergencyContact(int patientId)
        {
            var contact = await _context.EmergencyContacts
                .FirstOrDefaultAsync(c => c.PatientId == patientId);

            if (contact == null)
                return false;

            _context.EmergencyContacts.Remove(contact);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<EmergencyContact>> GetByPatientIdAsync(int patientId)
        {
            return await _context.EmergencyContacts
                .Where(ec => ec.PatientId == patientId)
                .ToListAsync();
        }




    }
}
