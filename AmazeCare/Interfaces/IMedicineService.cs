using AmazeCare.Models;

namespace AmazeCare.Interfaces
{
    public interface IMedicineService
    {

        Task<IEnumerable<Medicine>> GetAllMedicinesAsync();
        Task<Medicine?> GetMedicineByIdAsync(int id);
    }
}
