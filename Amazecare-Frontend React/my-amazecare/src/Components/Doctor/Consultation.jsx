import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook instead of useHistory
import './Consultation.css'; 

const Consultation = ({ doctorId }) => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    fetchAppointments(doctorId);
  }, [doctorId]);

  const fetchAppointments = async (doctorId) => {
    try {
        const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5207/api/Doctor/${doctorId}/appointments`,{
        headers: {
            Authorization: `Bearer ${token}` // Pass token here
          }
      });
      const accepted = response.data
      .filter(a => a.status === 'Accepted')
      .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));
    setAppointments(accepted);
    setFilteredAppointments(accepted);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearch(term);
    const filtered = appointments.filter(app =>
      app.patientName.toLowerCase().includes(term) ||
      new Date(app.appointmentDate).toLocaleDateString().includes(term)
    );
    setFilteredAppointments(filtered);
    setCurrentPage(1);
  };

  const handleConsultation = (appointmentId) => {
    console.log('Conducting consultation for appointment:', appointmentId);
    if (!appointmentId) {
      console.error('Error: Invalid appointmentId');
      return;
    }
    // Navigate to the ConductConsultation page with the appointmentId
    navigate(`/conduct-consultation/${appointmentId}`);
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  return (
    <div className="doctor-consultation-container">
      <h2>Accepted Appointments</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by patient or date"
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div className="doctor-app-list">
        {appointments.length === 0 ? (
          <p>No accepted appointments available.</p>
        ) : (
          currentAppointments.map((appointment, index) => {
            const date = new Date(appointment.appointmentDate);
            const isPast = date < new Date().setHours(0, 0, 0, 0);

            return (
              <div className="appointment-item" key={appointment.appointmentId || index}>
                <p><strong>Patient:</strong> {appointment.patientName}</p>
                <p><strong>Symptoms:</strong> {appointment.symptoms || 'No symptoms provided'}</p>
                <p><strong>Date:</strong> {date.toLocaleDateString()}</p>

                <button
                  onClick={() => handleConsultation(appointment.appointmentId)}
                  disabled={isPast}
                  className={isPast ? 'disabled-button' : 'consult-button'}
                >
                  Conduct Consultation
                </button>
              </div>
            );
          })
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={currentPage === idx + 1 ? 'active' : ''}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Consultation;
