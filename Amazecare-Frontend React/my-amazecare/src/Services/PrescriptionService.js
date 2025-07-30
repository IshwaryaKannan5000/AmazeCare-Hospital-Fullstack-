import axios from "axios";
import { baseUrl } from "../environments/environment.dev";

export function fetchPrescriptionsByAppointmentId(appointmentId) {
  const token = localStorage.getItem("token"); // Get the token from localStorage

  if (!token) {
    console.error("No token found");
    throw new Error("Unauthorized: No token provided");
  }

  const url = `${baseUrl}/Prescription/appointment/${appointmentId}`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`, // Pass token here
    },
  })
  .then(response => response)
  .catch(error => {
    console.error(`Error fetching prescriptions for appointment ${appointmentId}:`, error);
    throw error;
  });
}



