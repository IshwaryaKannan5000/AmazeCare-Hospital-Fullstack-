using AmazeCare.Models;
using Microsoft.EntityFrameworkCore;

namespace AmazeCare.Contexts
{
    public class AmazecareContext :DbContext
    {
        public AmazecareContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Specialty> Specialties { get; set; }

        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<LoginAuth> LoginAuths { get; set; }
        public DbSet<EmergencyContact> EmergencyContacts { get; set; }


        public DbSet<MedicalRecord> MedicalRecords { get; set; }
        public DbSet<Prescription> Prescriptions { get; set; }
        public DbSet<PrescriptionDetail> PrescriptionDetails { get; set; }
        public DbSet<FoodTiming> FoodTimings { get; set; }
        public DbSet<Medicine> Medicines { get; set; }

        public DbSet<MedicalTest> MedicalTests { get; set; }
        public DbSet<RecommendedTest> RecommendedTests { get; set; }
        public DbSet<TimeSlot> TimeSlots { get; set; }






        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // User - Role Relationship
            modelBuilder.Entity<User>()
                .HasOne(u => u.Role)
                .WithMany(r => r.Users)
                .HasForeignKey(u => u.RoleId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Patient>()
               .HasOne(p => p.User)
               .WithMany()  // A User does not have multiple Patients
               .HasForeignKey(p => p.UserId)
               .OnDelete(DeleteBehavior.Cascade);

            // Doctor - User Relationship
            modelBuilder.Entity<Doctor>()
                .HasOne(d => d.User)
                .WithMany()
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // Doctor - Specialty Relationship
            modelBuilder.Entity<Doctor>()
                .HasOne(d => d.Specialty)
                .WithMany(s => s.Doctors)
                .HasForeignKey(d => d.SpecialtyId)
                .OnDelete(DeleteBehavior.Restrict);

            // Appointment - Patient Relationship
            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Patient)
                .WithMany(p => p.Appointments)
                .HasForeignKey(a => a.PatientId)
                .OnDelete(DeleteBehavior.Restrict);

            // Appointment - Doctor Relationship
            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Doctor)
                .WithMany(d => d.Appointments)
                .HasForeignKey(a => a.DoctorId)
                .OnDelete(DeleteBehavior.Restrict);

            //new fluent apis
            modelBuilder.Entity<MedicalRecord>()
                .HasIndex(m => m.AppointmentId)
                .IsUnique();

            modelBuilder.Entity<MedicalRecord>()
                .HasOne(m => m.Appointment)
                .WithOne()
                .HasForeignKey<MedicalRecord>(m => m.AppointmentId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<MedicalRecord>()
                .HasOne(m => m.Doctor)
                .WithMany()
                .HasForeignKey(m => m.DoctorId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<MedicalRecord>()
                .HasOne(m => m.Patient)
                .WithMany()
                .HasForeignKey(m => m.PatientId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Prescription>()
                .HasOne(p => p.Appointment)
                .WithMany()
                .HasForeignKey(p => p.AppointmentId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Prescription>()
                .HasOne(p => p.Doctor)
                .WithMany()
                .HasForeignKey(p => p.DoctorId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Prescription>()
                .HasOne(p => p.Patient)
                .WithMany()
                .HasForeignKey(p => p.PatientId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<PrescriptionDetail>()
                .HasOne(pd => pd.Prescription)
                .WithMany(p => p.PrescriptionDetails)
                .HasForeignKey(pd => pd.PrescriptionId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PrescriptionDetail>()
                .HasOne(pd => pd.Medicine)
                .WithMany(m => m.PrescriptionDetails)
                .HasForeignKey(pd => pd.MedicineId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<PrescriptionDetail>()
                .HasOne(pd => pd.FoodTiming)
                .WithMany(ft => ft.PrescriptionDetails)
                .HasForeignKey(pd => pd.BeforeOrAfterFood)
                .OnDelete(DeleteBehavior.Restrict);

            // MedicalTest - RecommendedTest Relationship
            modelBuilder.Entity<RecommendedTest>()
                .HasOne(rt => rt.MedicalTest)
                .WithMany(mt => mt.RecommendedTests)
                .HasForeignKey(rt => rt.MedicalTestId)
                .OnDelete(DeleteBehavior.Restrict);

            // MedicalRecord - RecommendedTest Relationship
            modelBuilder.Entity<RecommendedTest>()
                .HasOne(rt => rt.MedicalRecord)
                .WithMany(mr => mr.RecommendedTests)
                .HasForeignKey(rt => rt.MedicalRecordId);

            // Patient - EmergencyContact Relationship
            modelBuilder.Entity<EmergencyContact>()
                .HasOne(ec => ec.Patient)
                .WithMany(p => p.EmergencyContacts)
                .HasForeignKey(ec => ec.PatientId)
                .OnDelete(DeleteBehavior.Cascade); // Optional: define delete behavior

            // Doctor - TimeSlot Relationship
            modelBuilder.Entity<TimeSlot>()
                .HasOne(ts => ts.Doctor)
                .WithMany(d => d.TimeSlots)
                .HasForeignKey(ts => ts.DoctorId)
                .OnDelete(DeleteBehavior.Cascade);



        }
    }
}
