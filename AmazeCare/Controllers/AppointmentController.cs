using AmazeCare.Models.DTOs;
using AmazeCare.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AmazeCare.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentService _service;

        public AppointmentController(IAppointmentService service)
        {
            _service = service;
        }

        [HttpPost("schedule")]
        [Authorize(Roles = "patient")]
        public async Task<IActionResult> Schedule([FromBody] AppointmentDto dto)
        {
            if (dto == null)
                return BadRequest(new { message = "Appointment data is required." });

            try
            {
                var result = await _service.ScheduleAppointmentAsync(dto);

                return Ok(new
                {
                    message = "Doctor is available. Appointment successfully booked!",
                    appointment = result
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        [HttpGet("patient/{patientId}")]
        [Authorize(Roles = "patient")]
        public async Task<IActionResult> GetByPatient(int patientId)
        {
            var appointments = await _service.GetAppointmentsByPatientIdAsync(patientId);
            return Ok(appointments);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "patient")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteAppointmentAsync(id);
            if (!success) return NotFound("Appointment not found");
            return Ok("Deleted successfully");
        }

        [HttpDelete("cancel/{id}")]
        [Authorize(Roles = "patient")]
        public async Task<IActionResult> Cancel(int id)
        {
            var success = await _service.CancelAppointmentAsync(id);

            if (!success)
                return NotFound(new { message = "Appointment not found or already canceled." });

            return Ok(new { message = "Appointment successfully canceled." });
        }

        [HttpGet("all")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetAllAppointments()
        {
            var appointments = await _service.GetAllAppointmentsAsync();
            return Ok(appointments);
        }



    }
}
