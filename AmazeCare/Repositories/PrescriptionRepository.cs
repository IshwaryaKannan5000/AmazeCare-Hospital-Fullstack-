using AmazeCare.Contexts;
using AmazeCare.Models;
using Microsoft.EntityFrameworkCore;
using AmazeCare.Interfaces;

namespace AmazeCare.Repositories
{
    public class PrescriptionRepository : Repository<int, Prescription>, IPrescriptionRepository
    {
        //public PrescriptionRepository(AmazecareContext context) : base(context) { }

        //public override async Task<IEnumerable<Prescription>> GetAll()
        //{
        //    return await _context.Prescriptions.ToListAsync();
        //}

        //public override async Task<Prescription> GetById(int id)
        //{
        //    return await _context.Prescriptions.FirstOrDefaultAsync(p => p.PrescriptionId == id);
        //}

        //public async Task<List<PrescriptionDetail>> GetDetailsByAppointmentId(int appointmentId)
        //{
        //    return await _context.PrescriptionDetails
        //        .Include(p => p.Medicine)
        //        .Include(p => p.FoodTiming)
        //        .Include(p => p.Prescription) // 👈 needed to access AppointmentId
        //        .Where(p => p.Prescription != null && p.Prescription.AppointmentId == appointmentId)
        //        .ToListAsync();
        //}

        //public async Task<Prescription> Add(Prescription prescription)
        //{
        //    _context.Prescriptions.Add(prescription);
        //    await _context.SaveChangesAsync();
        //    return prescription;
        //}




        //public async Task<PrescriptionDetail> AddDetail(PrescriptionDetail detail)
        //{
        //    _context.PrescriptionDetails.Add(detail);
        //    await _context.SaveChangesAsync();
        //    return detail;
        //}


        //public async Task DeletePrescriptionAsync(Prescription prescription)
        //{
        //    // Remove associated details first (if cascade delete is not configured in DB)
        //    var details = await _context.PrescriptionDetails
        //                                .Where(d => d.PrescriptionId == prescription.PrescriptionId)
        //                                .ToListAsync();

        //    if (details.Any())
        //        _context.PrescriptionDetails.RemoveRange(details);

        //    _context.Prescriptions.Remove(prescription);
        //    await _context.SaveChangesAsync();
        //}

        //public async Task DeletePrescriptionDetailAsync(PrescriptionDetail detail)
        //{
        //    _context.PrescriptionDetails.Remove(detail);
        //    await _context.SaveChangesAsync();
        //}

        //public async Task<PrescriptionDetail?> GetDetailByIdAsync(int detailId)
        //{
        //    return await _context.PrescriptionDetails
        //        .Include(d => d.Medicine)
        //        .Include(d => d.FoodTiming)
        //        .FirstOrDefaultAsync(d => d.DetailId == detailId);
        //}

        public PrescriptionRepository(AmazecareContext context) : base(context) { }

        public override async Task<IEnumerable<Prescription>> GetAll()
        {
            return await _context.Prescriptions.ToListAsync();
        }

        public override async Task<Prescription> GetById(int id)
        {
            return await _context.Prescriptions.FirstOrDefaultAsync(p => p.PrescriptionId == id);
        }

        public async Task<List<PrescriptionDetail>> GetDetailsByAppointmentId(int appointmentId)
        {
            return await _context.PrescriptionDetails
                .Include(p => p.Medicine)
                .Include(p => p.FoodTiming)
                .Include(p => p.Prescription) // 👈 needed to access AppointmentId
                .Where(p => p.Prescription != null && p.Prescription.AppointmentId == appointmentId)
                .ToListAsync();
        }

        public async Task<Prescription> Add(Prescription prescription)
        {
            _context.Prescriptions.Add(prescription);
            await _context.SaveChangesAsync();
            return prescription;
        }


        public async Task<PrescriptionDetail> AddDetail(PrescriptionDetail detail)
        {
            _context.PrescriptionDetails.Add(detail);
            await _context.SaveChangesAsync();
            return detail;
        }


        public async Task DeletePrescriptionAsync(Prescription prescription)
        {
            // Remove associated details first (if cascade delete is not configured in DB)
            var details = await _context.PrescriptionDetails
                                        .Where(d => d.PrescriptionId == prescription.PrescriptionId)
                                        .ToListAsync();

            if (details.Any())
                _context.PrescriptionDetails.RemoveRange(details);

            _context.Prescriptions.Remove(prescription);
            await _context.SaveChangesAsync();
        }

        public async Task DeletePrescriptionDetailAsync(PrescriptionDetail detail)
        {
            _context.PrescriptionDetails.Remove(detail);
            await _context.SaveChangesAsync();
        }

        public async Task<PrescriptionDetail?> GetDetailByIdAsync(int detailId)
        {
            return await _context.PrescriptionDetails
                .Include(d => d.Medicine)
                .Include(d => d.FoodTiming)
                .FirstOrDefaultAsync(d => d.DetailId == detailId);
        }
        // ✅ NEW: Fetch enriched detail by DetailId (not appointmentId)
        public async Task<PrescriptionDetail?> GetEnrichedDetailByIdAsync(int detailId)
        {
            return await _context.PrescriptionDetails
                .Include(d => d.Medicine)
                .Include(d => d.FoodTiming)
                .FirstOrDefaultAsync(d => d.DetailId == detailId);
        }

    }
}
