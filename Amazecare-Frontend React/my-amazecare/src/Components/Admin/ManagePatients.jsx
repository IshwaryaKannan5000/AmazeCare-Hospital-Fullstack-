import React, { useState, useEffect } from "react";
import {
  viewAllPatients,
  getPatientByUserId,
  updatePatient,
  deletePatientWithUser,
  addPatient,
} from "../../Services/adminService";
import "./ManagePatients.css";

const ManagePatients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]); // [FILTER ADDED]
  const [editingPatientId, setEditingPatientId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    userId: "",
    fullName: "",
    contactNo: "",
    gender: "",
    dateOfBirth: "",
    medicalHistory: "",
    email: "",
  });
  const [newPatientForm, setNewPatientForm] = useState({
    fullName: "",
    email: "",
    password: "",
    contactNo: "",
    dateOfBirth: "",
    gender: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);

  // [FILTER ADDED]
  const [filter, setFilter] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await viewAllPatients();
      // Log the response to check the roleName field
    // console.log(res.data); 

    // Filter out patients with RoleName 'inactive'
    const activePatients = res.data.filter(patient => {
      const role = patient.roleName?.toLowerCase().trim();
      // console.log(`Checking patient with RoleName: ${role}`); // Log the roleName value
      return role !== "inactive";
    });

    setPatients(activePatients);
    setFilteredPatients(activePatients);
    } catch (error) {
      console.error("Error fetching patients", error);
    }
  };

  const handleEditClick = async (userId) => {
    try {
      const res = await getPatientByUserId(userId);
      const patient = res.data;
      setEditingPatientId(userId);
      setEditFormData({
        userId: patient.user.userId,
        fullName: patient.user.fullName || "",
        contactNo: patient.user.contactNo || "",
        gender: patient.user.gender || "",
        dateOfBirth: patient.user.dateOfBirth || "",
        medicalHistory: patient.medicalHistory || "",
        email: patient.user.email || "",
      });
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching patient details", error);
    }
  };

  const handleInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleNewPatientInputChange = (e) => {
    setNewPatientForm({ ...newPatientForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const updateBody = {
        userId: editFormData.userId,
        fullNameUpdate: { newFullName: editFormData.fullName },
        contactNoUpdate: { newContactNo: editFormData.contactNo },
        genderUpdate: { newGender: editFormData.gender },
        dateOfBirthUpdate: { newDateOfBirth: editFormData.dateOfBirth },
        medicalHistoryUpdate: { newMedicalHistory: editFormData.medicalHistory },
      };
      await updatePatient(updateBody);
      setShowModal(false);
      fetchPatients();
    } catch (error) {
      console.error("Error updating patient", error);
    }
  };

  const handleDelete = async (patientId) => {
    try {
      await deletePatientWithUser(patientId); // Marks user as inactive
      await fetchPatients(); // Refreshes to show only active patients
      alert("Patient deleted successfully.");
    } catch (error) {
      console.error("Error marking patient as inactive", error);
    }
  };
  

  const handleAddPatient = async () => {
    try {
      await addPatient(newPatientForm);
      setShowAddPatientModal(false);
      fetchPatients();
    } catch (error) {
      console.error("Error adding new patient", error);
    }
  };

  // [FILTER ADDED]
  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const applyFilter = () => {
    const name = filter.name.toLowerCase();
    const email = filter.email.toLowerCase();

    const filtered = patients.filter((patient) => {
      return (
        patient.fullName.toLowerCase().includes(name) &&
        patient.email.toLowerCase().includes(email)
      );
    });

    setFilteredPatients(filtered);
  };

  const clearFilter = () => {
    setFilter({ name: "", email: "" });
    setFilteredPatients(patients);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Patients</h2>
      <button
        className="bg-green-500 text-white px-4 py-2 mb-4"
        onClick={() => setShowAddPatientModal(true)}
      >
        Add New Patient
      </button>

      {/* [FILTER ADDED] */}
      <div className="filter-container">

        <input
          type="text"
          name="name"
          value={filter.name}
          onChange={handleFilterChange}
          placeholder="Filter by Name"
          className="border p-2"
        />
        <input
          type="text"
          name="email"
          value={filter.email}
          onChange={handleFilterChange}
          placeholder="Filter by Email"
          className="border p-2"
        />
        <div className="filter-buttons">
  <button className="bg-blue-500 text-white filter-button" onClick={applyFilter}>
    Apply Filter
  </button>
  <button className="bg-gray-400 text-white filter-button" onClick={clearFilter}>
    Clear
  </button>
</div>

      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">User ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.userId}>
              <td className="p-2 border">{patient.userId}</td>
              <td className="p-2 border">{patient.fullName}</td>
              <td className="p-2 border">{patient.email}</td>
              <td className="p-2 border">
                <button
                  className="button edit-button"
                  onClick={() => handleEditClick(patient.userId)}
                >
                  Edit
                </button>
                <button
                  className="button delete-button"
                  onClick={() => handleDelete(patient.patientId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowModal(false)}>
              &times;
            </button>
            <h3 className="text-lg font-semibold mb-2">Edit Patient Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                value={editFormData.fullName}
                onChange={handleInputChange}
                className="border p-2"
              />
              <input
                type="text"
                name="contactNo"
                value={editFormData.contactNo}
                onChange={handleInputChange}
                className="border p-2"
              />
              <input
                type="text"
                name="gender"
                value={editFormData.gender}
                onChange={handleInputChange}
                className="border p-2"
              />
              <input
                type="date"
                name="dateOfBirth"
                value={editFormData.dateOfBirth.split("T")[0]}
                onChange={handleInputChange}
                className="border p-2"
              />
              <textarea
                name="medicalHistory"
                value={editFormData.medicalHistory}
                onChange={handleInputChange}
                className="border p-2 col-span-2"
              />
            </div>
            <button className="bg-green-500 text-white px-4 py-2 mt-4" onClick={handleUpdate}>
              Save
            </button>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddPatientModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowAddPatientModal(false)}>
              &times;
            </button>
            <h3 className="text-lg font-semibold mb-2">Add New Patient</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                value={newPatientForm.fullName}
                onChange={handleNewPatientInputChange}
                className="border p-2"
                placeholder="Full Name"
              />
              <input
                type="email"
                name="email"
                value={newPatientForm.email}
                onChange={handleNewPatientInputChange}
                className="border p-2"
                placeholder="Email"
              />
              <input
                type="password"
                name="password"
                value={newPatientForm.password}
                onChange={handleNewPatientInputChange}
                className="border p-2"
                placeholder="Password"
              />
              <input
                type="text"
                name="contactNo"
                value={newPatientForm.contactNo}
                onChange={handleNewPatientInputChange}
                className="border p-2"
                placeholder="Contact No"
              />
              <input
                type="date"
                name="dateOfBirth"
                value={newPatientForm.dateOfBirth}
                onChange={handleNewPatientInputChange}
                className="border p-2"
              />
              <input
                type="text"
                name="gender"
                value={newPatientForm.gender}
                onChange={handleNewPatientInputChange}
                className="border p-2"
                placeholder="Gender"
              />
            </div>
            <button className="bg-green-500 text-white px-4 py-2 mt-4" onClick={handleAddPatient}>
              Add Patient
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePatients;