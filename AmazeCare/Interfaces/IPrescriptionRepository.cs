using AmazeCare.Models;

namespace AmazeCare.Interfaces
{
    public interface IPrescriptionRepository :  IRepository<int, Prescription>
    {
        //Task<List<PrescriptionDetail>> GetDetailsByAppointmentId(int appointmentId);
        //Task<PrescriptionDetail> AddDetail(PrescriptionDetail detail);
        //Task DeletePrescriptionAsync(Prescription prescription);
        //Task DeletePrescriptionDetailAsync(PrescriptionDetail detail);
        //Task<PrescriptionDetail?> GetDetailByIdAsync(int detailId);
        Task<List<PrescriptionDetail>> GetDetailsByAppointmentId(int appointmentId);
        Task<PrescriptionDetail> AddDetail(PrescriptionDetail detail);
        Task DeletePrescriptionAsync(Prescription prescription);
        Task DeletePrescriptionDetailAsync(PrescriptionDetail detail);
        Task<PrescriptionDetail?> GetDetailByIdAsync(int detailId);

        Task<PrescriptionDetail?> GetEnrichedDetailByIdAsync(int detailId);


    }
}
