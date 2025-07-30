using AmazeCare.Contexts;
using AmazeCare.Interfaces;
using AmazeCare.Models;
using Microsoft.EntityFrameworkCore;

namespace AmazeCare.Repositories
{
    public class AppointmentRepository : IAppointmentRepository
    {
        private readonly AmazecareContext _context;

        public AppointmentRepository(AmazecareContext context)
        {
            _context = context;
        }

        public async Task<Appointment> ScheduleAppointmentAsync(Appointment appointment)
        {
            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();
            return appointment;
        }

        public async Task<IEnumerable<Appointment>> GetAppointmentsByPatientIdAsync(int patientId)
        {
            return await _context.Appointments
                .Include(a => a.Doctor).ThenInclude(d => d.User)
                .Include(a => a.Patient).ThenInclude(p => p.User)
                .Where(a => a.PatientId == patientId)
                .ToListAsync();
        }

        public async Task<bool> DeleteAppointmentAsync(int appointmentId)
        {
            var appointment = await _context.Appointments.FindAsync(appointmentId);
            if (appointment == null) return false;

            _context.Appointments.Remove(appointment);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Appointment>> GetAppointmentsByDoctorIdAsync(int doctorId)
        {
            return await _context.Appointments
                .Include(a => a.Patient)
                    .ThenInclude(p => p.User)
                .Where(a => a.DoctorId == doctorId)
                .ToListAsync();
        }


        //  NEW: Get appointment by ID
        public async Task<Appointment?> GetAppointmentByIdAsync(int appointmentId)
        {
            return await _context.Appointments
                .Include(a => a.Doctor).ThenInclude(d => d.User)
                .Include(a => a.Patient).ThenInclude(p => p.User)
                .FirstOrDefaultAsync(a => a.AppointmentId == appointmentId);
        }

        // NEW: Update appointment
        public async Task<Appointment?> UpdateAppointmentAsync(Appointment updatedAppointment)
        {
            var existingAppointment = await _context.Appointments.FindAsync(updatedAppointment.AppointmentId);

            if (existingAppointment == null)
                return null;

            existingAppointment.PatientId = updatedAppointment.PatientId;
            existingAppointment.DoctorId = updatedAppointment.DoctorId;
            existingAppointment.AppointmentDate = updatedAppointment.AppointmentDate;
            existingAppointment.Symptoms = updatedAppointment.Symptoms;
            existingAppointment.Status = updatedAppointment.Status;

            await _context.SaveChangesAsync();

            return existingAppointment;
        }

        public async Task<Appointment?> GetExistingAppointmentAsync(int patientId, int doctorId, DateTime appointmentDate)
        {
            return await _context.Appointments.FirstOrDefaultAsync(a =>
                a.PatientId == patientId &&
                a.DoctorId == doctorId &&
                a.AppointmentDate == appointmentDate);
        }

        public async Task<int> GetBookingCountForSlotAsync(int doctorId, DateTime appointmentDate)
        {
            return await _context.Appointments
                .Where(a => a.DoctorId == doctorId && a.AppointmentDate == appointmentDate)
                .CountAsync();
        }
        public async Task<IEnumerable<Appointment>> GetAllAppointmentsAsync()
        {
            return await _context.Appointments
                .Include(a => a.Doctor).ThenInclude(d => d.User)
                .Include(a => a.Patient).ThenInclude(p => p.User)
                .ToListAsync();
        }



    }
}
