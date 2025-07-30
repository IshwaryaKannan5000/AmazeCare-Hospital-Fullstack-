
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageAppointments.css';

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [doctorNameFilter, setDoctorNameFilter] = useState('');
  const [patientNameFilter, setPatientNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:5207/api/Appointment/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const sortedAppointments = response.data.sort(
          (a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)
        );
        setAppointments(sortedAppointments);
        setFilteredAppointments(sortedAppointments);
      })
      .catch((error) => {
        console.error('Error fetching appointments:', error);
      });
  };

  const applyFilters = () => {
    const filtered = appointments.filter((a) => {
      const dMatch = doctorNameFilter
        ? a.doctorName.toLowerCase().includes(doctorNameFilter.toLowerCase())
        : true;
      const pMatch = patientNameFilter
        ? a.patientName.toLowerCase().includes(patientNameFilter.toLowerCase())
        : true;
      const sMatch = statusFilter
        ? a.status.toLowerCase().includes(statusFilter.toLowerCase())
        : true;
      const dateMatch = dateFilter
        ? new Date(a.appointmentDate).toLocaleDateString().includes(
            new Date(dateFilter).toLocaleDateString()
          )
        : true;

      return dMatch && pMatch && sMatch && dateMatch;
    });
    setFilteredAppointments(filtered);
    setCurrentPage(1); // Reset to first page on filter
  };

  const clearFilters = () => {
    setDoctorNameFilter('');
    setPatientNameFilter('');
    setStatusFilter('');
    setDateFilter('');
    setFilteredAppointments(appointments);
    setCurrentPage(1); // Reset to first page on clear
  };

  const handleCancel = (appointmentId, appointmentDate) => {
    if (new Date(appointmentDate) <= new Date()) {
      alert('Cannot cancel past appointments.');
      return;
    }

    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      const token = localStorage.getItem('token');
      axios
        .delete(`http://localhost:5207/api/Admin/cancel-appointment/${appointmentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          alert('Appointment canceled.');
          fetchAppointments();
        })
        .catch((err) => {
          console.error('Error cancelling appointment:', err);
          alert('Failed to cancel appointment.');
        });
    }
  };

  const openRescheduleModal = (appointmentId, appointmentDate) => {
    if (new Date(appointmentDate) <= new Date()) {
      alert('Cannot reschedule past appointments.');
      return;
    }

    setSelectedAppointmentId(appointmentId);
    setRescheduleDate('');
    setShowRescheduleModal(true);
  };

  const handleReschedule = () => {
    if (!rescheduleDate) {
      alert('Please select a new date.');
      return;
    }

    const newDateObj = new Date(rescheduleDate);
    if (newDateObj <= new Date()) {
      alert('Please choose a future date.');
      return;
    }

    const token = localStorage.getItem('token');
    axios
      .put(
        `http://localhost:5207/api/Admin/reschedule-appointment/${selectedAppointmentId}?newDate=${rescheduleDate}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        alert('Appointment rescheduled.');
        setShowRescheduleModal(false);
        fetchAppointments();
      })
      .catch((err) => {
        console.error('Error rescheduling appointment:', err);
        alert('Failed to reschedule appointment.');
      });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  return (
    <div className="appointments-container">
      <h2>Manage Appointments</h2>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Filter by Doctor Name"
          value={doctorNameFilter}
          onChange={(e) => setDoctorNameFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by Patient Name"
          value={patientNameFilter}
          onChange={(e) => setPatientNameFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      <div className="filter-buttons">
        <button className="apply-filters-btn" onClick={applyFilters}>
          Apply Filters
        </button>
        <button className="clear-filters-btn" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      {/* Appointments Table */}
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Doctor</th>
            <th>Patient</th>
            <th>Status</th>
            <th>Symptoms</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentAppointments.length > 0 ? (
            currentAppointments.map((a) => {
              const isPast = new Date(a.appointmentDate) < new Date();
    const isDisabled = isPast || a.status === 'Completed' || a.status === 'Payment Pending';
              return (
                <tr key={a.appointmentId}>
                  <td>{new Date(a.appointmentDate).toLocaleString()}</td>
                  <td>{a.doctorName}</td>
                  <td>{a.patientName}</td>
                  <td>{a.status}</td>
                  <td>{a.symptoms}</td>
                  <td>
                    <button
                      className={isDisabled ? 'reschedule-btn-disabled' : 'reschedule-btn'}
                      onClick={() => openRescheduleModal(a.appointmentId, a.appointmentDate)}
                      disabled={isDisabled}
                    >
                      Reschedule
                    </button>
                    <button
                      className={isDisabled ? 'cancel-btn-disabled' : 'cancel-btn'}
                      onClick={() => handleCancel(a.appointmentId, a.appointmentDate)}
                      disabled={isDisabled}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                No appointments found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="appointments-page-pagination">
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? 'appointments-page-active-page' : ''}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="reschedule-modal-overlay">
          <div className="reschedule-modal-box">
            <h3>Reschedule Appointment</h3>
            <input
              type="datetime-local"
              value={rescheduleDate}
              onChange={(e) => setRescheduleDate(e.target.value)}
            />
            <div className="reschedule-modal-actions">
              <button onClick={handleReschedule}>Confirm</button>
              <button onClick={() => setShowRescheduleModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAppointments;