import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AvailableDoctors.css';

const AvailableDoctors = () => {
  const [availableDoctors, setAvailableDoctors] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("❌ No token found in localStorage.");
      return;
    }
    axios.get('http://localhost:5207/api/Doctor/all',{
        headers: {
            Authorization: `Bearer ${token}`,
          },
    })
      .then(response => {
        setAvailableDoctors(response.data.filter(doc => doc.isAvailable));
      })
      .catch(error => {
        console.error('Error fetching available doctors:', error);
      });
  }, []);

  return (
    <div className="available-doctors section">
      {availableDoctors.length > 0 ? (
        <div>
          <h2 style={{ textAlign: 'center' }}>Available Doctors</h2>
          <div className="doctor-list">
            {availableDoctors.map((doctor, index) => (
              <div key={index} className="doctor-card">
                {/* <img src={`/images/docto.jpg`} alt={doctor.fullName} /> */}
                <h3>{doctor.fullName}</h3>
                <p><strong>Designation:</strong> {doctor.designation}</p>
                <p><strong>Specialty:</strong> {doctor.specialty}</p>
                <p><strong>Qualification:</strong> {doctor.qualification}</p>
                <p><strong>Experience:</strong> {doctor.experience} years</p>
                <p><strong>Status:</strong> {doctor.isAvailable ? 'Available' : 'Unavailable'}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p style={{ textAlign: 'center' }}>No available doctors found.</p>
      )}
    </div>
  );
};

export default AvailableDoctors;
