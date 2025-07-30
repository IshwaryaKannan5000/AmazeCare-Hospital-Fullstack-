using AmazeCare.Business;
using AmazeCare.Interfaces;
using AmazeCare.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace AmazeCare.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
    public class PatientAuthController : ControllerBase
    {
        private readonly IPatientService _service;

        public PatientAuthController(IPatientService service)
        {
            _service = service;
        }



        [HttpPost("register")]
        public async Task<IActionResult> Register(PatientUserDto dto)
        {
            try
            {
                var result = await _service.RegisterPatient(dto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        

        [HttpGet("ViewAllPatients")]
        [Authorize(Roles = "patient,admin")]
        public async Task<IActionResult> GetAllPatients()
        {
            try
            {
                var patients = await _service.GetAllPatients();
                return Ok(patients);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpPost("filter")]
        [Authorize(Roles = "patient")]
        public async Task<IActionResult> FilterPatients([FromBody] PatientFilterDto filters, [FromQuery] int? sortBy = null)
        {
            try
            {
                var result = await _service.FilterPatientsAsync(filters, sortBy);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }


        [HttpDelete("delete-user-with-patient/{patientId}")]
        [Authorize(Roles = "patient,admin")]
        public async Task<IActionResult> DeleteUserWithPatient(int patientId)
        {
            try
            {
                var result = await _service.DeleteUserWithPatientAsync(patientId);
                if (!result)
                {
                    return NotFound(new { message = "User or patient not found" });
                }

                return Ok(new { message = "User and associated patient deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpPost("add-emergency-contact")]
        [Authorize(Roles = "patient")]
        public async Task<IActionResult> AddEmergencyContact([FromBody] EmergencyContactDto dto)
        {
            try
            {
                var result = await _service.AddEmergencyContactAsync(dto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // Add this inside your PatientController class

        [HttpGet("emergency-contact/{patientId}")]
        [Authorize(Roles = "patient")]
        public async Task<ActionResult<IEnumerable<EmergencyContactResponseDto>>> GetEmergencyContacts(int patientId)
        {
            try
            {
                var contacts = await _service.GetEmergencyContactsByPatientIdAsync(patientId);
                return Ok(contacts);
            }
            catch (Exception ex)
            {
                return NotFound(new { Message = ex.Message });
            }
        }



        [HttpPut("update-emergency-contact")]
        [Authorize(Roles = "patient")]
        public async Task<IActionResult> UpdateEmergencyContact([FromBody] EmergencyContactUpdateDto dto)
        {
            try
            {
                var updated = await _service.UpdateEmergencyContactAsync(dto);
                if (!updated)
                    return NotFound(new { message = "Emergency contact not found for the given patient." });

                return Ok(new { message = "Emergency contact updated successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpGet("medical-history/{patientId}")]
        [Authorize(Roles = "patient")]
        public async Task<IActionResult> GetMedicalHistory(int patientId)
        {
            try
            {
                var result = await _service.GetMedicalHistoryByPatientIdAsync(patientId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
        // New endpoint to fetch patient by UserId
        [HttpGet("get-patient-by-user/{userId}")]
        [Authorize(Roles = "patient,admin")]
        public async Task<IActionResult> GetPatientByUserIdAsync(int userId)
        {
            try
            {
                var patient = await _service.GetPatientByUserIdAsync(userId);

                if (patient == null)
                {
                    return NotFound(new { message = "Patient not found" });
                }

                return Ok(patient);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }






    }
}
