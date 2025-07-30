using AmazeCare.Interfaces;
using AmazeCare.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AmazeCare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : Controller
    {
        private readonly IDoctorService _doctorService;

        public DoctorController(IDoctorService doctorService)
        {
            _doctorService = doctorService;
        }

        // 1. Get doctor details by DoctorId
        [HttpGet("{doctorId}")]
        public async Task<ActionResult<DoctorDetailsDto>> GetDoctorDetails(int doctorId)
        {
            var doctorDetails = await _doctorService.GetDoctorDetails(doctorId);

            if (doctorDetails == null)
            {
                return NotFound(new { message = "Doctor not found" });
            }

            return Ok(doctorDetails);
        }

        // 2. Get all doctor details
        [HttpGet("all")]
        [Authorize(Roles = "patient,doctor,admin")]
        public async Task<ActionResult<IEnumerable<DoctorDetailsDto>>> GetAllDoctorDetails()
        {
            var doctors = await _doctorService.GetAllDoctorDetails();

            if (doctors == null || !doctors.Any())
            {
                return NotFound(new { message = "No doctors found" });
            }

            return Ok(doctors);
        }


        [HttpGet("{doctorId}/availability")]
        [Authorize(Roles = "patient")]
        public async Task<IActionResult> CheckDoctorAvailability(int doctorId, [FromQuery] DateTime desiredTime)
        {
            // Check if the doctor is available
            var isAvailable = await _doctorService.IsDoctorAvailableAsync(doctorId, desiredTime);
            if (isAvailable)
            {
                return Ok(new { message = "Doctor is available at the desired time." });
            }
            else
            {
                return Conflict(new { message = "Doctor is not available at the desired time." });
            }
        }
        // Get time slots for a doctor
        [HttpGet("{doctorId}/timeslots")]
        [Authorize(Roles = "patient,doctor")]

        public async Task<IActionResult> GetDoctorTimeSlots(int doctorId)
        {
            var timeSlots = await _doctorService.GetTimeSlotsForDoctorAsync(doctorId);
            if (timeSlots == null || timeSlots.Count == 0)
                return NotFound(new { message = "No time slots found for this doctor." });



            return Ok(timeSlots);
        }

        // Update a specific time slot for a doctor
        [HttpPut("{doctorId}/timeslots/{timeSlotId}")]
        [Authorize(Roles = "doctor")]

        public async Task<IActionResult> UpdateTimeSlotForDoctorAsync(int doctorId, int timeSlotId, [FromBody] TimeSlotUpdateDto updateDto)
        {
            var updatedTimeSlot = await _doctorService.UpdateTimeSlotForDoctorAsync(doctorId, timeSlotId, updateDto);

            if (updatedTimeSlot == null)
                return NotFound(new { message = "Time slot not found for the specified doctor." });

            return Ok(updatedTimeSlot);
        }
        [HttpGet("{doctorId}/appointments")]
        [Authorize(Roles = "doctor")]
        public async Task<IActionResult> GetAppointments(int doctorId)
        {
            var appointments = await _doctorService.GetAppointmentsByDoctorId(doctorId);
            return Ok(appointments);
        }

        [HttpPut("appointment/{appointmentId}/status")]
        [Authorize(Roles = "patient,doctor")]
        public async Task<IActionResult> UpdateStatus(int appointmentId, [FromBody] string newStatus)
        {
            var result = await _doctorService.UpdateAppointmentStatus(appointmentId, newStatus);
            if (result == null) return NotFound("Appointment not found");
            return Ok(result);
        }

        [HttpPost("{doctorId}/appointments/filter")]
        [Authorize(Roles = "doctor")]
        public async Task<IActionResult> FilterAppointments(int doctorId, [FromBody] AppointmentFilterDto filter)
        {
            var filtered = await _doctorService.FilterAppointments(doctorId, filter);
            return Ok(filtered);
        }

        [HttpGet("appointment/{appointmentId}/patient")]
        [Authorize(Roles = "doctor")]
        public async Task<IActionResult> GetPatientDetails(int appointmentId)
        {
            var patientDetails = await _doctorService.GetPatientDetailsForAppointment(appointmentId);
            return Ok(patientDetails);
        }

        [HttpGet("get-doctor-by-user/{userId}")]
        [Authorize(Roles = "doctor,admin")]
        public async Task<IActionResult> GetDoctorByUserId(int userId)
        {
            var doctorDetails = await _doctorService.GetDoctorByUserIdAsync(userId);

            if (doctorDetails == null)
            {
                return NotFound(new { Message = $"Doctor with UserId {userId} not found." });
            }

            return Ok(doctorDetails);
        }

        [HttpGet("get-all-specialties")]
        [Authorize(Roles = "doctor,admin")]

        public async Task<ActionResult<IEnumerable<SpecialityDto>>> GetAllSpecialties()
        {
            var specialties = await _doctorService.GetAllSpecialtiesAsync();
            return Ok(specialties);
        }

        [HttpPost("{doctorId}/timeslots")]
        public async Task<IActionResult> AddTimeSlot(int doctorId, [FromBody] TimeSlotCreateDto createDto)
        {
            if (createDto == null)
                return BadRequest(new { message = "Invalid time slot data." });

            var createdSlot = await _doctorService.AddTimeSlotForDoctorAsync(doctorId, createDto);

            if (createdSlot == null)
                return StatusCode(500, new { message = "Failed to add time slot." });

            return Ok(createdSlot);
        }

    }
}
