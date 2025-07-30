using AmazeCare.Models;
using AmazeCare.Models.DTOs;

namespace AmazeCare.Interfaces
{
    public interface IPrescriptionService
    {

        Task<PrescriptionResponseDTO> CreatePrescriptionAsync(PrescriptionDTO dto);
        Task<PrescriptionDetailResponseDTO> AddPrescriptionDetailAsync(int prescriptionId, PrescriptionDetailDTO detailDto);
        Task<List<PrescriptionDetailResponseDTO>> GetPrescriptionDetailsByAppointmentIdAsync(int appointmentId);
        Task<bool> DeletePrescriptionAsync(int prescriptionId);
        Task<bool> DeletePrescriptionDetailAsync(int detailId);
    }
}
