import { baseUrl } from "../environments/environment.dev";

// Get patient by user ID
export const getPatientByUserId = async (userId) => {
  const token = localStorage.getItem("token"); // ✅ Retrieve token

  if (!token) {
    console.error("No token found");
    throw new Error("Unauthorized: No token provided");
  }
  try {
    const response = await fetch(`${baseUrl}/PatientAuth/get-patient-by-user/${userId}`,{
      headers: {
        Authorization: `Bearer ${token}` // ✅ Add token in request header
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch patient by user ID");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching patient by user ID:", error);
    throw error;
  }
};

export const updatePatientDetails = async (updateModel) => {
  const token = localStorage.getItem("token"); // ✅ Get token from localStorage

  if (!token) {
    console.error("No token found");
    throw new Error("Unauthorized: No token provided");
  }
  try {
    const response = await fetch(`${baseUrl}/PatientUpdate`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // ✅ Pass token here
      },
      body: JSON.stringify(updateModel),
    });

    const textResponse = await response.text();
    console.log("Raw response:", textResponse);

    if (!response.ok) {
      throw new Error(textResponse || "Failed to update patient details");
    }

    return textResponse; // just return the success message
  } catch (error) {
    console.error("Error updating patient details:", error);
    throw error;
  }
};

  
// Get emergency contacts
export const getEmergencyContacts = async (patientId) => {
  const token = localStorage.getItem("token"); // ✅ Get token from localStorage

  if (!token) {
    console.error("No token found");
    throw new Error("Unauthorized: No token provided");
  }
  try {
    const response = await fetch(`${baseUrl}/PatientAuth/emergency-contact/${patientId}`,{
      headers: {
        "Authorization": `Bearer ${token}` // ✅ Pass token here
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch emergency contacts");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching emergency contacts:", error);
    throw error;
  }
};

// Add emergency contact
export const addEmergencyContact = async (model) => {
  const token = localStorage.getItem("token"); // ✅ Get token from localStorage

  if (!token) {
    console.error("No token found");
    throw new Error("Unauthorized: No token provided");
  }
  try {
    const response = await fetch(`${baseUrl}/PatientAuth/add-emergency-contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify(model),
    });
    if (!response.ok) {
      throw new Error("Failed to add emergency contact");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding emergency contact:", error);
    throw error;
  }
};

// Update emergency contact
export const updateEmergencyContact = async (model) => {
  const token = localStorage.getItem("token"); // ✅ Get token from localStorage

  if (!token) {
    console.error("No token found");
    throw new Error("Unauthorized: No token provided");
  }
  try {
    const response = await fetch(`${baseUrl}/PatientAuth/update-emergency-contact`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(model),
    });
    if (!response.ok) {
      throw new Error("Failed to update emergency contact");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating emergency contact:", error);
    throw error;
  }
};
