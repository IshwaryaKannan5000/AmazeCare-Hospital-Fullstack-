using AmazeCare.Interfaces;
using AmazeCare.Models.DTOs;
using AmazeCare.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace AmazeCare.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedicalRecordController : Controller
    {
        private readonly IMedicalRecordService _medicalRecordService;

        public MedicalRecordController(IMedicalRecordService medicalRecordService)
        {
            _medicalRecordService = medicalRecordService;
        }

        // POST api/medicalrecord
        [HttpPost]
        [Authorize(Roles = "doctor")]
        public async Task<ActionResult<MedicalRecordViewDto>> CreateMedicalRecordAsync([FromBody] MedicalRecordCreateDto dto)
        {
            if (dto == null)
                return BadRequest("Medical record data is required.");

            try
            {
                var response = await _medicalRecordService.CreateMedicalRecordAsync(dto);
                return Created($"api/medicalrecord/appointment/{response.AppointmentId}", response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An unexpected error occurred while creating the medical record. {ex.Message}");
            }
        }

        [HttpGet]
        [Authorize(Roles = "doctor, admin")]
        public async Task<ActionResult<List<MedicalRecordViewDto>>> GetAllMedicalRecordsAsync()
        {
            try
            {
                var records = await _medicalRecordService.GetAllMedicalRecordsAsync();
                return Ok(records);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving all medical records. {ex.Message}");
            }
        }

        [HttpGet("doctor/{doctorId}")]
        [Authorize(Roles = "doctor")]
        public async Task<ActionResult<List<MedicalRecordViewDto>>> GetMedicalRecordsByDoctorId(int doctorId)
        {
            var records = await _medicalRecordService.GetMedicalRecordsByDoctorIdAsync(doctorId);

            if (records == null || records.Count == 0)
                return NotFound("No medical records found for this doctor.");

            return Ok(records);
        }


        // PUT api/medicalrecord
        [HttpPut]
        [Authorize(Roles = "doctor")]
        public async Task<ActionResult<MedicalRecordViewDto>> UpdateMedicalRecordAsync([FromBody] UpdateMedicalRecordDto dto)
        {
            if (dto == null)
                return BadRequest("Medical record update data is required.");

            try
            {
                var updated = await _medicalRecordService.UpdateMedicalRecordAsync(dto);
                if (updated == null)
                    return NotFound($"Medical record with ID {dto.RecordId} not found.");

                return Ok(updated);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while updating the medical record. {ex.Message}");
            }
        }

        // GET api/medicalrecord/appointment/{appointmentId}
        [HttpGet("appointment/{appointmentId}")]
        [Authorize(Roles = "doctor")]
        public async Task<ActionResult<MedicalRecordViewDto>> GetMedicalRecordByAppointmentIdAsync(int appointmentId)
        {
            try
            {
                var record = await _medicalRecordService.GetMedicalRecordByAppointmentIdAsync(appointmentId);
                if (record == null)
                    return NotFound($"No medical record found for appointment ID {appointmentId}.");

                return Ok(record);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving the medical record. {ex.Message}");
            }
        }
    }
}
