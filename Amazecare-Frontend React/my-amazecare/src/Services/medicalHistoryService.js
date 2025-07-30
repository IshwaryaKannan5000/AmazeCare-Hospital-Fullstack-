import axios from "axios";
import { baseUrl } from "../environments/environment.dev";

export const getMedicalHistory = async (patientId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    throw new Error("Unauthorized: No token provided");
  }
    try {
      const response = await fetch(`${baseUrl}/PatientAuth/medical-history/${patientId}`,{
        headers: {
          Authorization: `Bearer ${token}` // ✅ Send token in Authorization header
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch medical history');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching medical history:', error);
      throw error;
    }
  };
