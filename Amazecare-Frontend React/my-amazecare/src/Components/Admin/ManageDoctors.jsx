
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageDoctors.css";

const ManageDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false); // State for the "Add Doctor" modal
  const [specialties, setSpecialties] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    fullName: "",
    contactNo: "",
    gender: "",
    dateOfBirth: "",
    experience: 0,
    qualification: "",
    designation: "",
    specialty: "",
  });

  const [newDoctorData, setNewDoctorData] = useState({
    fullName: "",
    email: "",
    password: "",
    contactNo: "",
    gender: "",
    dateOfBirth: "",
    specialtyId: 0,
    experience: 0,
    qualification: "",
    designation: "",
  });

  const [filters, setFilters] = useState({
    doctorName: "",
    specialty: "",
    availability: "",
  });


  useEffect(() => {
    fetchDoctors();
    fetchSpecialties();
  }, []);

  const fetchDoctors = async () => {
    try {
        const token = localStorage.getItem('token'); 
      const res = await axios.get("http://localhost:5207/api/Doctor/all",{
        headers: {
            Authorization: `Bearer ${token}` // Pass token here
          }
      });
         // Log the response to check the roleName field
    console.log(res.data);

    // Filter out doctors with RoleName 'inactive'
    const activeDoctors = res.data.filter(doctor => {
      const role = doctor.roleName?.toLowerCase().trim();

      console.log(`Checking doctor with RoleName: ${role}`); // Log the roleName value
      return role !== "inactive";
    });

    // Set the active doctors to state
    setDoctors(activeDoctors);
    setFilteredDoctors(activeDoctors);

    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  const fetchSpecialties = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const res = await axios.get("http://localhost:5207/api/Doctor/get-all-specialties",{
        headers: {
          Authorization: `Bearer ${token}` // Pass token here
        }

      });
      console.log("Fetched specialties:", res.data); // This will print the fetched specialties to the console
      setSpecialties(res.data);
    } catch (err) {
      console.error("Error fetching specialties:", err);
    }
  };

  const openEditModal = async (userId) => {
  

    try {
        const token = localStorage.getItem('token');
      const res = await axios.get(
        `http://localhost:5207/api/Doctor/get-doctor-by-user/${userId}`,
        {
            headers: {
                Authorization: `Bearer ${token}` // Pass token here
              }

        }
      );
      const data = res.data;
      console.log("Fetched doctors:", res.data);


      setFormData({
        userId: data.userId,
        fullName: data.fullName || "",
        contactNo: data.contact || "",
        gender: data.gender || "",
        dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
        experience: data.experience || 0,
        qualification: data.qualification || "",
        designation: data.designation || "",
        specialty: data.specialty || "",
      });

      setShowModal(true);
    } catch (err) {
      console.error("Error fetching doctor details:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "experience" ? (isNaN(value) ? 0 : parseInt(value)) : value,
    }));
  };

  const handleNewDoctorChange = (e) => {
    const { name, value } = e.target;
    setNewDoctorData((prev) => ({
      ...prev,
      [name]:
        name === "experience" ? (isNaN(value) ? 0 : parseInt(value)) : value,
    }));
  };

  const handleUpdate = async () => {
    try {
        const token = localStorage.getItem('token');
      const payload = {
        userId: formData.userId,
        newFullName: formData.fullName,
        newContactNo: formData.contactNo,
        newGender: formData.gender,
        newDateOfBirth: formData.dateOfBirth
          ? new Date(formData.dateOfBirth).toISOString()
          : null,
        newExperience: formData.experience,
        newQualification: formData.qualification,
        newDesignation: formData.designation,
      };

      await axios.put("http://localhost:5207/api/Admin/update-doctor", payload,{
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
      });
      alert("Doctor updated successfully!");
      setShowModal(false);
      fetchDoctors();
    } catch (err) {
      console.error("Error updating doctor:", err);
      alert("Failed to update doctor");
    }
  };
  
  const handleDeleteDoctor = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;
  
    try {
        const token = localStorage.getItem('token');
    //   await axios.delete(`http://localhost:5207/api/Admin/delete-doctor/${userId}`);
    await axios.delete(`http://localhost:5207/api/Admin/delete-doctor/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
        }
      });
      
      alert("Doctor deleted successfully!");
      fetchDoctors(); // Refresh the list
    } catch (err) {
      console.error("Error deleting doctor:", err);
      alert("Failed to delete doctor");
    }
  };
  

  const handleAddDoctor = async () => {
    try {
        const token = localStorage.getItem('token');
        const specialtyId = newDoctorData.specialtyId !== "" ? parseInt(newDoctorData.specialtyId) : 0;

      const payload = {
        fullName: newDoctorData.fullName,
        email: newDoctorData.email,
        password: newDoctorData.password,
        contactNo: newDoctorData.contactNo,
        gender: newDoctorData.gender,
        dateOfBirth: new Date(newDoctorData.dateOfBirth).toISOString(),
        specialtyId: specialtyId, 
        experience: newDoctorData.experience,
        qualification: newDoctorData.qualification,
        designation: newDoctorData.designation,
      };

      await axios.post("http://localhost:5207/api/Admin/add-doctor", payload,{
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
      });
      alert("Doctor added successfully!");
      setShowAddModal(false);
      fetchDoctors(); // Refresh doctor list after adding new doctor
    } catch (err) {
      console.error("Error adding doctor:", err);
      alert("Failed to add doctor");
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const filtered = doctors.filter((doctor) => {
      const matchesDoctorName =
        filters.doctorName === "" || doctor.fullName.toLowerCase().includes(filters.doctorName.toLowerCase());
      const matchesSpecialty =
        filters.specialty === "" || doctor.specialty.toLowerCase().includes(filters.specialty.toLowerCase());
      const matchesAvailability =
        filters.availability === "" || (filters.availability === "available" ? doctor.isAvailable : !doctor.isAvailable);

      return matchesDoctorName && matchesSpecialty && matchesAvailability;
    });

    setFilteredDoctors(filtered);
  };

  const clearFilters = () => {
    setFilters({ doctorName: "", specialty: "", availability: "" });
    setFilteredDoctors(doctors);
  };


  

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Doctors</h2>
         {/* Filter Section */}
         <div className="filter-section">
        <div className="filter-inputs">
          <input
            type="text"
            placeholder="Search by Doctor Name"
            name="doctorName"
            value={filters.doctorName}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="text"
            placeholder="Search by Specialty"
            name="specialty"
            value={filters.specialty}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <select
            name="availability"
            value={filters.availability}
            onChange={handleFilterChange}
            className="filter-input"
          >
            <option value="">Select Availability</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
        <div className="filter-buttons">
          <button className="apply-filters-btn" onClick={applyFilters}>Apply Filter</button>
          <button className="clear-filters-btn" onClick={clearFilters}>Clear Filter</button>
        </div>
      </div>

      <button onClick={() => setShowAddModal(true)}>Add Doctor</button> {/* Add Doctor Button */}

      <table className="doctor-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Designation</th>
            <th>Specialty</th>
            <th>Experience</th>
            <th>Qualification</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {filteredDoctors.map((doc) => (
            <tr key={doc.userId}>
              <td>{doc.fullName}</td>
              <td>{doc.designation}</td>
              <td>{doc.specialty}</td>
              <td>{doc.experience} yrs</td>
              <td>{doc.qualification}</td>
              <td>{doc.isAvailable ? "Yes" : "No"}</td>
              <td>
                <button className="btn edit-btn-doc" onClick={() => openEditModal(doc.userId)}>Edit</button>
                <button className="btn delete-btn-doc" onClick={() => handleDeleteDoctor(doc.userId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Doctor Modal */}
      {showModal && (
        <div className="edit-modal-overlay">
          <div className="edit-modal-content">
            <h3>Edit Doctor</h3>
            <label>Full Name:</label>
            <input name="fullName" value={formData.fullName} onChange={handleChange} />
            <label>Contact No:</label>
            <input name="contactNo" value={formData.contactNo} onChange={handleChange} />
            <label>Gender:</label>
            <input name="gender" value={formData.gender} onChange={handleChange} />
            <label>Date of Birth:</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
            <label>Experience:</label>
            <input type="number" name="experience" value={formData.experience} onChange={handleChange} />
            <label>Qualification:</label>
            <input name="qualification" value={formData.qualification} onChange={handleChange} />
            <label>Designation:</label>
            <input name="designation" value={formData.designation} onChange={handleChange} />
            <button onClick={handleUpdate}>Save Changes</button>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Add Doctor Modal */}
      {showAddModal && (
        <div className="edit-modal-overlay">
          <div className="edit-modal-content">
            <h3>Add New Doctor</h3>
            <label>Full Name:</label>
            <input name="fullName" value={newDoctorData.fullName} onChange={handleNewDoctorChange} />
            <label>Email:</label>
            <input name="email" value={newDoctorData.email} onChange={handleNewDoctorChange} />
            <label>Password:</label>
            <input type="password" name="password" value={newDoctorData.password} onChange={handleNewDoctorChange} />
            <label>Contact No:</label>
            <input name="contactNo" value={newDoctorData.contactNo} onChange={handleNewDoctorChange} />
            <label>Gender:</label>
            <input name="gender" value={newDoctorData.gender} onChange={handleNewDoctorChange} />
            <label>Date of Birth:</label>
            <input type="date" name="dateOfBirth" value={newDoctorData.dateOfBirth} onChange={handleNewDoctorChange} />
            <label>Specialty:</label>
                  
                  
            <select name="specialtyId" value={newDoctorData.specialtyId} onChange={handleNewDoctorChange}>
            <option value={0}>Select Specialty</option>
            {specialties.map((spec) => (
            <option key={spec.specialtyId} value={spec.specialtyId}>
              {spec.specialtyName}
            </option>
            ))}
            </select>


            <label>Experience:</label>
            <input type="number" name="experience" value={newDoctorData.experience} onChange={handleNewDoctorChange} />
            <label>Qualification:</label>
            <input name="qualification" value={newDoctorData.qualification} onChange={handleNewDoctorChange} />
            <label>Designation:</label>
            <input name="designation" value={newDoctorData.designation} onChange={handleNewDoctorChange} />
            <button onClick={handleAddDoctor}>Add Doctor</button>
            <button onClick={() => setShowAddModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDoctor;
