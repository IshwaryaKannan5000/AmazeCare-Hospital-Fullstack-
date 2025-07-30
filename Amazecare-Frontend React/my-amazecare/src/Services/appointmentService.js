import axios from "axios";
import { baseUrl } from "../environments/environment.dev";

export function fetchAppointmentsByPatientId(patientId) {
  const token = localStorage.getItem("token");

  if (token && token.trim() !== "") {
    console.log("✅ Valid token found:", token);
  } else {
    console.error("❌ No valid token found.");
  }

  const url = `${baseUrl}/Appointment/patient/${patientId}`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}



export function cancelAppointmentById(appointmentId) {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("❌ No token found in localStorage.");
    throw new Error("Authentication token missing");
  }

  const url = `${baseUrl}/Appointment/cancel/${appointmentId}`;

  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
