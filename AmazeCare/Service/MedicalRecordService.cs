using AmazeCare.Contexts;
using AmazeCare.Interfaces;
using AmazeCare.Models;
using AmazeCare.Models.DTOs;
namespace AmazeCare.Service
{
    public class MedicalRecordService : IMedicalRecordService
    {
        private readonly IMedicalRecordRepository _medicalRecordRepo;
        private readonly AmazecareContext _context;

        public MedicalRecordService(IMedicalRecordRepository medicalRecordRepo, AmazecareContext context)
        {
            _medicalRecordRepo = medicalRecordRepo;
            _context = context;
        }
        public async Task<List<MedicalRecordViewDto>> GetAllMedicalRecordsAsync()
        {
            // Fetch all medical records from the repository
            var records = await _medicalRecordRepo.GetAllMedicalRecords();

            if (records == null || !records.Any())
                return new List<MedicalRecordViewDto>();

            // Map the records to DTOs
            var recordDtos = records.Select(record => new MedicalRecordViewDto
            {
                RecordId = record.RecordId,
                AppointmentId = record.AppointmentId,
                PatientName = record.Patient?.User?.FullName,
                DoctorName = record.Doctor?.User?.FullName,
                Symptoms = record.Symptoms,
                Diagnosis = record.Diagnosis,
                TreatmentPlan = record.TreatmentPlan,
                PrescribedMedications = record.PrescribedMedications,
                RecommendedTestNames = record.RecommendedTests?
                    .Select(rt => rt.MedicalTest?.TestName ?? "N/A")
                    .ToList()
            }).ToList();

            return recordDtos;
        }

        public async Task<MedicalRecordViewDto> CreateMedicalRecordAsync(MedicalRecordCreateDto dto)
        {
            var record = new MedicalRecord
            {
                AppointmentId = dto.AppointmentId,
                DoctorId = dto.DoctorId,
                PatientId = dto.PatientId,
                Symptoms = dto.Symptoms,
                Diagnosis = dto.Diagnosis,
                TreatmentPlan = dto.TreatmentPlan,
                PrescribedMedications = dto.PrescribedMedications
            };

            if (dto.RecommendedTestIds != null && dto.RecommendedTestIds.Any())
            {
                record.RecommendedTests = dto.RecommendedTestIds
                    .Select(id => new RecommendedTest
                    {
                        MedicalTestId = id
                    }).ToList();
            }

            var saved = await _medicalRecordRepo.Add(record);

            await _context.SaveChangesAsync();

            return await GetMedicalRecordByAppointmentIdAsync(saved.AppointmentId)
                ?? throw new Exception("Error retrieving saved medical record.");
        }

        public async Task<MedicalRecordViewDto?> GetMedicalRecordByAppointmentIdAsync(int appointmentId)
        {
            var record = await _medicalRecordRepo.GetByAppointmentId(appointmentId);

            if (record == null) return null;

            return new MedicalRecordViewDto
            {
                RecordId = record.RecordId,
                AppointmentId = record.AppointmentId,
                PatientName = record.Patient?.User?.FullName,
                DoctorName = record.Doctor?.User?.FullName,
                Symptoms = record.Symptoms,
                Diagnosis = record.Diagnosis,
                TreatmentPlan = record.TreatmentPlan,
                PrescribedMedications = record.PrescribedMedications,
                RecommendedTestNames = record.RecommendedTests?
                    .Select(rt => rt.MedicalTest?.TestName ?? "N/A")
                    .ToList()
            };
        }

        public async Task<MedicalRecordViewDto?> UpdateMedicalRecordAsync(UpdateMedicalRecordDto dto)
        {
            var record = await _medicalRecordRepo.GetById(dto.RecordId);
            if (record == null) return null;

            // Update only if values are provided
            if (!string.IsNullOrWhiteSpace(dto.Symptoms))
                record.Symptoms = dto.Symptoms;

            if (!string.IsNullOrWhiteSpace(dto.Diagnosis))
                record.Diagnosis = dto.Diagnosis;

            if (!string.IsNullOrWhiteSpace(dto.TreatmentPlan))
                record.TreatmentPlan = dto.TreatmentPlan;

            if (!string.IsNullOrWhiteSpace(dto.PrescribedMedications))
                record.PrescribedMedications = dto.PrescribedMedications;

            // If test IDs are provided, update recommended tests
            if (dto.RecommendedTestIds != null && dto.RecommendedTestIds.Any())
            {
                record.RecommendedTests = dto.RecommendedTestIds
                    .Select(id => new RecommendedTest
                    {
                        MedicalRecordId = dto.RecordId,
                        MedicalTestId = id
                    }).ToList();
            }

            await _medicalRecordRepo.Update(record.RecordId, record);

            return await GetMedicalRecordByAppointmentIdAsync(record.AppointmentId);
        }

        public async Task<List<MedicalRecordViewDto>> GetMedicalRecordsByDoctorIdAsync(int doctorId)
        {
            var records = await _medicalRecordRepo.GetMedicalRecordsByDoctorId(doctorId);

            if (records == null || !records.Any())
                return new List<MedicalRecordViewDto>();

            var recordDtos = records.Select(record => new MedicalRecordViewDto
            {
                RecordId = record.RecordId,
                AppointmentId = record.AppointmentId,
                PatientName = record.Patient?.User?.FullName,
                DoctorName = record.Doctor?.User?.FullName,
                Symptoms = record.Symptoms,
                Diagnosis = record.Diagnosis,
                TreatmentPlan = record.TreatmentPlan,
                PrescribedMedications = record.PrescribedMedications,
                RecommendedTestNames = record.RecommendedTests?
                    .Select(rt => rt.MedicalTest?.TestName ?? "N/A")
                    .ToList()
            }).ToList();

            return recordDtos;
        }




    }
}
