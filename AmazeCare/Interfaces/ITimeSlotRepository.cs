using AmazeCare.Models;

namespace AmazeCare.Interfaces
{
    public interface ITimeSlotRepository : IRepository<int, TimeSlot>
    {
        Task<IEnumerable<TimeSlot>> GetByDoctorId(int doctorId);
        Task<bool> AddTimeSlotForDoctor(TimeSlot timeSlot);
        Task<bool> DeleteTimeSlot(int timeSlotId);
    }
}
