import React, { useEffect, useState } from 'react';
import './Prescription.css';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';


const Prescription = () => {
  const [patientId, setPatientId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [prescriptions, setPrescriptions] = useState({});
  const [patientName, setPatientName] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [doctorFilter, setDoctorFilter] = useState('');



  const fetchPatientId = async (userId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ No token found in localStorage.");
      return null;
    }
    try {
      const response = await fetch(`http://localhost:5207/api/PatientAuth/get-patient-by-user/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      // console.log("Patient data response:", data); // ✅ Log full response

      setPatientName(data.user.fullName);
 
    
      return data.patientId;
    } catch (error) {
      console.error('Error fetching patient ID:', error);
      return null;
    }
  };

  const fetchAppointments = async (pid) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ No token found in localStorage.");
      return null;
    }
    try {
      const response = await fetch(`http://localhost:5207/api/Appointment/patient/${pid}`,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },

      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      data.sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchPrescriptionsForAppointments = async (appointments) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("❌ No token found in localStorage.");
      return;
    }
    const allPrescriptions = {};
    for (const appointment of appointments) {
      try {
        const res = await fetch(`http://localhost:5207/api/prescription/appointment/${appointment.appointmentId}`,{
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          if (res.status === 404) continue;
          throw new Error(`Error fetching prescription for appointment ${appointment.appointmentId}: ${res.statusText}`);
        }
        const data = await res.json();
        if (data && data.length > 0) {
          allPrescriptions[appointment.appointmentId] = data;
        }
      } catch (error) {
        console.error(`Error fetching prescription for appointment ${appointment.appointmentId}:`, error);
      }
    }
    setPrescriptions(allPrescriptions);
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      fetchPatientId(storedUserId).then(pid => {
        if (pid) {
          setPatientId(pid);
          fetchAppointments(pid);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (appointments.length > 0) {
      fetchPrescriptionsForAppointments(appointments);
    }
  }, [appointments]);

  const handleDateClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
  
    if (selectedAppointment) {
      doc.text(`Appointment ID: ${selectedAppointment.appointmentId}`, 10, 10);
      doc.text(`Date: ${new Date(selectedAppointment.appointmentDate).toLocaleString()}`, 10, 20);
      doc.text(`Doctor: ${selectedAppointment.doctorName}`, 10, 30);
      doc.text(`Symptoms: ${selectedAppointment.symptoms}`, 10, 40);
      doc.text(`Patient: ${patientName}`, 10, 50);
    

  
      const prescriptionData = prescriptions[selectedAppointment.appointmentId];
  
      if (prescriptionData && prescriptionData.length > 0) {
        const tableColumn = ["Medicine", "Recommended Tests", "Morning", "Afternoon", "Evening", "Food Timing"];
        const tableRows = prescriptionData.map(p => [
          p.medicineName,
          p.recommendedTests,
          p.dosageMorning,
          p.dosageAfternoon,
          p.dosageEvening,
          p.foodTiming,
        ]);
  
        autoTable(doc, {
            startY: 70,
            head: [tableColumn],
            body: tableRows,
          });
          
      } else {
        doc.text("No prescriptions available.", 10, 50);
      }
  
      doc.save("prescription.pdf");
    }
  };
  

  const isPastAppointment = (dateString) => {
    const appointmentDate = new Date(dateString);
    return appointmentDate < new Date(); // Return true only if in the past
  };

  const filteredAppointments = appointments.filter(app => {
    const matchesDate = dateFilter ? new Date(app.appointmentDate).toLocaleDateString() === new Date(dateFilter).toLocaleDateString() : true;
    const matchesDoctor = doctorFilter ? app.doctorName.toLowerCase().includes(doctorFilter.toLowerCase()) : true;
    return matchesDate && matchesDoctor;
  });

  return (
    <div className="prescription-container">
      <h2>Prescription History</h2>
      <div className="prescription-filters">
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="filter-date"
          placeholder="Filter by Date"
        />
        <input
          type="text"
          value={doctorFilter}
          onChange={(e) => setDoctorFilter(e.target.value)}
          className="filter-doctor"
          placeholder="Filter by Doctor Name"
        />
      </div>

      {filteredAppointments.length === 0 ? (
        <p>No appointments found.</p>
      )  : (
        <div className="appointments-list">
          
          {filteredAppointments
            .filter(app => app.status === "Completed" && prescriptions[app.appointmentId])
            .map((app, index) => (
            prescriptions[app.appointmentId] ? (
              <div
                key={app.appointmentId}
                className={`appointment-card ${index === 0 && isPastAppointment(app.appointmentDate) ? 'recent' : ''}`}
                onClick={() => handleDateClick(app)}
              >
                <h3>{new Date(app.appointmentDate).toLocaleString()}</h3>
                <p><strong>Doctor:</strong> {app.doctorName}</p>
                <p><strong>Symptoms:</strong> {app.symptoms}</p>
              </div>
            ) : null
          ))}
        </div>
      )}

      {selectedAppointment && (
        <div className="selected-appointment-details">
          <h3>Prescription  Details</h3>
          <p><strong>Doctor:</strong> {selectedAppointment.doctorName}</p>
          <p><strong>Patient:</strong> {patientName}</p>
          


          {prescriptions[selectedAppointment.appointmentId]?.length > 0 ? (
            <table className="prescription-table">
              <thead>
                <tr>
                  <th>Medicine</th>
                  <th>Recommended Tests</th>
                  <th>Dosage (Morning)</th>
                  <th>Dosage (Afternoon)</th>
                  <th>Dosage (Evening)</th>
                  <th>Food Timing</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions[selectedAppointment.appointmentId].map((pres, index) => (
                  <tr key={index}>
                    <td>{pres.medicineName}</td>
                    <td>{pres.recommendedTests}</td>
                    <td>{pres.dosageMorning}</td>
                    <td>{pres.dosageAfternoon}</td>
                    <td>{pres.dosageEvening}</td>
                    <td>{pres.foodTiming}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No prescription for this appointment.</p>
          )}

          <div className="buttons">
            <button onClick={handleDownloadPDF}>Download as PDF</button>
            <button onClick={() => setSelectedAppointment(null)}>Back</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prescription;
