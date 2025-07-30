using AmazeCare.Interfaces;
using AmazeCare.Models.DTOs;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AmazeCare.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientUpdateController : ControllerBase
    {
        private readonly IPatientUpdateService _updateService;

        public PatientUpdateController(IPatientUpdateService updateService)
        {
            _updateService = updateService;
        }

        [HttpPut]
        [Authorize(Roles = "patient")] // Uncomment this when role-based auth is ready
        public async Task<IActionResult> UpdatePatient([FromBody] UpdatePatientDto dto)
        {
            if (dto == null)
            {
                return BadRequest("Invalid patient data.");
            }

            try
            {
                var result = await _updateService.UpdatePatientAsync(dto);

                if (!result)
                {
                    return NotFound("Patient not found or update failed.");
                }

                return Ok("Patient details updated successfully.");
            }
            catch (Exception ex)
            {
                // Optional: log the error using ILogger
                return StatusCode(500, $"An error occurred while updating the patient: {ex.Message}");
            }
        }

    }
}
