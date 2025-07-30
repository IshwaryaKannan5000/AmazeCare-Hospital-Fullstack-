using AmazeCare.Models;
using AmazeCare.Interfaces;
using AmazeCare.Contexts;
using Microsoft.EntityFrameworkCore;

namespace AmazeCare.Repositories
{
    public class TimeSlotRepository : Repository<int, TimeSlot>, ITimeSlotRepository
    {
        //public TimeSlotRepository(AmazecareContext context) : base(context)
        //{
        //}

        //public override async Task<IEnumerable<TimeSlot>> GetAll()
        //{
        //    return await _context.TimeSlots
        //        .Include(ts => ts.Doctor)
        //        .ToListAsync();
        //}

        //public override async Task<TimeSlot> GetById(int id)
        //{
        //    return await _context.TimeSlots
        //        .Include(ts => ts.Doctor)
        //        .FirstOrDefaultAsync(ts => ts.TimeSlotId == id);
        //}

        //public async Task<IEnumerable<TimeSlot>> GetByDoctorId(int doctorId)
        //{
        //    return await _context.TimeSlots
        //        .Where(ts => ts.DoctorId == doctorId)
        //        .OrderBy(ts => ts.StartTime)
        //        .ToListAsync();
        //}

        //public async Task<bool> AddTimeSlotForDoctor(TimeSlot timeSlot)
        //{
        //    await _context.TimeSlots.AddAsync(timeSlot);
        //    await _context.SaveChangesAsync();
        //    return true;
        //}

        //public async Task<bool> DeleteTimeSlot(int timeSlotId)
        //{
        //    var slot = await _context.TimeSlots.FirstOrDefaultAsync(ts => ts.TimeSlotId == timeSlotId);
        //    if (slot == null) return false;

        //    _context.TimeSlots.Remove(slot);
        //    await _context.SaveChangesAsync();
        //    return true;
        //}

        public TimeSlotRepository(AmazecareContext context) : base(context)
        {
        }

        public override async Task<IEnumerable<TimeSlot>> GetAll()
        {
            return await _context.TimeSlots
                .Include(ts => ts.Doctor)
                .ToListAsync();
        }

        public override async Task<TimeSlot> GetById(int id)
        {
            return await _context.TimeSlots
                .Include(ts => ts.Doctor)
                .FirstOrDefaultAsync(ts => ts.TimeSlotId == id);
        }

        public async Task<IEnumerable<TimeSlot>> GetByDoctorId(int doctorId)
        {
            return await _context.TimeSlots
                .Where(ts => ts.DoctorId == doctorId)
                .OrderBy(ts => ts.StartTime)
                .ToListAsync();
        }

        public async Task<bool> AddTimeSlotForDoctor(TimeSlot timeSlot)
        {
            await _context.TimeSlots.AddAsync(timeSlot);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteTimeSlot(int timeSlotId)
        {
            var slot = await _context.TimeSlots.FirstOrDefaultAsync(ts => ts.TimeSlotId == timeSlotId);
            if (slot == null) return false;

            _context.TimeSlots.Remove(slot);
            await _context.SaveChangesAsync();
            return true;
        }


    }
}