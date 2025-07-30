using AmazeCare.Contexts;
using AmazeCare.Models;
using AmazeCare.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AmazeCare.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoleController : ControllerBase
    {
        private readonly AmazecareContext _context;

        public RoleController(AmazecareContext context)
        {
            _context = context;
        }

        // POST: api/Role
        [HttpPost]
        public async Task<ActionResult<Role>> AddRole(RoleDto roleDto)
        {
            if (await _context.Roles.AnyAsync(r => r.RoleName.ToLower() == roleDto.RoleName.ToLower()))
            {
                return BadRequest(new { message = "Role already exists" });
            }

            var role = new Role
            {
                RoleName = roleDto.RoleName
            };

            _context.Roles.Add(role);
            await _context.SaveChangesAsync();

            return Ok(role);
        }

        // GET: api/Role
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role>>> GetAllRoles()
        {
            return await _context.Roles.ToListAsync();
        }
    }
}
