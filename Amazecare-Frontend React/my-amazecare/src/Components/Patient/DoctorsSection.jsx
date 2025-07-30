import React, { useEffect, useState } from 'react';
import './PatientDashboard.css';
import {
  fetchAllDoctors,
  fetchDoctorTimeSlots,
  scheduleAppointment,
  getCurrentPatientId
} from '../../Services/doctorService';

const DoctorsSection = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [dates, setDates] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); // ✅ Error message state

  useEffect(() => {
    fetchAllDoctors()
      .then(response => {
        const filtered = response.data.filter(doc => {
          const role = doc.roleName?.toLowerCase().trim();
          const include = role !== 'inactive';
          console.log(`${doc.fullName} | role: ${role} => ${include ? '✅ included' : '❌ excluded'}`);
          return include;
        });
        setDoctors(filtered);
      })
      .catch(error => console.error("Error fetching doctor data:", error));
  }, []);

  const filteredDoctors = doctors.filter(doctor =>
    (doctor.fullName && doctor.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (doctor.specialty && doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setShowAppointmentForm(false);
    setErrorMessage('');
    loadDoctorTimeSlots(doctor.doctorId);
    // console.log("Doctor Selected:", doctor.fullName); // ✅ Log selected doctor
    // console.log("Doctor Availability:", doctor.isAvailable);  
  };

  const loadDoctorTimeSlots = async (doctorId) => {
    try {
      const response = await fetchDoctorTimeSlots(doctorId);
      const slots = response.data;
  
      // 🛠️ Filter slots: Only future slots based on current time
      const now = new Date();
  
      const futureSlots = slots.filter(slot => new Date(slot.startTime) > now);
  
      setAvailableTimeSlots(futureSlots); // Set only future time slots
  
      const uniqueDates = [
        ...new Set(futureSlots.map(slot => new Date(slot.startTime).toISOString().split('T')[0]))
      ];
      setDates(uniqueDates);
      
      // console.log("Available Future Time Slots:", futureSlots);
  
    } catch (error) {
      console.error("Error fetching time slots:", error);
    }
  };
  

  const handleBookAppointment = async () => {
    const patientId = await getCurrentPatientId();

    if (!patientId) {
      alert("❌ Patient not logged in or session expired. Please log in.");
      return;
    }

    if (selectedDate && selectedTime && symptoms) {
      const localDateTimeString = `${selectedDate}T${selectedTime}`;

      // Find the selected time slot
      const selectedSlot = availableTimeSlots.find(slot => {
        const startTime = new Date(slot.startTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
        return startTime === selectedTime;
      });

      if (selectedSlot && selectedSlot.bookingCount >= 7) {
        setErrorMessage('❌ This time slot is fully booked. Please choose a different time.');
        return;
      }

      const appointmentData = {
        patientId: parseInt(patientId),
        doctorId: selectedDoctor.doctorId,
        appointmentDate: localDateTimeString,
        symptoms: symptoms.trim(),
      };

      // console.log("📦 Appointment Data Sent to API:", appointmentData);

      try {
        await scheduleAppointment(appointmentData);
        alert('✅ Appointment successfully booked!');
        setShowAppointmentForm(false);
        setSelectedDate('');
        setSelectedTime('');
        setSymptoms('');
        setErrorMessage('');
      } catch (error) {
        console.error("Appointment booking failed:", error);
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message); // ✅ Show backend message
        } else {
          setErrorMessage('❌ Failed to book appointment. Please try again.');
        }
      }
    } else {
      setErrorMessage('⚠️ Please complete all fields before booking.');
    }
  };

  const handleCancel = () => {
    setShowAppointmentForm(false);
    setErrorMessage('');
  };

  return (
    <div>
      {!selectedDoctor ? (
        <div className="section">
          <h1 style={{ textAlign: 'center' }}>Find a Doctor</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for doctor or specialty"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div id="doctorList">
            {filteredDoctors.map((doctor, index) => (
              <div key={index} className="doctor-card" onClick={() => handleSelectDoctor(doctor)}>
                {/* <img src={`/images/${doctor.img}`} alt={doctor.fullName} /> */}
                <h3>{doctor.fullName}</h3>
                <p>{doctor.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="section">
          <div className="doctor-profile-container">
            <button className="back-btn" onClick={() => setSelectedDoctor(null)}>← Back</button>

            {!showAppointmentForm && (
              <div className="doctor-details">
                {/* <img src={`/images/${selectedDoctor.img}`} alt={selectedDoctor.fullName} /> */}
                <h2>{selectedDoctor.fullName}</h2>
                <p><strong>Specialty:</strong> {selectedDoctor.specialty}</p>
                <p><strong>Experience:</strong> {selectedDoctor.experience}</p>
                <p><strong>Status:</strong> {selectedDoctor.isAvailable ? 'Available' : 'Unavailable'}</p>

                <button
                  className="book-btn"
                  onClick={() => {
                    setShowAppointmentForm(true);
                    setErrorMessage('');
                  }}
                  disabled={!selectedDoctor.isAvailable}
                  style={{
                    backgroundColor: selectedDoctor.isAvailable ? '#4CAF50' : '#D3D3D3',
                    cursor: selectedDoctor.isAvailable ? 'pointer' : 'not-allowed'
                  }}
                >
                  {selectedDoctor.isAvailable ? 'Book an Appointment' : 'Unavailable'}
                </button>
              </div>
            )}

            {showAppointmentForm && (
              <div className="appointment-form">
                <h2>Book an Appointment</h2>

                <label htmlFor="appointmentDate">Select Date:</label>
                <select
                  id="appointmentDate"
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setErrorMessage('');
                  }}
                  required
                >
                  <option value="">-- Select a Date --</option>
                  {dates.map(date => (
                    <option key={date} value={date}>{date}</option>
                  ))}
                </select>

                <label htmlFor="appointmentTime">Select Time:</label>
                <select
                  id="appointmentTime"
                  value={selectedTime}
                  onChange={(e) => {
                    setSelectedTime(e.target.value);
                    setErrorMessage('');
                  }}
                  required
                >
                  <option value="">-- Select a Time Slot --</option>
                  {availableTimeSlots
                    .filter(slot => new Date(slot.startTime).toISOString().split('T')[0] === selectedDate)
                    .map((slot) => {
                      const startTime = new Date(slot.startTime);
                      const endTime = new Date(slot.endTime);
                      const startTimeString = startTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
                      const endTimeString = endTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
                  
                      return (
                        <option key={slot.timeSlotId} value={startTimeString}>
                          {startTimeString} - {endTimeString} {slot.bookingCount >= 7 ? '(Fully Booked)' : ''}
                        </option>
                      );
                    })}
                </select>

                <label htmlFor="symptoms">Symptoms:</label>
                <input
                  type="text"
                  id="symptoms"
                  value={symptoms}
                  onChange={(e) => {
                    setSymptoms(e.target.value);
                    setErrorMessage('');
                  }}
                  required
                />

                {/* ✅ Error message display */}
                {errorMessage && (
                  <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>
                    {errorMessage}
                  </div>
                )}

                <button className="confirm-btn" onClick={handleBookAppointment}>Confirm Appointment</button>
                <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsSection;
