using AmazeCare.Interfaces;
using AmazeCare.Models.DTOs;
using AmazeCare.Models;

namespace AmazeCare.Service
{
    public class PrescriptionService : IPrescriptionService
    {
        //private readonly IPrescriptionRepository _prescriptionRepository;

        //public PrescriptionService(IPrescriptionRepository prescriptionRepository)
        //{
        //    _prescriptionRepository = prescriptionRepository;
        //}

        //public async Task<PrescriptionResponseDTO> CreatePrescriptionAsync(PrescriptionDTO dto)
        //{
        //    var prescription = new Prescription
        //    {
        //        AppointmentId = dto.AppointmentId,
        //        DoctorId = dto.DoctorId,
        //        PatientId = dto.PatientId
        //    };

        //    var created = await _prescriptionRepository.Add(prescription);

        //    var response = new PrescriptionResponseDTO
        //    {   
        //        PrescriptionId = created.PrescriptionId,
        //        AppointmentId = created.AppointmentId,
        //        DoctorId = created.DoctorId,
        //        PatientId = created.PatientId,
        //        Details = new List<PrescriptionDetailResponseDTO>()
        //    };

        //    foreach (var detailDto in dto.Details)
        //    {
        //        var detail = new PrescriptionDetail
        //        {
        //            PrescriptionId = created.PrescriptionId,
        //            MedicineId = detailDto.MedicineId,
        //            RecommendedTests = detailDto.RecommendedTests,
        //            DosageMorning = detailDto.DosageMorning,
        //            DosageAfternoon = detailDto.DosageAfternoon,
        //            DosageEvening = detailDto.DosageEvening,
        //            BeforeOrAfterFood = detailDto.BeforeOrAfterFood
        //        };

        //        var addedDetail = await _prescriptionRepository.AddDetail(detail);

        //        // Fetch enriched data
        //        var enrichedDetail = await _prescriptionRepository.GetDetailsByAppointmentId(created.AppointmentId);
        //        var matching = enrichedDetail.FirstOrDefault(d => d.DetailId == addedDetail.DetailId);

        //        if (matching != null)
        //        {
        //            response.Details.Add(new PrescriptionDetailResponseDTO
        //            {
        //                DetailId = matching.DetailId,
        //                MedicineName = matching.Medicine?.MedicineName,
        //                RecommendedTests = matching.RecommendedTests,
        //                DosageMorning = matching.DosageMorning,
        //                DosageAfternoon = matching.DosageAfternoon,
        //                DosageEvening = matching.DosageEvening,
        //                FoodTiming = matching.FoodTiming?.TimingName
        //            });
        //        }
        //    }

        //    return response;
        //}

        ////public async Task<PrescriptionDetailResponseDTO> AddPrescriptionDetailAsync(int prescriptionId, PrescriptionDetailDTO detailDto)
        ////{
        ////    var detail = new PrescriptionDetail
        ////    {
        ////        PrescriptionId = prescriptionId,
        ////        MedicineId = detailDto.MedicineId,
        ////        RecommendedTests = detailDto.RecommendedTests,
        ////        DosageMorning = detailDto.DosageMorning,
        ////        DosageAfternoon = detailDto.DosageAfternoon,
        ////        DosageEvening = detailDto.DosageEvening,
        ////        BeforeOrAfterFood = detailDto.BeforeOrAfterFood
        ////    };

        ////    await _prescriptionRepository.AddDetail(detail);

        ////    return new PrescriptionDetailResponseDTO
        ////    {
        ////        DetailId = detail.DetailId,
        ////        MedicineName = detail.Medicine?.MedicineName,
        ////        RecommendedTests = detail.RecommendedTests,
        ////        DosageMorning = detail.DosageMorning,
        ////        DosageAfternoon = detail.DosageAfternoon,
        ////        DosageEvening = detail.DosageEvening,
        ////        FoodTiming = detail.FoodTiming?.TimingName
        ////    };
        ////}

        //public async Task<PrescriptionDetailResponseDTO> AddPrescriptionDetailAsync(int prescriptionId, PrescriptionDetailDTO detailDto)
        //{
        //    var detail = new PrescriptionDetail
        //    {
        //        PrescriptionId = prescriptionId,
        //        MedicineId = detailDto.MedicineId,
        //        RecommendedTests = detailDto.RecommendedTests,
        //        DosageMorning = detailDto.DosageMorning,
        //        DosageAfternoon = detailDto.DosageAfternoon,
        //        DosageEvening = detailDto.DosageEvening,
        //        BeforeOrAfterFood = detailDto.BeforeOrAfterFood
        //    };

        //    await _prescriptionRepository.AddDetail(detail);

        //    // NOW: Use the DetailId (which is now available) to get the enriched detail
        //    var enrichedDetail = (await _prescriptionRepository
        //        .GetDetailsByAppointmentId(prescriptionId))
        //        .FirstOrDefault(d => d.DetailId == detail.DetailId);

        //    if (enrichedDetail == null)
        //        throw new Exception("Failed to retrieve enriched detail after insert.");

        //    return new PrescriptionDetailResponseDTO
        //    {
        //        DetailId = enrichedDetail.DetailId,
        //        MedicineName = enrichedDetail.Medicine?.MedicineName,
        //        RecommendedTests = enrichedDetail.RecommendedTests,
        //        DosageMorning = enrichedDetail.DosageMorning,
        //        DosageAfternoon = enrichedDetail.DosageAfternoon,
        //        DosageEvening = enrichedDetail.DosageEvening,
        //        FoodTiming = enrichedDetail.FoodTiming?.TimingName
        //    };
        //}

        //public async Task<List<PrescriptionDetailResponseDTO>> GetPrescriptionDetailsByAppointmentIdAsync(int appointmentId)
        //{
        //    var details = await _prescriptionRepository.GetDetailsByAppointmentId(appointmentId);

        //    return details.Select(d => new PrescriptionDetailResponseDTO
        //    {
        //        DetailId = d.DetailId,
        //        MedicineName = d.Medicine?.MedicineName,
        //        RecommendedTests = d.RecommendedTests,
        //        DosageMorning = d.DosageMorning,
        //        DosageAfternoon = d.DosageAfternoon,
        //        DosageEvening = d.DosageEvening,
        //        FoodTiming = d.FoodTiming?.TimingName
        //    }).ToList();
        //}

        //public async Task<bool> DeletePrescriptionAsync(int prescriptionId)
        //{
        //    var prescription = await _prescriptionRepository.GetById(prescriptionId);
        //    if (prescription == null)
        //        throw new Exception("Prescription not found");

        //    await _prescriptionRepository.DeletePrescriptionAsync(prescription);
        //    return true;
        //}

        //public async Task<bool> DeletePrescriptionDetailAsync(int detailId)
        //{
        //    var detail = await _prescriptionRepository.GetDetailByIdAsync(detailId);
        //    if (detail == null)
        //        throw new Exception("Prescription detail not found");

        //    await _prescriptionRepository.DeletePrescriptionDetailAsync(detail);
        //    return true;
        //}
        private readonly IPrescriptionRepository _prescriptionRepository;

        public PrescriptionService(IPrescriptionRepository prescriptionRepository)
        {
            _prescriptionRepository = prescriptionRepository;
        }

        public async Task<PrescriptionResponseDTO> CreatePrescriptionAsync(PrescriptionDTO dto)
        {
            var prescription = new Prescription
            {
                AppointmentId = dto.AppointmentId,
                DoctorId = dto.DoctorId,
                PatientId = dto.PatientId
            };

            var created = await _prescriptionRepository.Add(prescription);

            var response = new PrescriptionResponseDTO
            {
                PrescriptionId = created.PrescriptionId,
                AppointmentId = created.AppointmentId,
                DoctorId = created.DoctorId,
                PatientId = created.PatientId,
                Details = new List<PrescriptionDetailResponseDTO>()
            };

            foreach (var detailDto in dto.Details)
            {
                var detail = new PrescriptionDetail
                {
                    PrescriptionId = created.PrescriptionId,
                    MedicineId = detailDto.MedicineId,
                    RecommendedTests = detailDto.RecommendedTests,
                    DosageMorning = detailDto.DosageMorning,
                    DosageAfternoon = detailDto.DosageAfternoon,
                    DosageEvening = detailDto.DosageEvening,
                    BeforeOrAfterFood = detailDto.BeforeOrAfterFood
                };

                var addedDetail = await _prescriptionRepository.AddDetail(detail);

                // Fetch enriched data
                var enrichedDetail = await _prescriptionRepository.GetDetailsByAppointmentId(created.AppointmentId);
                var matching = enrichedDetail.FirstOrDefault(d => d.DetailId == addedDetail.DetailId);

                if (matching != null)
                {
                    response.Details.Add(new PrescriptionDetailResponseDTO
                    {
                        DetailId = matching.DetailId,
                        MedicineName = matching.Medicine?.MedicineName,
                        RecommendedTests = matching.RecommendedTests,
                        DosageMorning = matching.DosageMorning,
                        DosageAfternoon = matching.DosageAfternoon,
                        DosageEvening = matching.DosageEvening,
                        FoodTiming = matching.FoodTiming?.TimingName
                    });
                }
            }

            return response;
        }

        //public async Task<PrescriptionDetailResponseDTO> AddPrescriptionDetailAsync(int prescriptionId, PrescriptionDetailDTO detailDto)
        //{
        //    var detail = new PrescriptionDetail
        //    {
        //        PrescriptionId = prescriptionId,
        //        MedicineId = detailDto.MedicineId,
        //        RecommendedTests = detailDto.RecommendedTests,
        //        DosageMorning = detailDto.DosageMorning,
        //        DosageAfternoon = detailDto.DosageAfternoon,
        //        DosageEvening = detailDto.DosageEvening,
        //        BeforeOrAfterFood = detailDto.BeforeOrAfterFood
        //    };

        //    await _prescriptionRepository.AddDetail(detail);

        //    return new PrescriptionDetailResponseDTO
        //    {
        //        DetailId = detail.DetailId,
        //        MedicineName = detail.Medicine?.MedicineName,
        //        RecommendedTests = detail.RecommendedTests,
        //        DosageMorning = detail.DosageMorning,
        //        DosageAfternoon = detail.DosageAfternoon,
        //        DosageEvening = detail.DosageEvening,
        //        FoodTiming = detail.FoodTiming?.TimingName
        //    };
        //}

        public async Task<PrescriptionDetailResponseDTO> AddPrescriptionDetailAsync(int prescriptionId, PrescriptionDetailDTO detailDto)
        {
            var detail = new PrescriptionDetail
            {
                PrescriptionId = prescriptionId,
                MedicineId = detailDto.MedicineId,
                RecommendedTests = detailDto.RecommendedTests,
                DosageMorning = detailDto.DosageMorning,
                DosageAfternoon = detailDto.DosageAfternoon,
                DosageEvening = detailDto.DosageEvening,
                BeforeOrAfterFood = detailDto.BeforeOrAfterFood
            };

            await _prescriptionRepository.AddDetail(detail);

            // NOW: Use the DetailId (which is now available) to get the enriched detail
            var enrichedDetail = await _prescriptionRepository.GetEnrichedDetailByIdAsync(detail.DetailId);


            if (enrichedDetail == null)
                throw new Exception("Failed to retrieve enriched detail after insert.");

            return new PrescriptionDetailResponseDTO
            {
                DetailId = enrichedDetail.DetailId,
                MedicineName = enrichedDetail.Medicine?.MedicineName,
                RecommendedTests = enrichedDetail.RecommendedTests,
                DosageMorning = enrichedDetail.DosageMorning,
                DosageAfternoon = enrichedDetail.DosageAfternoon,
                DosageEvening = enrichedDetail.DosageEvening,
                FoodTiming = enrichedDetail.FoodTiming?.TimingName
            };
        }

        public async Task<List<PrescriptionDetailResponseDTO>> GetPrescriptionDetailsByAppointmentIdAsync(int appointmentId)
        {
            var details = await _prescriptionRepository.GetDetailsByAppointmentId(appointmentId);

            return details.Select(d => new PrescriptionDetailResponseDTO
            {
                DetailId = d.DetailId,
                MedicineName = d.Medicine?.MedicineName,
                RecommendedTests = d.RecommendedTests,
                DosageMorning = d.DosageMorning,
                DosageAfternoon = d.DosageAfternoon,
                DosageEvening = d.DosageEvening,
                FoodTiming = d.FoodTiming?.TimingName
            }).ToList();
        }

        public async Task<bool> DeletePrescriptionAsync(int prescriptionId)
        {
            var prescription = await _prescriptionRepository.GetById(prescriptionId);
            if (prescription == null)
                throw new Exception("Prescription not found");

            await _prescriptionRepository.DeletePrescriptionAsync(prescription);
            return true;
        }

        public async Task<bool> DeletePrescriptionDetailAsync(int detailId)
        {
            var detail = await _prescriptionRepository.GetDetailByIdAsync(detailId);
            if (detail == null)
                throw new Exception("Prescription detail not found");

            await _prescriptionRepository.DeletePrescriptionDetailAsync(detail);
            return true;
        }

    }
}
