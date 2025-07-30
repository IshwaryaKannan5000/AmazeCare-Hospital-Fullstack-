import React, { useState, useEffect } from 'react';
import { getMedicalHistory } from '../../Services/medicalHistoryService';
import './MedicalHistory.css';

const MedicalHistory = ({ patientId }) => {
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filters, setFilters] = useState({
    doctorName: '',
    appointmentDate: ''
  });

  useEffect(() => {
    if (!patientId) return;

    const fetchMedicalHistory = async () => {
      try {
        const history = await getMedicalHistory(patientId);
        setMedicalHistory(history || []);
      } catch (error) {
        console.error('Error fetching medical history:', error);
      }
    };

    fetchMedicalHistory();
  }, [patientId]);

  // Sort history by appointmentDate (most recent first)
  const sortedHistory = medicalHistory.sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));

  const filteredHistory = sortedHistory.filter((appointment) => {
    const doctor = appointment?.doctorName?.toLowerCase() || '';
    const date = appointment?.appointmentDate || '';
    const matchesDoctor =
      filters.doctorName === '' ||
      doctor.includes(filters.doctorName.toLowerCase());
    const matchesDate =
      filters.appointmentDate === '' || date.includes(filters.appointmentDate);
     
    return matchesDoctor && matchesDate;
  });

  return (
    <div className="medical-history">
      <h1>Medical History</h1>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Filter by Doctor"
          value={filters.doctorName}
          onChange={(e) =>
            setFilters({ ...filters, doctorName: e.target.value })
          }
        />
        <input
          type="date"
          value={filters.appointmentDate}
          onChange={(e) =>
            setFilters({ ...filters, appointmentDate: e.target.value })
          }
        />
      </div>

      {/* Medical History List */}
      <div className="history-list">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((appointment) => (
            <div
              key={appointment.appointmentId}
              className={`history-item ${new Date(appointment.appointmentDate) === new Date(sortedHistory[0].appointmentDate) ? 'recent' : ''}`}
            >
              <div
                className="history-summary"
                onClick={() =>
                  setSelectedAppointment(
                    selectedAppointment?.appointmentId === appointment.appointmentId
                      ? null
                      : appointment
                  )
                }
              >
                <p><strong>Doctor:</strong> {appointment?.doctorName}</p>
                <p><strong>Date:</strong> {new Date(appointment?.appointmentDate).toLocaleDateString()}</p>
                <p><strong>Symptoms:</strong> {appointment?.symptoms}</p>
              </div>

              {selectedAppointment?.appointmentId === appointment.appointmentId && (
                <div className="history-details">
                  <p><strong>Diagnosis:</strong> {appointment?.diagnosis}</p>
                  <p><strong>Treatment Plan:</strong> {appointment?.treatmentPlan}</p>
                  <p><strong>Prescribed Medications:</strong> {appointment?.prescribedMedications}</p>
                  <p>
                    <strong>Recommended Tests:</strong>{' '}
                    {appointment?.recommendedTests?.length > 0
                      ? appointment.recommendedTests.join(', ')
                      : 'None'}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-records">No medical history records found.</p>
        )}
      </div>
    </div>
  );
};

export default MedicalHistory;
