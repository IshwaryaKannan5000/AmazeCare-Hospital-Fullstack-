using AmazeCare.Models.DTOs;


namespace AmazeCare.Interfaces
{
    public interface IPatientUpdateService
    {
        Task<bool> UpdatePatientAsync(UpdatePatientDto dto);
       
    }
}
