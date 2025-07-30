export class AppointmentResponseModel {
    appointmentId = 0;
    patientId = 0;
    doctorId = 0;
    appointmentDate = "";
    symptoms = "";
    status = "";
    doctorName = "";
  
    constructor(
      appointmentId = 0,
      patientId = 0,
      doctorId = 0,
      appointmentDate = "",
      symptoms = "",
      status = "",
      doctorName = ""
    ) {
      this.appointmentId = appointmentId;
      this.patientId = patientId;
      this.doctorId = doctorId;
      this.appointmentDate = appointmentDate;
      this.symptoms = symptoms;
      this.status = status;
      this.doctorName = doctorName;
    }
  }
  