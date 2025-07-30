// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './DoctorProfile.css';

// const DoctorProfile = () => {
//   const [doctor, setDoctor] = useState(null);
//   const [timeSlots, setTimeSlots] = useState([]);
//   const [editSlotId, setEditSlotId] = useState(null);
//   const [editedSlot, setEditedSlot] = useState({});
//   const [showSlots, setShowSlots] = useState(false);
//   const [doctorImage, setDoctorImage] = useState(null);

//   useEffect(() => {
//     const storedUserId = localStorage.getItem('userId');
//     if (storedUserId) {
//       fetchDoctorDetails(storedUserId);
//     } else {
//       console.error('No userId found in localStorage');
//     }
//   }, []);

//   const fetchDoctorDetails = async (userId) => {
//     try {
//         const token = localStorage.getItem('token');
//       const response = await axios.get(`http://localhost:5207/api/Doctor/get-doctor-by-user/${userId}`,{
//         headers: {
//             Authorization: `Bearer ${token}` // Pass token here
//           }
//       });
//       const data = response.data;
//       setDoctor(data);
//       fetchTimeSlots(data.doctorId);
//     } catch (error) {
//       console.error('Error fetching doctor details:', error);
//     }
//   };

//   const fetchTimeSlots = async (doctorId) => {
//     try {
//         const token = localStorage.getItem('token');
//       const response = await axios.get(`http://localhost:5207/api/Doctor/${doctorId}/timeslots`,{
//         headers: {
//             Authorization: `Bearer ${token}` // Pass token here
//           }
//       });
//       setTimeSlots(response.data);
//     } catch (error) {
//       console.error('Error fetching time slots:', error);
//     }
//   };

//   const handleEditClick = (slot) => {
//     setEditSlotId(slot.timeSlotId);
//     setEditedSlot({
//       ...slot,
//       startTime: slot.startTime.slice(0, 16),
//       endTime: slot.endTime.slice(0, 16),
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setEditedSlot(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem('token'); // Get token from localStorage
  
//       await axios.put(
//         `http://localhost:5207/api/Doctor/${doctor.doctorId}/timeslots/${editSlotId}`,
//         {
//           startTime: new Date(editedSlot.startTime).toISOString(),
//           endTime: new Date(editedSlot.endTime).toISOString(),
//           isAvailable: editedSlot.isAvailable
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`  // Pass token here
//           }
//         }
//       );
  
//       setEditSlotId(null);
//       fetchTimeSlots(doctor.doctorId);
//     } catch (error) {
//       console.error("Failed to update time slot:", error);
//     }
//   };
  

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         // Save image in Base64 to localStorage
//         localStorage.setItem('doctorImage', reader.result);
//         setDoctorImage(reader.result);  // Display the image immediately
//       };
//       reader.readAsDataURL(file);
//     }
//   };
  
//   // On page load, check if the image is in localStorage
//   useEffect(() => {
//     const savedImage = localStorage.getItem('doctorImage');
//     if (savedImage) {
//       setDoctorImage(savedImage);  // Set the image if it exists in localStorage
//     }
//   }, []);
  

//   const handleBackToProfile = () => {
//     setShowSlots(false);
//     setEditSlotId(null);
//   };


//   // Logout function
//   const handleLogout = () => {
//     localStorage.removeItem('userId'); // Remove userId from localStorage
//     localStorage.removeItem('doctorImage');
//     localStorage.removeItem('token');  // Remove doctor image from localStorage
//     window.location.href = '/login'; // Redirect to login page
//     window.location.reload();
//   };

//   return (
//     <div className="profile-container">
//       {!showSlots && doctor && (
//         <>
//           <h2>Doctor Profile</h2>
//           <div className="profile-flexbox">
//             <div className="image-section">
//               {doctorImage ? (
//                 <img src={doctorImage} alt="Doctor" className="doctor-image" />
//               ) : (
//                 <div className="image-placeholder">No Image Uploaded</div>
//               )}
//               <input type="file" accept="image/*" onChange={handleImageUpload} />
//             </div>

//             <div className="details-section">
//               <p><strong>Name:</strong> {doctor.fullName}</p>
//               <p><strong>Designation:</strong> {doctor.designation}</p>
//               <p><strong>Specialty:</strong> {doctor.specialty}</p>
//               <p><strong>Experience:</strong> {doctor.experience} years</p>
//               <p><strong>Qualification:</strong> {doctor.qualification}</p>
//               <p><strong>Status:</strong> {doctor.isAvailable ? "Available" : "Not Available"}</p>

//               <button onClick={() => setShowSlots(true)}>
//                 Manage Time Slots
//               </button>
//             </div>
//           </div>
//         </>
//       )}

//       {showSlots && (
//         <>
//           <h2>Manage Time Slots</h2>
//           <button onClick={handleBackToProfile} style={{ marginBottom: '10px' }}>
//             ← Back to Profile
//           </button>
//           <div className="slot-table">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Start Time</th>
//                   <th>End Time</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {timeSlots.map(slot => (
//                   <tr key={slot.timeSlotId}>
//                     {editSlotId === slot.timeSlotId ? (
//                       <>
//                         <td>
//                           <input
//                             type="datetime-local"
//                             name="startTime"
//                             value={editedSlot.startTime}
//                             onChange={handleChange}
//                           />
//                         </td>
//                         <td>
//                           <input
//                             type="datetime-local"
//                             name="endTime"
//                             value={editedSlot.endTime}
//                             onChange={handleChange}
//                           />
//                         </td>
//                         <td>
//                           <input
//                             type="checkbox"
//                             name="isAvailable"
//                             checked={editedSlot.isAvailable}
//                             onChange={handleChange}
//                           /> Available
//                         </td>
//                         <td>
//                           <button onClick={handleSave}>Save</button>
//                           <button onClick={() => setEditSlotId(null)}>Cancel</button>
//                         </td>
//                       </>
//                     ) : (
//                       <>
//                         <td>{new Date(slot.startTime).toLocaleString()}</td>
//                         <td>{new Date(slot.endTime).toLocaleString()}</td>
//                         <td>{slot.isAvailable ? 'Available' : 'Unavailable'}</td>
//                         <td>
//                           <button onClick={() => handleEditClick(slot)}>Edit</button>
//                         </td>
//                       </>
//                     )}
//                   </tr>
//                 ))}
//                 {timeSlots.length === 0 && (
//                   <tr><td colSpan="4">No time slots found.</td></tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}

//        {/* Logout Button */}
//        <div className="logout-section">
//         <button onClick={handleLogout}>Logout</button>
//       </div>
//     </div>
//   );
// };

// export default DoctorProfile;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DoctorProfile.css';

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [editSlotId, setEditSlotId] = useState(null);
  const [editedSlot, setEditedSlot] = useState({});
  const [showSlots, setShowSlots] = useState(false);
  const [doctorImage, setDoctorImage] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSlot, setNewSlot] = useState({
    startTime: '',
    endTime: '',
    isAvailable: true
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      fetchDoctorDetails(storedUserId);
    } else {
      console.error('No userId found in localStorage');
    }
  }, []);

  const fetchDoctorDetails = async (userId) => {
    try {
        const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5207/api/Doctor/get-doctor-by-user/${userId}`,{
        headers: {
            Authorization: `Bearer ${token}` // Pass token here
          }
      });
      const data = response.data;
      setDoctor(data);
      fetchTimeSlots(data.doctorId);
    } catch (error) {
      console.error('Error fetching doctor details:', error);
    }
  };

  const fetchTimeSlots = async (doctorId) => {
    try {
        const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5207/api/Doctor/${doctorId}/timeslots`,{
        headers: {
            Authorization: `Bearer ${token}` // Pass token here
          }
      });
      setTimeSlots(response.data);
    } catch (error) {
      console.error('Error fetching time slots:', error);
    }
  };

  const handleEditClick = (slot) => {
    setEditSlotId(slot.timeSlotId);
    setEditedSlot({
      ...slot,
      startTime: slot.startTime.slice(0, 16),
      endTime: slot.endTime.slice(0, 16),
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
  
    if (editSlotId !== null) {
      setEditedSlot(prev => ({
        ...prev,
        [name]: inputValue,
      }));
    } else {
      setNewSlot(prev => ({
        ...prev,
        [name]: inputValue,
      }));
    }
  };
  

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
  
      await axios.put(
        `http://localhost:5207/api/Doctor/${doctor.doctorId}/timeslots/${editSlotId}`,
        {
          startTime: editedSlot.startTime, // No conversion here
        endTime: editedSlot.endTime, // No conversion here
        isAvailable: editedSlot.isAvailable
        },
        {
          headers: {
            Authorization: `Bearer ${token}`  // Pass token here
          }
        }
      );
  
      setEditSlotId(null);
      fetchTimeSlots(doctor.doctorId);
    } catch (error) {
      console.error("Failed to update time slot:", error);
    }
  };

  const handleAddSlot = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5207/api/Doctor/${doctor.doctorId}/timeslots`,
        {
          startTime: newSlot.startTime, // No conversion here
          endTime: newSlot.endTime, // No conversion here
          isAvailable: newSlot.isAvailable
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setShowAddForm(false);
      setNewSlot({ startTime: '', endTime: '', isAvailable: true });
      fetchTimeSlots(doctor.doctorId);
    } catch (error) {
      console.error("Failed to add time slot:", error);
    }
  };
  

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Save image in Base64 to localStorage
        localStorage.setItem('doctorImage', reader.result);
        setDoctorImage(reader.result);  // Display the image immediately
      };
      reader.readAsDataURL(file);
    }
  };
  
  // On page load, check if the image is in localStorage
  useEffect(() => {
    const savedImage = localStorage.getItem('doctorImage');
    if (savedImage) {
      setDoctorImage(savedImage);  // Set the image if it exists in localStorage
    }
  }, []);
  

  const handleBackToProfile = () => {
    setShowSlots(false);
    setEditSlotId(null);
  };


  


  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('userId'); // Remove userId from localStorage
    localStorage.removeItem('doctorImage');
    localStorage.removeItem('token');  // Remove doctor image from localStorage
    window.location.href = '/login'; // Redirect to login page
    window.location.reload();
  };

  return (
    <div className="profile-container">
      {!showSlots && doctor && (
        <>
          <h2>Doctor Profile</h2>
          <div className="profile-flexbox">
            <div className="image-section">
              {doctorImage ? (
                <img src={doctorImage} alt="Doctor" className="doctor-image" />
              ) : (
                <div className="image-placeholder">No Image Uploaded</div>
              )}
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>

            <div className="details-section">
              <p><strong>Name:</strong> {doctor.fullName}</p>
              <p><strong>Designation:</strong> {doctor.designation}</p>
              <p><strong>Specialty:</strong> {doctor.specialty}</p>
              <p><strong>Experience:</strong> {doctor.experience} years</p>
              <p><strong>Qualification:</strong> {doctor.qualification}</p>
              <p><strong>Status:</strong> {doctor.isAvailable ? "Available" : "Not Available"}</p>

              <button onClick={() => setShowSlots(true)}>
                Manage Time Slots
              </button>
            </div>
          </div>
        </>
      )}

      {showSlots && (
        <>
          <h2>Manage Time Slots</h2>
          <button onClick={handleBackToProfile} style={{ marginBottom: '10px' }}>
            ← Back to Profile
          </button>
          <button onClick={() => setShowAddForm(!showAddForm)} style={{ marginBottom: '10px', marginLeft: '10px' }}>
            {showAddForm ? "Cancel" : "➕ Add Time Slot"}
          </button>
          {showAddForm && (
            <div className="add-slot-form">
              <h4>New Time Slot</h4>
              <label>
                Start Time:
                <input type="datetime-local" name="startTime" value={newSlot.startTime} onChange={handleChange} />
              </label>
              <label>
                End Time:
                <input type="datetime-local" name="endTime" value={newSlot.endTime} onChange={handleChange} />
              </label>
              <label>
                Available:
                <input type="checkbox" name="isAvailable" checked={newSlot.isAvailable} onChange={handleChange} />
              </label>
              <button onClick={handleAddSlot}>Submit</button>
            </div>
          )}

          <div className="slot-table">
            <table>
              <thead>
                <tr>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {timeSlots.map(slot => (
                  <tr key={slot.timeSlotId}>
                    {editSlotId === slot.timeSlotId ? (
                      <>
                        <td>
                          <input
                            type="datetime-local"
                            name="startTime"
                            value={editedSlot.startTime}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="datetime-local"
                            name="endTime"
                            value={editedSlot.endTime}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            name="isAvailable"
                            checked={editedSlot.isAvailable}
                            onChange={handleChange}
                          /> Available
                        </td>
                        <td>
                          <button onClick={handleSave}>Save</button>
                          <button onClick={() => setEditSlotId(null)}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{new Date(slot.startTime).toLocaleString()}</td>
                        <td>{new Date(slot.endTime).toLocaleString()}</td>
                        <td>{slot.isAvailable ? 'Available' : 'Unavailable'}</td>
                        <td>
                          <button onClick={() => handleEditClick(slot)}>Edit</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
                {timeSlots.length === 0 && (
                  <tr><td colSpan="4">No time slots found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

       {/* Logout Button */}
       <div className="logout-section">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default DoctorProfile;