using AmazeCare.Interfaces;
using AmazeCare.Models;
using AmazeCare.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AmazeCare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        //----------------- Patient APIs-------------------------------
        [HttpPost("add-patient")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<AdminPatientResponseDto>> AddPatient([FromBody] PatientDto patientDto)
        {
            var response = await _adminService.AddPatientAsync(patientDto);
            return Ok(response);
        }

        // PUT: api/Admin/UpdatePatient
        [HttpPut("UpdatePatient")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdatePatient([FromBody] UpdatePatientDto updatePatientDto)
        {
            var success = await _adminService.UpdatePatientAsync(updatePatientDto);
            if (success)
                return Ok("Patient updated successfully.");
            return BadRequest("Update failed.");
        }


        [HttpDelete("delete-patient/{userId}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeletePatient(int userId)
        {
            var deleted = await _adminService.DeletePatientAsync(userId);

            if (deleted)
                return Ok(new { Message = "Patient deleted successfully." });
            else
                return NotFound(new { Message = "Patient not found or could not be deleted." });
        }

        // ---------- Doctor APIs ----------

        [HttpPost("add-doctor")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<AdminDoctorResponseDto>> AddDoctor([FromBody] DoctorDto doctorDto)
        {
            var response = await _adminService.AddDoctorAsync(doctorDto);
            return Ok(response);
        }

        [HttpPut("update-doctor")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateDoctor([FromBody] UpdateDoctorDto updateDoctorDto)
        {
            var success = await _adminService.UpdateDoctorAsync(updateDoctorDto);
            if (success)
                return Ok("Doctor updated successfully.");
            return BadRequest("Doctor update failed.");
        }

        [HttpDelete("delete-doctor/{userId}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteDoctor(int userId)
        {
            var deleted = await _adminService.DeleteDoctorAsync(userId);
            if (deleted)
                return Ok(new { Message = "Doctor deleted successfully." });
            return NotFound(new { Message = "Doctor not found or could not be deleted." });
        }

        [HttpPut("reschedule-appointment/{appointmentId}")]
        [Authorize(Roles = "admin,doctor")]
        public async Task<IActionResult> RescheduleAppointment(int appointmentId, [FromQuery] DateTime newDate)
        {
            var success = await _adminService.RescheduleAppointmentAsync(appointmentId, newDate);
            if (success)
                return Ok(new { message = "Appointment rescheduled successfully." });

            return BadRequest(new { message = "Failed to reschedule appointment." });
        }


        [HttpDelete("cancel-appointment/{appointmentId}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> CancelAppointment(int appointmentId)
        {
            var canceled = await _adminService.CancelAppointmentAsync(appointmentId);
            if (canceled) return Ok("Appointment cancelled successfully.");
            return NotFound("Appointment not found.");
        }


    }
}
