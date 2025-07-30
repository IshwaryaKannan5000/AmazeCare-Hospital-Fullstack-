import axios from "axios";
import { baseUrl } from "../environments/environment.dev";



export function updateAppointmentStatus(appointmentId, newStatus) {
  const token = localStorage.getItem('token'); // Get token from localStorage

  return axios.put(
    `${baseUrl}/Doctor/appointment/${appointmentId}/status`,
    JSON.stringify(newStatus),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` // Pass token here
      }
    }
  );
}

