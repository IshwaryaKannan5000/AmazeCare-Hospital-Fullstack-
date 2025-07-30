import React, { useState, useEffect } from 'react';
import { fetchAppointmentsByPatientId, cancelAppointmentById } from '../../Services/appointmentService';
import './PatientDashboard.css';
import DoctorsSection from './DoctorsSection'; 
import Prescription from './Prescription';
import MedicalHistory from './MedicalHistory';
import PatientProfile from './PatientProfile';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AvailableDoctors from './AvailableDoctors';
import axios from 'axios';




const PatientDashboard = () => {  
  const navigate = useNavigate(); 
  const [activeSection, setActiveSection] = useState('dashboard');
  const [appointments, setAppointments] = useState([]);
  const [patientId, setPatientId] = useState(null); 
  const [patientName, setPatientName] = useState('');
  const [menuOpen, setMenuOpen] = useState(false); // 👈 Added
  const [appointmentViewType, setAppointmentViewType] = useState('all'); // 👈 Add this (new)
  const [greeting, setGreeting] = useState('');
 
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [error, setError] = useState("");



 

  useEffect(() => {
    const getGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        return 'Good Morning';
      } else if (currentHour < 18) {
        return 'Good Afternoon';
      } else {
        return 'Good Evening';
      }
    };

    setGreeting(getGreeting());
  }, []);

  



  // Add to your current PatientDashboard component

const SpecialOffersSection = () => {
  return (
    <div className="pa-special-offers">
      <h2>Special Offers Just for You!</h2>
      <div className="pa-offer-card">
        <h3>Free Consultation</h3>
        <p>Get a free consultation with any specialist on your first visit! Book an appointment now.</p>
      </div>
      <div className="pa-offer-card">
        <h3>20% Off on Health Reports</h3>
        <p>Enjoy a 20% discount on all health reports. Offer valid until the end of this month.</p>
      </div>
      <div className="pa-offer-card">
        <h3>Exclusive Fitness Plans</h3>
        <p>Get a personalized fitness plan tailored to your needs at a discounted rate.</p>
      </div>
    </div>
  );
};

const RatingSection = () => {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // You can send `rating` to the backend here
  };

  return (
    <div className="pa-rating-section">
      <h3>Rate Our Website</h3>
      <div className="pa-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`pa-star ${star <= rating ? 'filled' : ''}`}
            onClick={() => handleRatingClick(star)}
          >
            ★
          </span>
        ))}
      </div>
      <button onClick={handleSubmit} className="pa-rate-btn" disabled={submitted}>
        {submitted ? 'Thanks for your feedback!' : 'Submit'}
      </button>
    </div>
  );
};



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
          const acceptedAppointments = appointments.filter(app => app.status === 'Accepted');
  
          const upcomingAppointments = acceptedAppointments
            .filter(app => new Date(app.appointmentDate) > new Date())
            .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
  
          // console.log("Upcoming Accepted Appointments:", upcomingAppointments);
          if (upcomingAppointments.length > 0) {
            console.log("First Upcoming Appointment:", upcomingAppointments[0]);
          }
  
          setAppointments(acceptedAppointments);
        })
        .catch(error => {
          console.error("Error fetching appointments:", error);
        });
    }
  }, [patientId]);
  

 // Fetch appointments based on patientId from the API
const fetchAppointments = async (patientId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("❌ No token found in localStorage.");
    return [];
  }

  try {
    const response = await fetch(`http://localhost:5207/api/Appointment/patient/${patientId}`, {
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
      const dateStr = date.toLocaleDateString('en-CA');
      
      if (dateStr === highlightDate) {
        console.log("✅ Match found! Highlighting:", dateStr);
        return 'highlight-date';
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

const handlePayment = (appointmentId) => {
  setSelectedAppointmentId(appointmentId);
  setShowPaymentModal(true);
};

const completePayment = async () => {
  try {
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:5207/api/Doctor/appointment/${selectedAppointmentId}/status`,
      '"Completed"',
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    alert('Payment successful!');

    // Update status in UI
    setAppointmentsList(prev =>
      prev.map(app =>
        app.appointmentId === selectedAppointmentId
          ? { ...app, status: 'Completed' }
          : app
      )
    );

    setShowPaymentModal(false);
    setUpiId('');
  } catch (error) {
    console.error('Payment failed:', error);
    alert('Payment failed. Try again.');
  }
};




  
  

  

  const logout = () => {
    // Clear user session data
    localStorage.removeItem('userId');  // Removes the user ID from localStorage
    localStorage.removeItem('token');   // Remove the authentication token if needed
    
    navigate('/login', { replace: true }); // Prevent back navigation
  window.location.reload(); // Reset app state
  };

  

    // 🔍 Filter, Sort, Pagination States
  const [filters, setFilters] = useState({
    doctorName: '',
    appointmentDate: '',
    appointmentTime: '',
    status: ''
  });

  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  
  



  const handleSort = (field) => {
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);
  };



  const filteredAppointments = appointments.filter((appointment) => {

    if (appointmentViewType === 'accepted' && appointment.status !== 'Accepted') return false; // 👈 filter Accepted if needed
    
    // Other filters
    // Extract time from appointmentDate (in "2025-04-11T09:00:00" format)
    const formattedAppointmentTime = appointment.appointmentDate
      ? new Date(appointment.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      : '';
  
    // Get user input
    let filterInput = filters.appointmentTime.trim();
  
    // Debugging
    // console.log('Formatted Appointment Time:', formattedAppointmentTime);
    // console.log('User Entered Filter Input:', filterInput);
  
    // Doctor Name Match
    const isDoctorNameMatch = filters.doctorName === '' || appointment.doctorName.toLowerCase().includes(filters.doctorName.toLowerCase());
  
    // Appointment Date Match
    const isAppointmentDateMatch = filters.appointmentDate === '' || appointment.appointmentDate.toLowerCase().includes(filters.appointmentDate.toLowerCase());
  
    // Status Match
    const isStatusMatch = filters.status === '' || appointment.status.toLowerCase().includes(filters.status.toLowerCase());
  
    // Time Match: Check if appointment time starts with the input
    const isTimeMatch =
      filterInput === '' ||
      formattedAppointmentTime.replace(':', '').startsWith(filterInput.replace(':', ''));
  
    return isDoctorNameMatch && isAppointmentDateMatch && isTimeMatch && isStatusMatch;
  });
  
  // console.log('Filtered Appointments:', filteredAppointments);
  
  

  // 🔃 Sort Logic
  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    if (sortField) {
      const valA = a[sortField]?.toString().toLowerCase();
      const valB = b[sortField]?.toString().toLowerCase();
      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    } else {
      // 🛠 Default sorting by appointmentDate (latest first)
      return new Date(b.appointmentDate) - new Date(a.appointmentDate);
    }
  });
  

  // 📄 Pagination
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = sortedAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
  const totalPages = Math.ceil(sortedAppointments.length / appointmentsPerPage);



  

 // Function to handle the filter change for each field
 const handleFilterChange = (e, field) => {
  setFilters({
    ...filters,
    [field]: e.target.value
  });
  setCurrentPage(1);  // Reset to first page when filters change
};


  const fetchUserNameByUserId = async (userId) => {
    const token = localStorage.getItem("token");

  if (!token) {
    console.error("❌ No token found in localStorage.");
    throw new Error("Authentication token missing");
  }
    try {
      const response = await fetch(`http://localhost:5207/api/PatientAuth/get-patient-by-user/${userId}`,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`User not found. Status: ${response.status}`);
      }
      const data = await response.json();
      // console.log(data);  // Check the structure of the response
      setPatientName(data.user.fullName || "No name found"); // Corrected to use `fullName` inside `user`
    } catch (error) {
      console.error("Error fetching user name:", error.message);
      setPatientName("Guest"); // fallback
    }
  };

  const fetchPatientIdByUserId = async (userId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ No token found in localStorage.");
      throw new Error("Authentication token missing");
    }
    // This function should make an API call or database query to fetch the corresponding patientId for the logged-in user
    try {
      const response = await fetch(`http://localhost:5207/api/PatientAuth/get-patient-by-user/${userId}`,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch patient. Status: ${response.status}`);
      }
  
      const patientData = await response.json();
      // console.log('Patient Data:', patientData); // Log the response for debugging
  
      if (patientData && patientData.patientId) {
        return patientData; 
      } else {
        throw new Error('Patient not found');
      }
    } catch (error) {
      // console.error("Error fetching patient ID:", error);
      throw error;
    }
  };
  
  

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      fetchUserNameByUserId(storedUserId);  // Fetch patient name
      fetchPatientIdByUserId(storedUserId)  // Fetch patientId as before
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
      console.log("Fetching appointments for Patient ID:", patientId);  // Debugging line
      fetchAppointmentsByPatientId(patientId)
        .then((response) => {
          // console.log("Appointments fetched:", response.data);  // Debugging line
          setAppointments(response.data);
        })
        .catch((error) => {
          console.error("Error fetching appointments:", error);
        });
    }
  }, [patientId]);  // This effect runs when patientId is updated

 
  

  const showSection = (section) => {
    setActiveSection(section);
   

    if (section === 'appointments') {
      setAppointmentViewType('all');  // 🛠 when going to appointments normally, show all
    }
   
    
  };

 


  const showAcceptedAppointments = () => {
    setActiveSection('appointments'); 
    setAppointmentViewType('accepted');  // 🛠 when clicking "Upcoming Appointments", show only accepted
  };

  const goBackToDashboard = () => {
    setActiveSection('dashboard');
  };

  const cancelAppointment = (appointmentId, index) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
  
    cancelAppointmentById(appointmentId)
      .then(() => {
        const updatedAppointments = [...appointments];
        updatedAppointments[index].status = 'Cancelled';
        setAppointments(updatedAppointments);
        alert("Appointment cancelled successfully.");
      })
      .catch((error) => {
        console.error("Error cancelling appointment:", error);
        alert("Failed to cancel appointment. Please try again.");
      });
  };
  

  

  return (
    <div className="pa-dashboard">
      {/* Navbar */}
      <header className="pa-navbar">
        <div className="pa-logo">
          <h1>AMAZECARE PATIENT DASHBOARD</h1>
        </div>
        <div className="pa-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          &#9776;
        </div>
        <nav className={menuOpen ? 'active' : ''}>
          <ul>
            <li><a href="#" onClick={() => showSection('dashboard')}>My Dashboard</a></li>
            <li><a href="#" onClick={() => showSection('appointments')}>My Appointments</a></li>
            <li><a href="#" onClick={() => showSection('doctors')}>Doctors</a></li>
            <li><a href="#" onClick={() => showSection('prescriptions')}>Prescriptions</a></li> {/* ✅ Updated */}

            <li><a href="#" onClick={() => showSection('MedicalHistory')}>Medical History</a></li>
            <li><a href="#" onClick={() => showSection('patientProfile')}>Profile</a></li>
            <li><a href="#" onClick={logout}>Logout</a></li> {/* Add logout action here */}
          </ul>
        </nav>
      </header>

      {/* Main Dashboard */}
      <main className="pa-content">
      

        {activeSection === 'dashboard' && (
          <div id="dashboard" className="pa-section active">
           <div className="greeting-card">
            <h1 className="pa-welcome">{`${greeting}, ${patientName}`}</h1>
            <p>We hope you are having a wonderful day!</p>
          </div>

            <div className="pa-cards-container">
            <div className="pa-card" onClick={() => showAcceptedAppointments()}> {/* 👈 SHOW ACCEPTED */}
                <h3>Accepted Appointments</h3>
                <p>{appointments.filter(a => a.status === 'Accepted').length} Scheduled</p>
              </div>
             
            
            <div className="pa-card" >
              <h3>Total Appointments Booked</h3>
              
              <p style={{ fontWeight: 'bold' }}>{appointments.length}</p>

            </div>
            <div className="pa-card" onClick={() => navigate('/daily-routines')}>
              <h3>Daily Routines</h3>
              <p>Healthy Habits</p>
            </div>


            
            <div className="pa-card" onClick={() =>  navigate('/daily-Exercises')}>
              <h3>Daily Exercises</h3>
              <p>Stay Fit & Active</p>
            </div>
          </div>


           {/* Special Offers Section */}
           <SpecialOffersSection />
           <CalendarSection appointments={appointments} />
           <AvailableDoctors/>

         
           
          </div>
        )}

        {/* Appointments Section */}
        {activeSection === 'appointments' && (
          <div id="appointments" className="pa-section">
           <center><h1>My Appointments</h1></center> 

           {/* 🔍 Filter Controls */}
           <div className="pa-filter-controls">
              <input
                type="text"
                placeholder="Filter by Doctor"
                value={filters.doctorName}
                onChange={(e) => handleFilterChange(e, 'doctorName')}
              />
              <input
                type="text"
                placeholder="Filter by Date"
                value={filters.appointmentDate}
                onChange={(e) => handleFilterChange(e, 'appointmentDate')}
              />
              <input
                type="text"
                placeholder="Filter by Time"
                value={filters.appointmentTime}
                onChange={(e) => handleFilterChange(e, 'appointmentTime')}
              />
              <input
                type="text"
                placeholder="Filter by Status"
                value={filters.status}
                onChange={(e) => handleFilterChange(e, 'status')}
              />
            </div>

             

            {/* <table className="pa-appointment-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('doctorName')}>Doctor</th>
                  <th onClick={() => handleSort('appointmentDate')}>Date</th>
                  <th onClick={() => handleSort('appointmentTime')}>Time</th>
                  <th onClick={() => handleSort('status')}>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentAppointments.length === 0 ? (
                  <tr>
                    <td colSpan="5">No appointments found.</td>
                  </tr>
                ) : (
                  currentAppointments.map((appointment, index) => {
                    const date = new Date(appointment.appointmentDate);
                    const today = new Date();
                    const isPast = date < today;
                    const isCompleted = appointment.status === 'Completed';
                    return (
                      <tr key={appointment.appointmentId}
                      className={isCompleted ? 'completed-row' : ''}>
                        <td>{appointment.doctorName}</td>
                        <td>{date.toLocaleDateString()}</td>
                        <td>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                        <td>{appointment.status}</td>
                        <td>
                        <button 
                          onClick={() => cancelAppointment(appointment.appointmentId, index)} 
                          disabled={
                            isPast || 
                            appointment.status === 'Cancelled' || 
                            appointment.status === 'Completed' ||
                            appointment.status === 'Payment Pending'
                          }
                          className={
                            isPast || 
                            appointment.status === 'Cancelled' || 
                            appointment.status === 'Completed' ||
                             appointment.status === 'Payment Pending'
                              ? 'disabled-button' 
                              : 'cancel-button'
                          }
                        >
                          Cancel
                        </button>
                        {appointment.status === 'Payment Pending' && (
                          <button 
                            className="payment-button" 
                            onClick={() => handlePayment(appointment.appointmentId)}
                          >
                            Payment
                          </button>
                        )}

                          
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table> */}

            <table className="pa-appointment-table">
  <thead>
    <tr>
      <th onClick={() => handleSort('doctorName')}>Doctor</th>
      <th onClick={() => handleSort('appointmentDate')}>Date</th>
      <th onClick={() => handleSort('appointmentTime')}>Time</th>
      <th onClick={() => handleSort('status')}>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {currentAppointments.length === 0 ? (
      <tr><td colSpan="5">No appointments found.</td></tr>
    ) : (
      currentAppointments.map((appointment, index) => {
        const date = new Date(appointment.appointmentDate);
        const now = new Date();

        const startWindow = new Date(date.getTime() - 10 * 60000); // 10 mins before
        const endWindow = new Date(date.getTime() + 30 * 60000);   // 30 mins after
        const isJoinable = now >= startWindow && now <= endWindow;

        const isPast = date < now;
        const isAccepted = appointment.status === 'Accepted';
        const isCompleted = appointment.status === 'Completed';

        // const meetingLink = `https://meet.jit.si/${appointment.appointmentId}-${(appointment.doctorName || 'doctor').replace(/\s+/g, '')}`;
         const meetingLink = `https://meet.jit.si/appointment-${appointment.appointmentId}`;

        return (
          <tr key={appointment.appointmentId} className={isCompleted ? 'completed-row' : ''}>
            <td>{appointment.doctorName}</td>
            <td>{date.toLocaleDateString()}</td>
            <td>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
            <td>{appointment.status}</td>
            <td>
              <button 
                onClick={() => cancelAppointment(appointment.appointmentId, index)} 
                disabled={
                  isPast || 
                  appointment.status === 'Cancelled' || 
                  appointment.status === 'Completed' ||
                  appointment.status === 'Payment Pending'
                }
                className={
                  isPast || 
                  appointment.status === 'Cancelled' || 
                  appointment.status === 'Completed' ||
                  appointment.status === 'Payment Pending'
                    ? 'disabled-button' 
                    : 'cancel-button'
                }
              >
                Cancel
              </button>

              {appointment.status === 'Payment Pending' && (
                <button 
                  className="payment-button" 
                  onClick={() => handlePayment(appointment.appointmentId)}
                >
                  Payment
                </button>
              )}

              {isAccepted && (
                <button
                  className="meeting-link-button spacing-left"
                  onClick={() => window.open(meetingLink, '_blank')}
                  disabled={!isJoinable}
                  title={!isJoinable ? 'Join allowed 10 mins before and up to 30 mins after scheduled time.' : ''}
                >
                  Join Meeting
                </button>
              )}
            </td>
          </tr>
        );
      })
    )}
  </tbody>
</table>


          {/* 📄 Pagination Controls */}
            <div className="pa-pagination">
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Prev</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
            </div>

             {/* 💸 Payment Modal */}
        {showPaymentModal && (
          <div className="payment-modal">
            <div className="payment-content">
              <h2>Scan QR Code & Complete Payment</h2>
              <img src="/qr-code-placeholder.png" alt="QR Code" className="qr-code-img" />

              <input
                type="text"
                placeholder="Enter UPI Transaction ID"
                value={upiId}
                onChange={(e) => {
                  setUpiId(e.target.value);
                  setError(""); // Clear error when typing
                }}
                className="upi-input"
                required
              />
              {error && <p className="error-message">{error}</p>}

              <button
                className="complete-payment-button"
                onClick={() => {
                  if (!upiId.trim()) {
                    setError("UPI Transaction ID is required.");
                    return;
                  }
                  completePayment();
                }}
              >
                Complete Payment
              </button>
              <button onClick={() => setShowPaymentModal(false)}>Close</button>
            </div>
          </div>
        )}


            
          </div>
        )}

          {/* ✅ Doctors Section */}
          {activeSection === 'doctors' && (
          <div id="doctors" className="pa-section">
            {/* <h1>Available Doctors</h1> */}
            <DoctorsSection patientId={patientId} /> {/* Pass patientId as a prop */}
          </div>
        )}

         {/* ✅ Prescriptions Section */}
         {activeSection === 'prescriptions' && (
          <div id="prescriptions" className="pa-section">
            <Prescription/>
          </div>
        )}

        {activeSection === 'MedicalHistory' && (
          <div id="medicalHistory" className="pa-section">
            <MedicalHistory patientId={patientId} />
          </div>
        )}

        {activeSection === 'patientProfile' && (
          <div id="profile" className="pa-section">
            <PatientProfile patientId={patientId}/>
              </div>
        )}



        
      </main>

   
    </div>
  );
};

export default PatientDashboard;
