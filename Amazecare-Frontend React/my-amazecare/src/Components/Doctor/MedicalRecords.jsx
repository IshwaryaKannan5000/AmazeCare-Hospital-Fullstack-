// MedicalRecords.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MedicalRecords.css'; // We'll define styles here

const MedicalRecords = ({ doctorId }) => {
  const [records, setRecords] = useState([]);
  const [expandedRecordId, setExpandedRecordId] = useState(null);
  const [editRecordId, setEditRecordId] = useState(null);
  const [formData, setFormData] = useState({
    symptoms: '',
    diagnosis: '',
    treatmentPlan: '',
    prescribedMedications: '',
    recommendedTestIds: [],
  });

  const [filterPatient, setFilterPatient] = useState('');
  const [filterDiagnosis, setFilterDiagnosis] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    if (doctorId) {
      fetchMedicalRecords();
    }
  }, [doctorId]);

  const fetchMedicalRecords = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5207/api/MedicalRecord/doctor/${doctorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const sorted = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setRecords(sorted);
    } catch (error) {
      console.error('Error fetching medical records:', error);
    }
  };

  const handleExpand = (recordId) => {
    setExpandedRecordId(expandedRecordId === recordId ? null : recordId);
    setEditRecordId(null);
  };

  const handleEdit = (record) => {
    setEditRecordId(record.recordId);
    setFormData({
      symptoms: record.symptoms || '',
      diagnosis: record.diagnosis || '',
      treatmentPlan: record.treatmentPlan || '',
      prescribedMedications: record.prescribedMedications || '',
      recommendedTestIds: [], // Assuming you'll fetch and handle test IDs separately
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (recordId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5207/api/MedicalRecord', {
        recordId,
        ...formData,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchMedicalRecords();
      setEditRecordId(null);
    } catch (error) {
      console.error('Error updating medical record:', error);
    }
  };

  const filteredRecords = records.filter(record =>
    record.patientName.toLowerCase().includes(filterPatient.toLowerCase()) &&
    record.diagnosis.toLowerCase().includes(filterDiagnosis.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirst, indexOfLast);

  return (
    <div className="doct-all-records-wrapper">
      <div className="medical-records-container">
        <h2>Medical Records</h2>

        {/* Filters */}
        <div className="filters">
          <input
            type="text"
            placeholder="Filter by Patient Name"
            value={filterPatient}
            onChange={(e) => {
              setFilterPatient(e.target.value);
              setCurrentPage(1);
            }}
          />
          <input
            type="text"
            placeholder="Filter by Diagnosis"
            value={filterDiagnosis}
            onChange={(e) => {
              setFilterDiagnosis(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Records */}
        {currentRecords.map((record) => (
          <div key={record.recordId} className="record-card">
            <div className="record-summary" onClick={() => handleExpand(record.recordId)}>
              <strong>Patient:</strong> {record.patientName} | <strong>Symptoms:</strong> {record.symptoms}
            </div>

            {expandedRecordId === record.recordId && (
              <div className="record-details">
                {editRecordId === record.recordId ? (
                  <div className="edit-form">
                    <label>
                      Symptoms:
                      <input type="text" name="symptoms" value={formData.symptoms} onChange={handleInputChange} />
                    </label>
                    <label>
                      Diagnosis:
                      <input type="text" name="diagnosis" value={formData.diagnosis} onChange={handleInputChange} />
                    </label>
                    <label>
                      Treatment Plan:
                      <input type="text" name="treatmentPlan" value={formData.treatmentPlan} onChange={handleInputChange} />
                    </label>
                    <label>
                      Prescribed Medications:
                      <input type="text" name="prescribedMedications" value={formData.prescribedMedications} onChange={handleInputChange} />
                    </label>
                    <button onClick={() => handleSave(record.recordId)}>Save</button>
                  </div>
                ) : (
                  <div className="record-info">
                    <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                    <p><strong>Treatment Plan:</strong> {record.treatmentPlan}</p>
                    <p><strong>Prescribed Medications:</strong> {record.prescribedMedications}</p>
                    <p><strong>Recommended Tests:</strong> {record.recommendedTestNames.join(', ') || 'None'}</p>
                    <button onClick={() => handleEdit(record)}>✏️ Edit</button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="dd-pagination">
            <button onClick={() => setCurrentPage((p) => p - 1)} disabled={currentPage === 1}>
              Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage((p) => p + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;
