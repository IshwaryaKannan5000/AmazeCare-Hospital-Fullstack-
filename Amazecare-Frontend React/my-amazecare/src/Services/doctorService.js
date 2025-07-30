import axios from "axios";
import { baseUrl } from "../environments/environment.dev";

export function fetchAllDoctors() {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("❌ No token found in localStorage.");
    throw new Error("Authentication token missing");
  }

  return axios.get(`${baseUrl}/Doctor/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response)
    .catch(error => {
      console.error("Error fetching doctor data:", error);
      throw error;
    });
}


export function fetchDoctorTimeSlots(doctorId) {
  const token = localStorage.getItem("token"); 
  return axios.get(`${baseUrl}/Doctor/${doctorId}/timeslots`,{
    headers: {
      Authorization: `Bearer ${token}` // ✅ Attach token to request
    }
  })
    .then(response => response)
    .catch(error => {
      console.error(`Error fetching time slots for doctor ${doctorId}:`, error);
      throw error;
    });
}

export function scheduleAppointment(appointmentData) {
  const token = localStorage.getItem("token"); 
  return axios.post(`${baseUrl}/Appointment/schedule`, appointmentData,{
    headers: {
      Authorization: `Bearer ${token}` // ✅ Add token to Authorization header
    }
  })
    .then(response => response)
    .catch(error => {
      console.error("Error scheduling appointment:", error);
      throw error;
    });
}

export async function getCurrentPatientId() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    
    console.log('Stored User ID from localStorage:', userId);
  
    if (!userId) {
      console.error('Missing userId');
      return null; // Return null if there's no valid userId
    }
  
    try {
      const response = await axios.get(`http://localhost:5207/api/PatientAuth/get-patient-by-user/${userId}`,{
        headers: {
          Authorization: `Bearer ${token}` // ✅ Send token in Authorization header
        }
      });
      
      if (response.data && response.data.patientId) {
        return response.data.patientId;  
      } else {
        console.error('Patient ID not found in response.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching patient ID:', error);
      return null;
    }
}
