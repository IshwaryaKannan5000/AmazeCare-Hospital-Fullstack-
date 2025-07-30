import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import ManagePatients from './ManagePatients'; // Adjust path as needed
import ManageDoctors from './ManageDoctors';
import ManageAppointments from './ManageAppointments';
import Calendar from 'react-calendar'; // Import react-calendar
import 'react-calendar/dist/Calendar.css'; // Import styles for react-calendar
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate(); 
  const [activeSection, setActiveSection] = useState('dashboard');
  const [adminName, setAdminName] = useState('');
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
   // Toggle navbar
   const [menuOpen, setMenuOpen] = useState(false);
   const toggleMenu = () => setMenuOpen(!menuOpen);
  

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setAdminName("Admin User");
      fetchAllData();
    }
  }, []);

  const fetchAllData = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
  
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      const [patientsRes, doctorsRes, appointmentsRes] = await Promise.all([
        fetch('http://localhost:5207/api/PatientAuth/ViewAllPatients', { headers }),
        fetch('http://localhost:5207/api/Doctor/all', { headers }),
        fetch('http://localhost:5207/api/Appointment/all', { headers }),
      ]);
      const patientsData = await patientsRes.json();
      const doctorsData = await doctorsRes.json();
      const appointmentsData = await appointmentsRes.json();

      setPatients(patientsData);
      setDoctors(doctorsData);
      setAppointments(appointmentsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const showSection = (section) => {
    setActiveSection(section);
  };

  // Handle date selection in the calendar
  const handleDateChange = (date) => {
    setSelectedDate(date);
    // You can also filter the appointments by selected date if needed
  };

  // Get appointments for the selected date
//   const getAppointmentsForDate = (date) => {
//     const formattedDate = date.toISOString().split('T')[0]; 
//     return appointments.filter(appointment =>
//       appointment.appointmentDate.split('T')[0] === formattedDate
//     );
//   };
const getAppointmentsForDate = (date) => {
    return appointments.filter((appointment) => {
      const appDate = new Date(appointment.appointmentDate);
      return (
        appDate.getFullYear() === date.getFullYear() &&
        appDate.getMonth() === date.getMonth() &&
        appDate.getDate() === date.getDate()
      );
    });
  };

  const logout = () => {
    // Clear user session data
    localStorage.removeItem('userId');  // Removes the user ID from localStorage
    localStorage.removeItem('token');   // Remove the authentication token if needed
    
    navigate('/login', { replace: true }); // Prevent back navigation
  window.location.reload(); // Reset app state
  };
  

  return (
    <div className="admin-dashboard">
      {/* Navbar */}
      <header className="admin-navbar">
        <div className="admin-logo">
          <h1>AMAZECARE ADMIN DASHBOARD</h1>
          <button className="admin-toggle-btn" onClick={toggleMenu}>☰</button>
        </div>
        <nav className={menuOpen ? 'admin-nav open' : 'admin-nav'}>
          <ul>
            <li><a href="#" onClick={() => showSection('dashboard')}>Dashboard</a></li>
            <li><a href="#" onClick={() => showSection('patients')}>Manage Patients</a></li>
            <li><a href="#" onClick={() => showSection('doctors')}>Manage Doctors</a></li>
            <li><a href="#" onClick={() => showSection('appointments')}>Manage Appointments</a></li>
            <li><a href="#" onClick={logout}>Logout</a></li> {/* Add logout action here */}
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="admin-content">
        {activeSection === 'dashboard' && (
          <div className="admin-section active">
            <h1 className="admin-welcome">Welcome {adminName}</h1>

            <div className="admin-cards-container">
              <div className="admin-card" onClick={() => showSection('patients')}>
                <h3>Total Patients</h3>
                <p>{patients.filter(patient => patient.roleName?.toLowerCase().trim() !== "inactive").length}</p>
              </div>
              <div className="admin-card" onClick={() => showSection('doctors')}>
                <h3>Total Doctors</h3>
                <p>{doctors.filter(doctor => doctor.roleName?.toLowerCase().trim() !== "inactive").length}</p>
              </div>
              <div className="admin-card" onClick={() => showSection('appointments')}>
                <h3>Total Appointments</h3>
                <p>{appointments.length}</p>
              </div>
            </div>

            {/* Calendar Section */}
            <div className="calendar-container">
              <h2>Appointments Calendar</h2>
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                className="admin-calendar"
              />

              <div className="appointments-list">
                <h3>Appointments for {selectedDate.toLocaleDateString()}</h3>
                {getAppointmentsForDate(selectedDate).length > 0 ? (
                  <ul>
                    {getAppointmentsForDate(selectedDate).map((appointment, index) => (
                      <li key={appointment.appointmentId}>
                        <strong>{appointment.patientName}</strong> with Dr. {appointment.doctorName}
                        <br />
                        <em>{appointment.status}</em>
                        <br />
                        <span>{appointment.symptoms}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No appointments on this day.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Manage Patients, Doctors, Appointments */}
        {activeSection === 'patients' && (
          <div className="admin-section">
            <ManagePatients />
          </div>
        )}

        {activeSection === 'doctors' && (
          <div className="admin-section">
            <ManageDoctors />
          </div>
        )}

        {activeSection === 'appointments' && (
          <div className="admin-section">
            <ManageAppointments />
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
