using AmazeCare.Interfaces;
using AmazeCare.Models;
using Microsoft.AspNetCore.Mvc;

namespace AmazeCare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicalTestController : ControllerBase
    {
        private readonly IMedicalTestService _medicalTestService;

        public MedicalTestController(IMedicalTestService medicalTestService)
        {
            _medicalTestService = medicalTestService;
        }

        // GET: api/MedicalTest
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedicalTest>>> GetAllMedicalTests()
        {
            var tests = await _medicalTestService.GetAllMedicalTestsAsync();
            return Ok(tests);
        }

        // GET: api/MedicalTest/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<MedicalTest>> GetMedicalTestById(int id)
        {
            var test = await _medicalTestService.GetMedicalTestByIdAsync(id);
            if (test == null)
                return NotFound($"Medical test with ID {id} not found.");
            return Ok(test);
        }
    }
}
