import React, { useEffect, useState } from "react";
import "./PatientProfile.css";
import {
  getPatientByUserId,
  updatePatientDetails,
  getEmergencyContacts,
  addEmergencyContact,
  updateEmergencyContact,
} from "../../Services/PatientService";
import { FiEdit2 } from "react-icons/fi";

const PatientProfile = () => {
  const userId = localStorage.getItem("userId");
  const [patient, setPatient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);

  const [view, setView] = useState("profile"); // profile | emergency | createEmergency
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [newContact, setNewContact] = useState({ contactName: "", relationship: "", contactNumber: "" });
  const [editContactId, setEditContactId] = useState(null);
  const [editContactData, setEditContactData] = useState({});
  const [error, setError] = useState('');


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getPatientByUserId(userId);
    setPatient(res);
    const contactRes = await getEmergencyContacts(res.patientId);
    setEmergencyContacts(contactRes || []);
  };

  const handleSave = async () => {
    try {
      const model = {
        userId: parseInt(userId),
        fullNameUpdate: { newFullName: patient.user.fullName },
        contactNoUpdate: { newContactNo: patient.user.contactNo },
        genderUpdate: { newGender: patient.user.gender },
        dateOfBirthUpdate: { newDateOfBirth: patient.user.dateOfBirth }
      };
  
      await updatePatientDetails(model);
  
      alert("Profile updated!");
      setIsEditing(false);
  
      
  
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageUploaded(true);
    }
  };

  const handleAddContact = async () => {
    const { contactName, relationship, contactNumber } = newContact;
  
    // Validation checks
    if (!contactName || !relationship || !contactNumber) {
      setError('All fields are required.');
      return;
    }
  
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(contactNumber)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
  
    try {
      const model = { patientId: patient.patientId, ...newContact };
      await addEmergencyContact(model);
      fetchData();
      setNewContact({ contactName: "", relationship: "", contactNumber: "" });
      setView("emergency");
      setError('');
    } catch (err) {
      setError('Failed to add contact. Please try again.');
    }
  };

  const handleUpdateContact = async () => {
    const model = {
      patientId: patient.patientId,
      newContactName: editContactData.contactName,
      newRelationship: editContactData.relationship,
      newContactNumber: editContactData.contactNumber,
    };
  
    await updateEmergencyContact(model);
    setEditContactId(null);
    fetchData(); // This should re-fetch updated contact info
  };
  

  if (!patient) return <p>Loading...</p>;

  return (
    <div className="profile-wrapper">
      {view === "profile" && (
        <div className="profile-card-view">
          <div className="avatar-section">
            <img src={image || "/assets/patient.png"} alt="Patient" className="profile-avatar" />
            {!imageUploaded && (
              <input type="file" accept="image/*" onChange={handleImageChange} className="upload-image" />
            )}
          </div>

          <div className="profile-fields">
            <div className="edit-icon" onClick={() => setIsEditing(!isEditing)}>
              <FiEdit2 size={18} />
            </div>

            <label>Full Name</label>
            <input
              type="text"
              disabled={!isEditing}
              value={patient.user.fullName}
              onChange={(e) => setPatient({ ...patient, user: { ...patient.user, fullName: e.target.value } })}
            />

            <label>Email</label>
            <input type="email" disabled value={patient.user.email} />

            <label>Contact No</label>
            <input
              type="tel"
              disabled={!isEditing}
              value={patient.user.contactNo}
              onChange={(e) => setPatient({ ...patient, user: { ...patient.user, contactNo: e.target.value } })}
            />

            <label>Date of Birth</label>
            <input
              type="date"
              disabled={!isEditing}
              value={patient.user.dateOfBirth?.slice(0, 10)}
              onChange={(e) => setPatient({ ...patient, user: { ...patient.user, dateOfBirth: e.target.value } })}
            />

            <label>Gender</label>
            <select
              disabled={!isEditing}
              value={patient.user.gender}
              onChange={(e) => setPatient({ ...patient, user: { ...patient.user, gender: e.target.value } })}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            {isEditing && (
              <div className="btn-group">
                <button onClick={handleSave}>Save</button>
              </div>
            )}
          </div>

          <button className="emergency-contact-btn" onClick={() => setView("emergency")}>
            Emergency Contact
          </button>
        </div>
      )}

      {view === "emergency" && (
        <div className="emergency-contact-view">
          <h3>Emergency Contacts</h3>
          <button className="back-to-profile-btn" onClick={() => setView("profile")}>← Back to Profile</button>
          <button className="create-emergency-btn" onClick={() => setView("createEmergency")}>
            + Create Emergency Contact
          </button>

          {emergencyContacts.map((contact) => (
            <div className="emergency-card" key={contact.contactId}>
              {editContactId === contact.contactId ? (
                <>
                  <input
                    type="text"
                    value={editContactData.contactName}
                    onChange={(e) => setEditContactData({ ...editContactData, contactName: e.target.value })}
                  />
                  <input
                    type="text"
                    value={editContactData.relationship}
                    onChange={(e) => setEditContactData({ ...editContactData, relationship: e.target.value })}
                  />
                  <input
                    type="tel"
                    value={editContactData.contactNumber}
                    onChange={(e) => setEditContactData({ ...editContactData, contactNumber: e.target.value })}
                  />
                  <button onClick={handleUpdateContact}>Save</button>
                </>
              ) : (
                <>
                  <p><strong>Name:</strong> {contact.contactName}</p>
                  <p><strong>Relationship:</strong> {contact.relationship}</p>
                  <p><strong>Phone:</strong> {contact.contactPhone}</p>
                  <button
                    onClick={() => {
                      setEditContactId(contact.contactId);
                      setEditContactData({
                        contactName: contact.contactName,
                        relationship: contact.relationship,
                        contactNumber: contact.contactPhone
                      });
                    }}
                  >
                    <FiEdit2 />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {view === "createEmergency" && (
        <div className="create-emergency-form-view">
          <h4>Add Emergency Contact</h4>

          {error && <p className="error-message">{error}</p>}
          <input
            type="text"
            placeholder="Name"
            value={newContact.contactName}
            onChange={(e) => setNewContact({ ...newContact, contactName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Relationship"
            value={newContact.relationship}
            onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Phone"
            value={newContact.contactNumber}
            onChange={(e) => setNewContact({ ...newContact, contactNumber: e.target.value })}
          />
          <button onClick={handleAddContact}>Create</button>
          <button className="back-to-emergency-btn" onClick={() => setView("emergency")}>← Back to Emergency Contacts</button>
        </div>
      )}
    </div>
  );
};

export default PatientProfile;
