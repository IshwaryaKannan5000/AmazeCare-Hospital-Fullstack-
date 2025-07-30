import axios from "axios";
import { baseUrl } from "../environments/environment.dev";

// ------------------ PATIENT APIs ------------------ //

// View all patients
export const viewAllPatients = () => {
    const token = localStorage.getItem('token');
  return axios.get(`${baseUrl}/PatientAuth/ViewAllPatients`,{
    headers: {
        Authorization: `Bearer ${token}`
      }
  });
};

// Get a single patient by userId
export const getPatientByUserId = (userId) => {
    const token = localStorage.getItem('token');
  return axios.get(`${baseUrl}/PatientAuth/get-patient-by-user/${userId}`,{
    headers: {
        Authorization: `Bearer ${token}`
      }
  });
};

// Update patient (uses AdminController - UpdatePatient)
export const updatePatient = (patientData) => {
    const token = localStorage.getItem('token'); 
  return axios.put(`${baseUrl}/Admin/UpdatePatient`, patientData, {
    headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`
        
        }
  });
};


// Delete patient and associated user by patientId (from PatientController)
export const deletePatientWithUser = (patientId) => {
    const token = localStorage.getItem('token');
    return axios.delete(`${baseUrl}/PatientAuth/delete-user-with-patient/${patientId}`,{
        headers: {
            Authorization: `Bearer ${token}` // Pass token here
          }
    });
  };
  

// Add a new patient (optional)
export const addPatient = (patientData) => {
    const token = localStorage.getItem('token'); 
  return axios.post(`${baseUrl}/Admin/add-patient`, patientData, {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` // Pass token here
      }
  });
};


// ------------------ DOCTOR APIs ------------------ //

// Add a new doctor
export const addDoctor = (doctorData) => {
    const token = localStorage.getItem('token'); 
  return axios.post(`${baseUrl}/Admin/add-doctor`, doctorData, {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` // Pass token here
      }
  });
};

// Update doctor
export const updateDoctor = (doctorData) => {
    const token = localStorage.getItem('token'); 
  return axios.put(`${baseUrl}/Admin/update-doctor`, doctorData, {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` // Pass token here
      }
  });
};

// Delete doctor by userId
export const deleteDoctorWithUser = (userId) => {
    const token = localStorage.getItem('token');
  return axios.delete(`${baseUrl}/Admin/delete-doctor/${userId}`,{
    headers: {
        Authorization: `Bearer ${token}` // Pass token here
      }
  });
};

export const getDoctorByUserId = (userId) => {
    const token = localStorage.getItem('token');
    return axios.get(`${baseUrl}/get-doctor-by-user/${userId}`,{
        headers: {
            Authorization: `Bearer ${token}` // Pass token here
          }
    });
  };
  
  // Get all doctors
  export const viewAllDoctors = () => {
    const token = localStorage.getItem('token');
    return axios.get(`${baseUrl}/Doctor/all`,{
        headers: {
            Authorization: `Bearer ${token}` // Pass token here
          }
    });
  };
