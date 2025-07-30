namespace AmazeCare.Models.DTOs
{
    public class AppointmentDto
{
   
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string? Symptoms { get; set; }
       
        
    }
}

