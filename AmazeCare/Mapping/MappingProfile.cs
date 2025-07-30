using AmazeCare.Models.DTOs;
using AmazeCare.Models;
using AutoMapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Two-way mapping between Appointment and AppointmentDto
        CreateMap<Appointment, AppointmentDto>();
        CreateMap<AppointmentDto, Appointment>();

        // One-way mapping from Appointment to AppointmentResponseDto
        //CreateMap<Appointment, AppointmentResponseDto>()
        //     .ForMember(dest => dest.DoctorName,
        //                opt => opt.MapFrom(src => src.Doctor.User.FullName));


        // One-way mapping from Appointment to AppointmentResponseDto
        CreateMap<Appointment, AppointmentResponseDto>()
            .ForMember(dest => dest.DoctorName,
                       opt => opt.MapFrom(src => src.Doctor.User.FullName))
            .ForMember(dest => dest.PatientName,
                       opt => opt.MapFrom(src => src.Patient.User.FullName));

    }
}