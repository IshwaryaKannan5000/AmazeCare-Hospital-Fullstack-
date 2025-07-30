import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarSection = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      fetchPatientIdByUserId(storedUserId)
        .then(patient => {
          setPatientId(patient.patientId);
        })
        .catch(error => {
          console.error("Error fetching patient ID:", error);
        });
    } else {
      console.error('No userId found in localStorage!');
    }
  }, []);

  useEffect(() => {
    if (patientId) {
      fetchAppointments(patientId)
        .then(appointments => {
          setAppointments(appointments);
        })
        .catch(error => {
          console.error("Error fetching appointments:", error);
        });
    }
  }, [patientId]);

  // Fetch appointments based on patientId from the API
  const fetchAppointments = async (patientId) => {
    try {
      const response = await fetch(`http://localhost:5207/api/Appointment/patient/${patientId}`);
      const data = await response.json();
      return data.filter(app => app.status === 'Accepted');
    } catch (error) {
      console.error("Error fetching appointments:", error);
      return [];
    }
  };

  // Filter the first upcoming date
  const upcomingAppointments = appointments
    .filter(app => new Date(app.appointmentDate) > new Date()) // Filter only future appointments
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate)); // Sort by date ascending

  const highlightDate = upcomingAppointments.length > 0 ? new Date(upcomingAppointments[0].appointmentDate).toISOString().split('T')[0] : null;

  // Function to apply CSS class to the highlighted date
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      if (dateStr === highlightDate) {
        return 'highlight-date'; // Add green background to the first upcoming appointment
      }
    }
    return null;
  };

  return (
    <div className="pa-calendar-section">
      <h3>Your Appointments Calendar</h3>
      <Calendar 
        onChange={setSelectedDate} 
        value={selectedDate} 
        tileClassName={tileClassName} 
      />
    </div>
  );
};

export default CalendarSection;
