import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { updateAppointmentStatus } from '../../Services/doctorAppointmentService';
import Consultation from './Consultation';
import DoctorProfile from './DoctorProfile';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


import './DoctorDashboard.css';
import MedicalRecords from './MedicalRecords';

const DoctorDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [doctorName, setDoctorName] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [doctorId, setDoctorId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterFromDate, setFilterFromDate] = useState('');
  const [filterToDate, setFilterToDate] = useState('');
  const [prescriptionDetails, setPrescriptionDetails] = useState([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isRescheduling, setIsRescheduling] = useState(false);

   // Pagination states
   const [currentPage, setCurrentPage] = useState(1);
   const appointmentsPerPage = 5;
   const [menuOpen, setMenuOpen] = useState(false);

const toggleMenu = () => {
  setMenuOpen(!menuOpen);
};





  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      fetchDoctorDetails(storedUserId);
    } else {
      console.error('No userId found in localStorage');
    }
  }, []);

  const fetchDoctorDetails = async (userId) => {
    try {
        const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5207/api/Doctor/get-doctor-by-user/${userId}`,{
        headers: {
            Authorization: `Bearer ${token}` // Pass token here
          }
      });
      const doctorData = response.data;
      setDoctorName(doctorData.fullName || 'Doctor');
      setDoctorId(doctorData.doctorId);
      fetchAppointments(doctorData.doctorId);
    } catch (error) {
      console.error('Error fetching doctor details:', error);
      setDoctorName('Doctor');
    }
  };

  const fetchAppointments = async (doctorId) => {
    try {
        const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5207/api/Doctor/${doctorId}/appointments`,{
        headers: {
            Authorization: `Bearer ${token}` // Pass token here
          }
      });
      setAppointments(response.data || []);
      setCurrentPage(1); 
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  

  

  const filterAppointments = async () => {
    if (!doctorId) return;
    try {
        const token = localStorage.getItem('token');
      const payload = {
        status: filterStatus,
        dateRange: {
          from: filterFromDate ? new Date(filterFromDate).toISOString() : null,
          to: filterToDate ? new Date(filterToDate).toISOString() : null,
        }
      };
      const response = await axios.post(`http://localhost:5207/api/Doctor/${doctorId}/appointments/filter`, payload,{
        headers: {
            Authorization: `Bearer ${token}` // Pass token in headers
          }
      });
      setAppointments(response.data || []);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error filtering appointments:', error);
    }
  };
  

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      await updateAppointmentStatus(appointmentId, newStatus);
      fetchAppointments(doctorId);
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  const handleReschedule = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setIsRescheduling(true); // Show reschedule form
  };

  const handleRescheduleSubmit = async () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time.');
      return;
    }
    const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);
    if (selectedDateTime < new Date()) {
      alert('You cannot reschedule to a past date.');
      return;
    }

    //const newDateFormatted = selectedDateTime.toISOString().slice(0, 19); // Format as 'YYYY-MM-DDTHH:mm:ss'
    const pad = (n) => (n < 10 ? '0' + n : n);
const newDateFormatted = `${selectedDateTime.getFullYear()}-${pad(selectedDateTime.getMonth() + 1)}-${pad(selectedDateTime.getDate())}T${pad(selectedDateTime.getHours())}:${pad(selectedDateTime.getMinutes())}:${pad(selectedDateTime.getSeconds())}`;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:5207/api/Admin/reschedule-appointment/${selectedAppointmentId}?newDate=${newDateFormatted}`, {}, {
        headers: {
          Authorization: `Bearer ${token}` // Pass token here
        }
      });
      alert('Appointment rescheduled successfully');
      fetchAppointments(doctorId);
      setIsRescheduling(false); // Close the reschedule form
    } catch (error) {
      console.error('Error rescheduling appointment:', error);
      alert('Error rescheduling appointment.');
    }
  };
  
  const handleViewPrescription = async (appointmentId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5207/api/prescription/appointment/${appointmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPrescriptionDetails(response.data);
      setSelectedAppointmentId(appointmentId);
    } catch (error) {
      console.error("Error fetching prescription:", error);
    }
  };
  

  const showSection = (section) => {
    setActiveSection(section);
  };

  const indexOfLast = currentPage * appointmentsPerPage;
  const indexOfFirst = indexOfLast - appointmentsPerPage;
  const sortedAppointments = [...appointments].sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));
  const paginatedAppointments = sortedAppointments.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(appointments.length / appointmentsPerPage);
  return (
    <div className="dd-dashboard">
      <header className="dd-navbar">
        <div className="dd-logo">
          <h1>AMAZECARE DOCTOR DASHBOARD</h1>
          <button className="dd-toggle-btn" onClick={toggleMenu}>
      ☰
    </button>
  </div>
  <nav className={menuOpen ? 'open' : ''}>
          <ul>
            <li><a href="#" onClick={() => showSection('dashboard')}>Dashboard</a></li>
            <li><a href="#" onClick={() => showSection('appointments')}>Appointments</a></li>
            <li><a href="#" onClick={() => showSection('medicalRecords')}>Medical Records</a></li>
            <li><a href="#" onClick={() => showSection('consultation')}>Consultation</a></li>
            <li><a href="#" onClick={() => showSection('profile')}>Profile</a></li>
          </ul>
        </nav>
      </header>

      <main className="dd-content">
        {activeSection === 'dashboard' && (
          <div className="dd-section active">
            <h1 className="dd-welcome">Welcome, Doctor {doctorName}</h1>
            <div className="dd-cards-container">
            <div className="dd-card dd-card-appointments" onClick={() => showSection('appointments')}>
            <h3>Appointments</h3>
            <p>{appointments.length} Scheduled</p>
          </div>
          <div className="dd-card dd-card-patients" onClick={() => showSection('medicalRecords')}>
            <h3>Patients Treated</h3>
            <p>50+ Patients</p>
          </div>
          <div className="dd-card dd-card-profile" onClick={() => showSection('profile')}>
            <h3>Profile Completion</h3>
            <p>90%</p>
          </div>

              
            </div>
            <div className="dd-calendar-section">
  <h5>Upcoming Accepted Appointments</h5>
  <Calendar
     tileClassName={({ date, view }) => {
      if (view === 'month') {
        return appointments.some((appt) => {
          if (appt.status !== 'Accepted') return false;
  
          const apptDate = new Date(appt.appointmentDate);
          return (
            apptDate.getFullYear() === date.getFullYear() &&
            apptDate.getMonth() === date.getMonth() &&
            apptDate.getDate() === date.getDate()
          );
        })
          ? 'highlight-accepted'
          : null;
      }
    }}
  />
</div>

          </div>
        )}
         {activeSection === 'appointments' && (
          <div className="dd-section">
            <h1>My Appointments</h1>

            <div className="dd-filter-container">
              <input type="text" placeholder="Status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} />
              <input type="date" value={filterFromDate} onChange={(e) => setFilterFromDate(e.target.value)} />
              <input type="date" value={filterToDate} onChange={(e) => setFilterToDate(e.target.value)} />
              <button onClick={filterAppointments}>Filter</button>
              <button onClick={() => fetchAppointments(doctorId)}>Clear</button>
            </div>

            {/* <table className="dd-appointment-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Appointment Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAppointments.length === 0 ? (
                  <tr><td colSpan="5">No appointments scheduled.</td></tr>
                ) : (
                  paginatedAppointments.map((appointment, index) => {
                    const date = new Date(appointment.appointmentDate);
                    const isPast = date < new Date();
                    return (
                      <tr key={index} className={
                        appointment.status === 'Accepted' ? 'row-accepted' :
                          appointment.status === 'Completed' ? 'row-completed' : ''
                      }>
                        <td>{appointment.patientName || 'N/A'}</td>
                        <td>{date.toLocaleDateString()}</td>
                        <td>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                        <td>{appointment.status}</td>
                        <td>
                          {appointment.status === 'Pending' && (
                            <>
                              <button className="accept-button" onClick={() => handleStatusUpdate(appointment.appointmentId, 'Accepted')} disabled={isPast}>Accept</button>
                              <button className="reject-button" onClick={() => handleStatusUpdate(appointment.appointmentId, 'Rejected')} disabled={isPast}>Reject</button>
                            </>
                          )}
                          {appointment.status === 'Accepted' && (
                            <>
                              <button className="reject-button" onClick={() => handleStatusUpdate(appointment.appointmentId, 'Rejected')} disabled={isPast}>Reject</button>
                              <button className="reschedule-button spacing-left" onClick={() => handleReschedule(appointment.appointmentId)} disabled={isPast}>Reschedule</button>
                            </>
                          )}
                          {appointment.status === 'Completed' && (
                            <button className="view-prescription-button" onClick={() => handleViewPrescription(appointment.appointmentId)}>
                              View Prescription
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table> */}

            <table className="dd-appointment-table">
  <thead>
    <tr>
      <th>Patient Name</th>
      <th>Appointment Date</th>
      <th>Time</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {paginatedAppointments.length === 0 ? (
      <tr><td colSpan="5">No appointments scheduled.</td></tr>
    ) : (
      paginatedAppointments.map((appointment, index) => {
        const date = new Date(appointment.appointmentDate);
        const isPast = date < new Date();

        const now = new Date();
        const startWindow = new Date(date.getTime() - 10 * 60000); // 10 mins before
        const endWindow = new Date(date.getTime() + 30 * 60000);   // 30 mins after
        const isJoinable = now >= startWindow && now <= endWindow;

        // Meeting link can be based on appointment ID and patient name for uniqueness
       
       // const meetingLink = `https://meet.jit.si/${appointment.appointmentId}-${(appointment.patientName || 'patient').replace(/\s+/g, '')}`;
        const meetingLink = `https://meet.jit.si/appointment-${appointment.appointmentId}`;
        return (
          <tr key={index} className={
            appointment.status === 'Accepted' ? 'row-accepted' :
            appointment.status === 'Completed' ? 'row-completed' : ''
          }>
            <td>{appointment.patientName || 'N/A'}</td>
            <td>{date.toLocaleDateString()}</td>
            <td>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
            <td>{appointment.status}</td>
            <td>
              {appointment.status === 'Pending' && (
                <>
                  <button className="accept-button" onClick={() => handleStatusUpdate(appointment.appointmentId, 'Accepted')} disabled={isPast}>Accept</button>
                  <button className="reject-button" onClick={() => handleStatusUpdate(appointment.appointmentId, 'Rejected')} disabled={isPast}>Reject</button>
                </>
              )}
              {appointment.status === 'Accepted' && (
                <>
                  <button className="reject-button" onClick={() => handleStatusUpdate(appointment.appointmentId, 'Rejected')} disabled={isPast}>Reject</button>
                  <button className="reschedule-button spacing-left" onClick={() => handleReschedule(appointment.appointmentId)} disabled={isPast}>Reschedule</button>
                  
                  <button
                    className="gmeet-button spacing-left"
                    onClick={() => window.open(meetingLink, '_blank')}
                    disabled={!isJoinable}
                    title={!isJoinable ? 'Join allowed 10 minutes before and up to 30 minutes after the scheduled time.' : ''}
                  >
                    Join Meeting
                  </button>
                </>
              )}
              {appointment.status === 'Completed' && (
                <button className="view-prescription-button" onClick={() => handleViewPrescription(appointment.appointmentId)}>
                  View Prescription
                </button>
              )}
            </td>
          </tr>
        );
      })
    )}
  </tbody>
</table>


            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="dd-pagination">
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                  Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                  Next
                </button>
              </div>
            )}

            {selectedAppointmentId && prescriptionDetails.length > 0 && (
  <div className="do-pre-con-container">
    <h3 className="do-pre-con-title">Prescription for Appointment #{selectedAppointmentId}</h3>
    <table className="do-pre-con-table">
      <thead>
        <tr>
          <th>Medicine Name</th>
          <th>Recommended Tests</th>
          <th>Morning</th>
          <th>Afternoon</th>
          <th>Evening</th>
          <th>Food Timing</th>
        </tr>
      </thead>
      <tbody>
        {prescriptionDetails.map(detail => (
          <tr key={detail.detailId}>
            <td>{detail.medicineName}</td>
            <td>{detail.recommendedTests}</td>
            <td>{detail.dosageMorning}</td>
            <td>{detail.dosageAfternoon}</td>
            <td>{detail.dosageEvening}</td>
            <td>{detail.foodTiming}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <button
      className="do-pre-back-button"
      onClick={() => {
        setSelectedAppointmentId(null);
        setPrescriptionDetails([]);
      }}
    >
      ← Back to Appointments
    </button>
  </div>
)}

          </div>
        )}
        <h1></h1>

        {isRescheduling && (
  <div className="ad-pro-reschedule-modal">
    <h2 className="ad-pro-modal-title">Reschedule Appointment</h2>
    <form className="ad-pro-reschedule-form" onSubmit={handleRescheduleSubmit}>
      <div className="ad-pro-form-group">
        <label htmlFor="selectedDate" className="ad-pro-form-label">Date:</label>
        <input
          type="date"
          id="selectedDate"
          className="ad-pro-form-input"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      <div className="ad-pro-form-group">
        <label htmlFor="selectedTime" className="ad-pro-form-label">Time:</label>
        <input
          type="time"
          id="selectedTime"
          className="ad-pro-form-input"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        />
      </div>
      <div className="ad-pro-form-actions">
        <button type="submit" className="ad-pro-button ad-pro-submit-button">Submit</button>
        <button type="button" onClick={() => setIsRescheduling(false)} className="ad-pro-button ad-pro-cancel-button">
          Cancel
        </button>
      </div>
    </form>
  </div>
)}


{activeSection === 'medicalRecords' && (
          <div className="dd-section">
           
            <MedicalRecords doctorId={doctorId}/>
          </div>
        )}

        {activeSection === 'profile' && (
          <div className="dd-section">
            <DoctorProfile doctorId={doctorId} />
          </div>
        )}

        {activeSection === 'consultation' && (
          <div className="dd-section">
            <Consultation doctorId={doctorId} />
          </div>
        )}
{/* {activeSection === 'conductConsultation' && (
  <div className="doctor-section">
    <ConductConsultation doctorId={doctorId} />
  </div>
)} */}

      </main>
    </div>
  );
};

export default DoctorDashboard;