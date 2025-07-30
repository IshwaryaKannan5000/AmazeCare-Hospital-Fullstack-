// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './ConductConsultation.css';

// const ConductConsultation = () => {
//   const { appointmentId } = useParams();
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [medicines, setMedicines] = useState([]);
//   const [patientId, setPatientId] = useState(null);
//   const [doctorId, setDoctorId] = useState(null);
//   const [medicalTests, setMedicalTests] = useState([]);

//   const [formData, setFormData] = useState({
//     medicineId: '',
//     recommendedTests: '',
//     dosageMorning: '',
//     dosageAfternoon: '',
//     dosageEvening: '',
//     beforeOrAfterFood: '',
//   });

//   const [medicalRecordData, setMedicalRecordData] = useState({
//     symptoms: '',
//     diagnosis: '',
//     treatmentPlan: '',
//     prescribedMedications: '',
//     recommendedTestIds: []
//   });

  
//   const handleMedicalRecordChange = (e) => {
//     const { name, value } = e.target;
//     setMedicalRecordData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
  

//   // Replace with actual IDs as needed or fetch them from context/state
 
 

//   useEffect(() => {
//     const fetchMedicines = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:5207/api/Medicine',{
//           headers: {
//             Authorization: `Bearer ${token}` // ✅ Pass token in the header
//           }
//         });
//         setMedicines(response.data);
//       } catch (error) {
//         console.error('Error fetching medicines:', error);
//       }
//     };
//     fetchMedicines();
//   }, []);

//   useEffect(() => {
//     const fetchMedicalTests = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:5207/api/MedicalTest', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setMedicalTests(response.data);
//       } catch (error) {
//         console.error('Error fetching medical tests:', error);
//       }
//     };
  
//     fetchMedicalTests();
//   }, []);
  

//     // Fetch patient ID based on appointmentId
//     useEffect(() => {
//       const fetchPatientId = async () => {
//         try {
//           const token = localStorage.getItem('token');
//           const response = await axios.get(`http://localhost:5207/api/Doctor/appointment/${appointmentId}/patient`,{
//             headers: {
//               Authorization: `Bearer ${token}` // ✅ Add token here
//             }
//           });
//           setPatientId(response.data.patientId);
//         } catch (error) {
//           console.error('Error fetching patient ID:', error);
//         }
//       };
  
//       if (appointmentId) {
//         fetchPatientId();
//       }
//     }, [appointmentId]);

//      // Fetch doctorId using userId from localStorage
//   useEffect(() => {
//     const userId = localStorage.getItem('userId');

//     const fetchDoctorId = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Get the token
//         const res = await axios.get(`http://localhost:5207/api/Doctor/get-doctor-by-user/${userId}`,{
//           headers: {
//             Authorization: `Bearer ${token}` // ✅ Pass token here
//           }
//         });
//         setDoctorId(res.data.doctorId);
//       } catch (error) {
//         console.error('Error fetching doctor data:', error);
//       }
//     };

//     if (userId) fetchDoctorId();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

  // const handleSubmitPrescription = async () => {
  //    // Basic field validations
  // if (!appointmentId || isNaN(appointmentId)) {
  //   alert('Please select a valid appointment.');
  //   return;
  // }

  // if (!doctorId) {
  //   alert('Doctor ID is missing.');
  //   return;
  // }

  // if (!patientId) {
  //   alert('Patient ID is missing.');
  //   return;
  // }

  // const {
  //   medicineId,
  //   dosageMorning,
  //   dosageAfternoon,
  //   dosageEvening,
  //   beforeOrAfterFood,
  //   recommendedTests // no validation for this
  // } = formData;

  // if (!medicineId || isNaN(medicineId)) {
  //   alert('Please select a valid medicine.');
  //   return;
  // }

  // if (dosageMorning === '' || isNaN(dosageMorning)) {
  //   alert('Please enter a valid morning dosage.');
  //   return;
  // }

  // if (dosageAfternoon === '' || isNaN(dosageAfternoon)) {
  //   alert('Please enter a valid afternoon dosage.');
  //   return;
  // }

  // if (dosageEvening === '' || isNaN(dosageEvening)) {
  //   alert('Please enter a valid evening dosage.');
  //   return;
  // }

  // if (beforeOrAfterFood === '' || isNaN(beforeOrAfterFood)) {
  //   alert('Please specify before/after food (e.g., 0 = before, 1 = after).');
  //   return;
  // }
  //   const payload = {
  //     appointmentId: parseInt(appointmentId),
  //     doctorId,
  //     patientId,
  //     details: [
  //       {
  //         medicineId: parseInt(formData.medicineId),
  //         recommendedTests: formData.recommendedTests,
  //         dosageMorning: parseInt(formData.dosageMorning),
  //         dosageAfternoon: parseInt(formData.dosageAfternoon),
  //         dosageEvening: parseInt(formData.dosageEvening),
  //         beforeOrAfterFood: parseInt(formData.beforeOrAfterFood),
  //       },
  //     ],
  //   };
  //   console.log("Submitting prescription payload:", payload); //

  //   try {
  //     const token = localStorage.getItem('token');
  //     await axios.post('http://localhost:5207/api/prescription', payload,{
  //       headers: {
  //         Authorization: `Bearer ${token}` // Pass token here
  //       }
  //     });
  //     alert('Prescription submitted successfully');
  //     handleNext();
  //   } catch (error) {
  //     console.error('Error submitting prescription:', error);
  //     alert('Failed to submit prescription');
  //   }
  // };


//   const handleSubmitMedicalRecord = async () => {
//     if (!appointmentId || isNaN(appointmentId)) {
//       alert('Please select a valid appointment.');
//       return;
//     }
  
//     if (!doctorId) {
//       alert('Doctor ID is missing.');
//       return;
//     }
  
//     if (!patientId) {
//       alert('Patient ID is missing.');
//       return;
//     }
//     const { symptoms, diagnosis, treatmentPlan, prescribedMedications, recommendedTestIds } = medicalRecordData;

//   if (!symptoms || symptoms.trim() === '') {
//     alert('Please enter symptoms.');
//     return;
//   }

//   if (!diagnosis || diagnosis.trim() === '') {
//     alert('Please enter diagnosis.');
//     return;
//   }

//   if (!treatmentPlan || treatmentPlan.trim() === '') {
//     alert('Please enter a treatment plan.');
//     return;
//   }

//   if (!prescribedMedications || prescribedMedications.trim() === '') {
//     alert('Please enter prescribed medications.');
//     return;
//   }
  
//     const payload = {
//       appointmentId: parseInt(appointmentId),
//       doctorId,
//       patientId,
//       symptoms: medicalRecordData.symptoms,
//       diagnosis: medicalRecordData.diagnosis,
//       treatmentPlan: medicalRecordData.treatmentPlan,
//       prescribedMedications: medicalRecordData.prescribedMedications,
//       recommendedTestIds: medicalRecordData.recommendedTestIds.map(id => parseInt(id))
//     };
  
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post('http://localhost:5207/api/MedicalRecord', payload, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       alert('Medical record submitted successfully');
//       handleNext();
//     } catch (error) {
//       console.error('Error submitting medical record:', error);
//       alert('Failed to submit medical record');
//     }
//   };
  

//   const handleNext = () => {
//     if (step < 3) setStep(step + 1);
//   };

//   const handlePrevious = () => {
//     if (step > 1) setStep(step - 1);
//   };

//   const handleComplete = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(
//         `http://localhost:5207/api/Doctor/appointment/${appointmentId}/status`,
//         `"Payment Pending"`, // Send as plain string
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );
//       alert('Consultation marked as completed!');
//       navigate('/doctor/dashboard');
//     } catch (error) {
//       console.error('Error completing consultation:', error);
//       alert('Failed to complete consultation');
//     }
//   };
  

//   return (
//     <div className="consultation-steps-container">
//        <h2 className="consultation-title">Consultation Form</h2> {/* Consultation Form Title */}

//       <div className="step-indicator">
//         {[1, 2, 3].map((s) => (
//           <div key={s} className={`step ${step === s ? 'active' : ''}`}>Step {s}</div>
//         ))}
//       </div>

//       <div className="step-form">
//         {step === 1 && (
//           <div className="form-section">
//             <h3>Step 1: Prescription Form</h3>
//             <label>Medicine Name:</label>
//             <select name="medicineId" value={formData.medicineId} onChange={handleChange} required>
//               <option value="">Select Medicine</option>
//               {medicines.map((med) => (
//                 <option key={med.medicineId} value={med.medicineId}>
//                   {med.medicineName}
//                 </option>
//               ))}
//             </select>

//             <label>Recommended Tests:</label>
//             <input
//               type="text"
//               name="recommendedTests"
//               value={formData.recommendedTests}
//               onChange={handleChange}
//             />

//             <label>Dosage Morning:</label>
//             <select name="dosageMorning" value={formData.dosageMorning} onChange={handleChange}>
//               <option value="">Select</option>
//               <option value="1">1</option>
//               <option value="0">0</option>
//             </select>

//             <label>Dosage Afternoon:</label>
//             <select name="dosageAfternoon" value={formData.dosageAfternoon} onChange={handleChange}>
//               <option value="">Select</option>
//               <option value="1">1</option>
//               <option value="0">0</option>
//             </select>

//             <label>Dosage Evening:</label>
//             <select name="dosageEvening" value={formData.dosageEvening} onChange={handleChange}>
//               <option value="">Select</option>
//               <option value="1">1</option>
//               <option value="0">0</option>
//             </select>

//             <label>Before or After Food:</label>
//             <select name="beforeOrAfterFood" value={formData.beforeOrAfterFood} onChange={handleChange}>
//               <option value="">Select</option>
//               <option value="1">Before Food</option>
//               <option value="0">After Food</option>
//             </select>

//             <div className="button-group">
//               <button onClick={handleSubmitPrescription}>Submit & Next</button>
//             </div>
//           </div>
//         )}

// {step === 2 && (
//   <div className="form-section">
//     <h3>Step 2: Medical Record Form</h3>

//     <label>Symptoms:</label>
//     <input
//       type="text"
//       name="symptoms"
//       value={medicalRecordData.symptoms}
//       onChange={handleMedicalRecordChange}
//     />

//     <label>Diagnosis:</label>
//     <input
//       type="text"
//       name="diagnosis"
//       value={medicalRecordData.diagnosis}
//       onChange={handleMedicalRecordChange}
//     />

//     <label>Treatment Plan:</label>
//     <input
//       type="text"
//       name="treatmentPlan"
//       value={medicalRecordData.treatmentPlan}
//       onChange={handleMedicalRecordChange}
//     />

//     <label>Prescribed Medications:</label>
//     <input
//       type="text"
//       name="prescribedMedications"
//       value={medicalRecordData.prescribedMedications}
//       onChange={handleMedicalRecordChange}
//     />
//     <label>Recommended Tests:</label>
//             <select multiple name="recommendedTestIds" value={medicalRecordData.recommendedTestIds} onChange={(e) => {
//               const selected = Array.from(e.target.selectedOptions, opt => opt.value);
//               setMedicalRecordData((prev) => ({ ...prev, recommendedTestIds: selected }));
//             }}>
//               {medicalTests.map((test) => (
//                 <option key={test.medicalTestId} value={test.medicalTestId}>{test.testName}</option>
//               ))}
//             </select>




//     <div className="button-group">
//       <button onClick={handlePrevious}>Previous</button>
//       <button onClick={handleSubmitMedicalRecord}>Submit & Next</button>
//     </div>
//   </div>
// )}


       

//         {step === 3 && (
//           <div className="form-section">
//             <h3>Step 4: Complete Consultation</h3>
//             <p>Are you sure you want to complete the consultation?</p>
//             <div className="button-group">
//               <button onClick={handlePrevious}>Wait</button>
//               <button className="complete-btn" onClick={handleComplete}>Complete Consultation</button>
//             </div>
//           </div>
//         )}
//       </div>
//        {/* Back Button Below the Form */}
//        <div className="back-button-container">
//         <button className="consul-back" onClick={() => navigate('/doctor/dashboard')}>Back to Dashboard</button>
//       </div>
//     </div>
//   );
// };

// export default ConductConsultation;



// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './ConductConsultation.css';

// const ConductConsultation = () => {
//   const { appointmentId } = useParams();
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [medicines, setMedicines] = useState([]);
//   const [medicalTests, setMedicalTests] = useState([]);
//   const [prescriptionId, setPrescriptionId] = useState(null);
//   const [patientId, setPatientId] = useState(null);
//   const [doctorId, setDoctorId] = useState(null);
//   const [prescriptionDetails, setPrescriptionDetails] = useState([]);


//   const [formData, setFormData] = useState({
//     medicineId: '',
//     recommendedTests: '',
//     dosageMorning: '',
//     dosageAfternoon: '',
//     dosageEvening: '',
//     beforeOrAfterFood: '',
//   });

//   const [medicalRecordData, setMedicalRecordData] = useState({
//     symptoms: '',
//     diagnosis: '',
//     treatmentPlan: '',
//     prescribedMedications: '',
//     recommendedTestIds: []
//   });

//   // Initial data fetches
//   useEffect(() => {
//     const fetchMedicines = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:5207/api/Medicine', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setMedicines(response.data);
//         console.log('Fetched medicines:', response.data);
//       } catch (error) {
//         console.error('Error fetching medicines:', error);
//       }
//     };
//     fetchMedicines();
//   }, []);

//   useEffect(() => {
//     const fetchMedicalTests = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:5207/api/MedicalTest', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setMedicalTests(response.data);
//         console.log('Fetched medical tests:', response.data);
//       } catch (error) {
//         console.error('Error fetching medical tests:', error);
//       }
//     };
//     fetchMedicalTests();
//   }, []);

//   useEffect(() => {
//     const fetchPatientId = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(
//           `http://localhost:5207/api/Doctor/appointment/${appointmentId}/patient`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setPatientId(response.data.patientId);
//         console.log('Fetched patientId:', response.data.patientId);
//       } catch (error) {
//         console.error('Error fetching patient ID:', error);
//       }
//     };
//     if (appointmentId) fetchPatientId();
//   }, [appointmentId]);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const fetchDoctorId = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get(`http://localhost:5207/api/Doctor/get-doctor-by-user/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setDoctorId(res.data.doctorId);
//         console.log('Fetched doctorId:', res.data.doctorId);
//       } catch (error) {
//         console.error('Error fetching doctor ID:', error);
//       }
//     };
//     if (userId) fetchDoctorId();
//   }, []);

//   // Form handlers
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleMedicalRecordChange = (e) => {
//     const { name, value } = e.target;
//     setMedicalRecordData((prev) => ({ ...prev, [name]: value }));
//   };

//  const handleSubmitPrescription = async () => {
//      // Basic field validations
//   if (!appointmentId || isNaN(appointmentId)) {
//     alert('Please select a valid appointment.');
//     return;
//   }

//   if (!doctorId) {
//     alert('Doctor ID is missing.');
//     return;
//   }

//   if (!patientId) {
//     alert('Patient ID is missing.');
//     return;
//   }

//   const {
//     medicineId,
//     dosageMorning,
//     dosageAfternoon,
//     dosageEvening,
//     beforeOrAfterFood,
//     recommendedTests // no validation for this
//   } = formData;

//   if (!medicineId || isNaN(medicineId)) {
//     alert('Please select a valid medicine.');
//     return;
//   }

//   if (dosageMorning === '' || isNaN(dosageMorning)) {
//     alert('Please enter a valid morning dosage.');
//     return;
//   }

//   if (dosageAfternoon === '' || isNaN(dosageAfternoon)) {
//     alert('Please enter a valid afternoon dosage.');
//     return;
//   }

//   if (dosageEvening === '' || isNaN(dosageEvening)) {
//     alert('Please enter a valid evening dosage.');
//     return;
//   }

//   if (beforeOrAfterFood === '' || isNaN(beforeOrAfterFood)) {
//     alert('Please specify before/after food (e.g., 0 = before, 1 = after).');
//     return;
//   }
//     const payload = {
//       appointmentId: parseInt(appointmentId),
//       doctorId,
//       patientId,
//       details: [
//         {
//           medicineId: parseInt(formData.medicineId),
//           recommendedTests: formData.recommendedTests,
//           dosageMorning: parseInt(formData.dosageMorning),
//           dosageAfternoon: parseInt(formData.dosageAfternoon),
//           dosageEvening: parseInt(formData.dosageEvening),
//           beforeOrAfterFood: parseInt(formData.beforeOrAfterFood),
//         },
//       ],
//     };
//     console.log("Submitting prescription payload:", payload); //

//     try {
//       const token = localStorage.getItem('token');
//      const response =  await axios.post('http://localhost:5207/api/prescription', payload,{
//         headers: {
//           Authorization: `Bearer ${token}` // Pass token here
//         }
//       });
     
// // Log the full response
// console.log("Prescription API response:", response.data);

// // Extract and log the prescriptionId
// const newPrescriptionId = response.data.prescriptionId;
// console.log("Extracted prescriptionId:", newPrescriptionId);

// if (newPrescriptionId && newPrescriptionId !== 0) {
//   setPrescriptionId(newPrescriptionId);
// } else {
//   console.warn('Prescription ID not returned or is 0');
// }
//       alert('Prescription submitted successfully');
//       //handleNext();
//     } catch (error) {
//       console.error('Error submitting prescription:', error);
//       alert('Failed to submit prescription');
//     }
//   };

//   // const handleAddPrescriptionDetail = async () => {
//   //   console.log('Preparing to add additional prescription detail...');
//   //   if (!prescriptionId) {
//   //     alert('Please submit the initial prescription first.');
//   //     return;
//   //   }

//   //   const detailPayload = {
//   //     medicineId: parseInt(formData.medicineId),
//   //     recommendedTests: formData.recommendedTests,
//   //     dosageMorning: parseInt(formData.dosageMorning),
//   //     dosageAfternoon: parseInt(formData.dosageAfternoon),
//   //     dosageEvening: parseInt(formData.dosageEvening),
//   //     beforeOrAfterFood: parseInt(formData.beforeOrAfterFood),
//   //   };

//   //   try {
//   //     const token = localStorage.getItem('token');
//   //     await axios.post(
//   //       `http://localhost:5207/api/prescription/${prescriptionId}/details`,
//   //       detailPayload,
//   //       { headers: { Authorization: `Bearer ${token}` } }
//   //     );
//   //     console.log('Additional prescription detail added:', detailPayload);
//   //     alert('Additional medicine added to prescription');
//   //     handleNext();
//   //   } catch (error) {
//   //     console.error('Error adding prescription detail:', error);
//   //     alert('Failed to add additional prescription detail');
//   //   }
//   // };
//  const handleAddPrescriptionDetail = async () => {
//   console.log('🔄 Preparing to add additional prescription detail...');

//   if (!prescriptionId) {
//     alert('⚠️ Please submit the initial prescription first.');
//     return;
//   }

//   const detailPayload = {
//     medicineId: parseInt(formData.medicineId),
//     recommendedTests: formData.recommendedTests,
//     dosageMorning: parseInt(formData.dosageMorning),
//     dosageAfternoon: parseInt(formData.dosageAfternoon),
//     dosageEvening: parseInt(formData.dosageEvening),
//     beforeOrAfterFood: parseInt(formData.beforeOrAfterFood), // ✅ Correct key and expected type
//   };

//   console.log('📝 Constructed detail payload:', detailPayload);
//   console.log('📦 Targeting prescription ID:', prescriptionId);

//   try {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       console.error('⛔ No auth token found');
//       alert('Authentication token missing. Please login again.');
//       return;
//     }

//     console.log('🔐 Using token:', token.substring(0, 10) + '...');

//     const response = await axios.post(
//       `http://localhost:5207/api/prescription/${prescriptionId}/details`,
//       detailPayload,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//       }
//     );

//     console.log('✅ Server response:', response.data);
//     alert('✅ Additional medicine added to prescription');
//    // handleNext();

//   } catch (error) {
//     // console.error('❌ Error adding prescription detail:', error);
//     // if (error.response) {
//     //   console.error('📡 Server responded with:', error.response.status);
//     //   console.error('📩 Response body:', error.response.data);
//     // } else if (error.request) {
//     //   console.error('📭 No response received. Request was:', error.request);
//     // } else {
//     //   console.error('🚨 Error setting up the request:', error.message);
//     // }

//    // alert('🚫 Failed to add additional prescription detail');
//   }
// };


//   const handleSubmitMedicalRecord = async () => {
//     console.log('Preparing to submit medical record...');
//     if (!appointmentId || !doctorId || !patientId) {
//       alert('Missing required IDs.');
//       return;
//     }

//     const payload = {
//       appointmentId: parseInt(appointmentId),
//       doctorId,
//       patientId,
//       symptoms: medicalRecordData.symptoms,
//       diagnosis: medicalRecordData.diagnosis,
//       treatmentPlan: medicalRecordData.treatmentPlan,
//       prescribedMedications: medicalRecordData.prescribedMedications,
//       recommendedTestIds: medicalRecordData.recommendedTestIds.map(id => parseInt(id))
//     };

//     try {
//       const token = localStorage.getItem('token');
//       await axios.post('http://localhost:5207/api/MedicalRecord', payload, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       console.log('Medical record submitted:', payload);
//       alert('Medical record submitted successfully');
//       handleNext();
//     } catch (error) {
//       console.error('Error submitting medical record:', error);
//       alert('Failed to submit medical record');
//     }
//   };

//   const handleNext = () => {
//     if (step < 3) setStep(step + 1);
//   };

//   const handlePrevious = () => {
//     if (step > 1) setStep(step - 1);
//   };

//   const handleComplete = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(
//         `http://localhost:5207/api/Doctor/appointment/${appointmentId}/status`,
//         `"Payment Pending"`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );
//       alert('Consultation marked as completed!');
//       navigate('/doctor/dashboard');
//     } catch (error) {
//       console.error('Error completing consultation:', error);
//       alert('Failed to complete consultation');
//     }
//   };

  
//   return (
//     <div className="consultation-steps-container">
//        <h2 className="consultation-title">Consultation Form</h2> {/* Consultation Form Title */}

//       <div className="step-indicator">
//         {[1, 2, 3].map((s) => (
//           <div key={s} className={`step ${step === s ? 'active' : ''}`}>Step {s}</div>
//         ))}
//       </div>

//       <div className="step-form">
//         {step === 1 && (
//       <div className="form-section">
//         <h3>Step 1: Prescription Form</h3>

//         <label>Medicine Name:</label>
//         <select name="medicineId" value={formData.medicineId} onChange={handleChange} required>
//           <option value="">Select Medicine</option>
//           {medicines.map((med) => (
//             <option key={med.medicineId} value={med.medicineId}>
//               {med.medicineName}
//             </option>
//           ))}
//         </select>

//         <label>Recommended Tests:</label>
//         <input
//           type="text"
//           name="recommendedTests"
//           value={formData.recommendedTests}
//           onChange={handleChange}
//         />

//         <label>Dosage Morning:</label>
//         <select name="dosageMorning" value={formData.dosageMorning} onChange={handleChange}>
//           <option value="">Select</option>
//           <option value="1">1</option>
//           <option value="0">0</option>
//         </select>

//         <label>Dosage Afternoon:</label>
//         <select name="dosageAfternoon" value={formData.dosageAfternoon} onChange={handleChange}>
//           <option value="">Select</option>
//           <option value="1">1</option>
//           <option value="0">0</option>
//         </select>

//         <label>Dosage Evening:</label>
//         <select name="dosageEvening" value={formData.dosageEvening} onChange={handleChange}>
//           <option value="">Select</option>
//           <option value="1">1</option>
//           <option value="0">0</option>
//         </select>

//         <label>Before or After Food:</label>
//         <select name="beforeOrAfterFood" value={formData.beforeOrAfterFood} onChange={handleChange}>
//           <option value="">Select</option>
//           <option value="1">Before Food</option>
//           <option value="2">After Food</option>
//         </select>

//         <div className="button-group">
//   <button type="button" onClick={handleSubmitPrescription}>Create Prescription</button>
//   <button type="button" onClick={handleAddPrescriptionDetail}>+ Add Medicine</button>
//   {/* <button type="button" onClick={handleSubmitPrescription}>Create Prescription</button> */}
//   <button type="button" onClick={handleNext}> Submit and Next</button> 
// </div>


//         {prescriptionDetails.length > 0 && (
//           <div className="prescription-preview">
//             <h4>Added Prescriptions:</h4>
//             <ul>
//               {prescriptionDetails.map((pres, index) => {
//                 const med = medicines.find(m => m.medicineId === parseInt(pres.medicineId));
//                 return (
//                   <li key={index}>
//                     {med?.medicineName || 'Unknown Medicine'} - Morning: {pres.dosageMorning}, Afternoon: {pres.dosageAfternoon}, Evening: {pres.dosageEvening}, {pres.beforeOrAfterFood === "1" ? 'Before Food' : 'After Food'}
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         )}
//       </div>
//     )}

// {step === 2 && (
//   <div className="form-section">
//     <h3>Step 2: Medical Record Form</h3>

//     <label>Symptoms:</label>
//     <input
//       type="text"
//       name="symptoms"
//       value={medicalRecordData.symptoms}
//       onChange={handleMedicalRecordChange}
//     />

//     <label>Diagnosis:</label>
//     <input
//       type="text"
//       name="diagnosis"
//       value={medicalRecordData.diagnosis}
//       onChange={handleMedicalRecordChange}
//     />

//     <label>Treatment Plan:</label>
//     <input
//       type="text"
//       name="treatmentPlan"
//       value={medicalRecordData.treatmentPlan}
//       onChange={handleMedicalRecordChange}
//     />

//     <label>Prescribed Medications:</label>
//     <input
//       type="text"
//       name="prescribedMedications"
//       value={medicalRecordData.prescribedMedications}
//       onChange={handleMedicalRecordChange}
//     />
//     <label>Recommended Tests:</label>
//             <select multiple name="recommendedTestIds" value={medicalRecordData.recommendedTestIds} onChange={(e) => {
//               const selected = Array.from(e.target.selectedOptions, opt => opt.value);
//               setMedicalRecordData((prev) => ({ ...prev, recommendedTestIds: selected }));
//             }}>
//               {medicalTests.map((test) => (
//                 <option key={test.medicalTestId} value={test.medicalTestId}>{test.testName}</option>
//               ))}
//             </select>




//     <div className="button-group">
//       <button onClick={handlePrevious}>Previous</button>
//       <button onClick={handleSubmitMedicalRecord}>Submit & Next</button>
//     </div>
//   </div>
// )}


       

//         {step === 3 && (
//           <div className="form-section">
//             <h3>Step 4: Complete Consultation</h3>
//             <p>Are you sure you want to complete the consultation?</p>
//             <div className="button-group">
//               <button onClick={handlePrevious}>Wait</button>
//               <button className="complete-btn" onClick={handleComplete}>Complete Consultation</button>
//             </div>
//           </div>
//         )}
//       </div>
//        {/* Back Button Below the Form */}
//        <div className="back-button-container">
//         <button className="consul-back" onClick={() => navigate('/doctor/dashboard')}>Back to Dashboard</button>
//       </div>
//     </div>
//   );

// };

// export default ConductConsultation;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ConductConsultation.css';

const ConductConsultation = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [medicines, setMedicines] = useState([]);
  const [patientId, setPatientId] = useState(null);
  const [doctorId, setDoctorId] = useState(null);
  const [medicalTests, setMedicalTests] = useState([]);

  const [prescriptionId, setPrescriptionId] = useState(null);


  const [formData, setFormData] = useState({
    medicineId: '',
    recommendedTests: '',
    dosageMorning: '',
    dosageAfternoon: '',
    dosageEvening: '',
    beforeOrAfterFood: '',
  });

  const [showAdditionalForm, setShowAdditionalForm] = useState(false);

const [additionalPrescription, setAdditionalPrescription] = useState({
  medicineId: '',
  recommendedTests: '',
  dosageMorning: '',
  dosageAfternoon: '',
  dosageEvening: '',
  beforeOrAfterFood: '',
});
const handleAdditionalChange = (e) => {
  const { name, value } = e.target;
  setAdditionalPrescription(prev => ({ ...prev, [name]: value }));
};

  

  const [medicalRecordData, setMedicalRecordData] = useState({
    symptoms: '',
    diagnosis: '',
    treatmentPlan: '',
    prescribedMedications: '',
    recommendedTestIds: []
  });

  
  const handleMedicalRecordChange = (e) => {
    const { name, value } = e.target;
    setMedicalRecordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  // Replace with actual IDs as needed or fetch them from context/state
 
 

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5207/api/Medicine',{
          headers: {
            Authorization: `Bearer ${token}` // ✅ Pass token in the header
          }
        });
        setMedicines(response.data);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    };
    fetchMedicines();
  }, []);

  useEffect(() => {
    const fetchMedicalTests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5207/api/MedicalTest', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMedicalTests(response.data);
      } catch (error) {
        console.error('Error fetching medical tests:', error);
      }
    };
  
    fetchMedicalTests();
  }, []);
  

    // Fetch patient ID based on appointmentId
    useEffect(() => {
      const fetchPatientId = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:5207/api/Doctor/appointment/${appointmentId}/patient`,{
            headers: {
              Authorization: `Bearer ${token}` // ✅ Add token here
            }
          });
          setPatientId(response.data.patientId);
        } catch (error) {
          console.error('Error fetching patient ID:', error);
        }
      };
  
      if (appointmentId) {
        fetchPatientId();
      }
    }, [appointmentId]);

     // Fetch doctorId using userId from localStorage
  useEffect(() => {
    const userId = localStorage.getItem('userId');

    const fetchDoctorId = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token
        const res = await axios.get(`http://localhost:5207/api/Doctor/get-doctor-by-user/${userId}`,{
          headers: {
            Authorization: `Bearer ${token}` // ✅ Pass token here
          }
        });
        setDoctorId(res.data.doctorId);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    if (userId) fetchDoctorId();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };




  const handleSubmitPrescription = async () => {
     // Basic field validations
  if (!appointmentId || isNaN(appointmentId)) {
    alert('Please select a valid appointment.');
    return;
  }

  if (!doctorId) {
    alert('Doctor ID is missing.');
    return;
  }

  if (!patientId) {
    alert('Patient ID is missing.');
    return;
  }

  const {
    medicineId,
    dosageMorning,
    dosageAfternoon,
    dosageEvening,
    beforeOrAfterFood,
    recommendedTests // no validation for this
  } = formData;

  if (!medicineId || isNaN(medicineId)) {
    alert('Please select a valid medicine.');
    return;
  }

  if (dosageMorning === '' || isNaN(dosageMorning)) {
    alert('Please enter a valid morning dosage.');
    return;
  }

  if (dosageAfternoon === '' || isNaN(dosageAfternoon)) {
    alert('Please enter a valid afternoon dosage.');
    return;
  }

  if (dosageEvening === '' || isNaN(dosageEvening)) {
    alert('Please enter a valid evening dosage.');
    return;
  }

  if (beforeOrAfterFood === '' || isNaN(beforeOrAfterFood)) {
    alert('Please specify before/after food (e.g., 0 = before, 1 = after).');
    return;
  }
    const payload = {
      appointmentId: parseInt(appointmentId),
      doctorId,
      patientId,
      details: [
        {
          medicineId: parseInt(formData.medicineId),
          recommendedTests: formData.recommendedTests,
          dosageMorning: parseInt(formData.dosageMorning),
          dosageAfternoon: parseInt(formData.dosageAfternoon),
          dosageEvening: parseInt(formData.dosageEvening),
          beforeOrAfterFood: parseInt(formData.beforeOrAfterFood),
        },
      ],
    };
    console.log("Submitting prescription payload:", payload); //

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5207/api/prescription', payload, {
      headers: {
        Authorization: `Bearer ${token}` // Pass token here
      }
    });
       console.log("API Response:", response);
        const prescriptionId = response.data.prescriptionId;  // Store the prescriptionId here
    setPrescriptionId(prescriptionId);





     
      alert('Prescription submitted successfully');
   
      
    } catch (error) {
      console.error('Error submitting prescription:', error);
      alert('Failed to submit prescription');
    }
  };

const handleAddAdditionalPrescription = async () => {
  const token = localStorage.getItem('token');

  // Ensure prescriptionId is valid
  if (!prescriptionId) {
    alert('Prescription ID is missing.');
    return;
  }


  try {
    await axios.post(`http://localhost:5207/api/prescription/${prescriptionId}/details`, {
      medicineId: parseInt(additionalPrescription.medicineId),
      recommendedTests: additionalPrescription.recommendedTests,
      dosageMorning: parseInt(additionalPrescription.dosageMorning),
      dosageAfternoon: parseInt(additionalPrescription.dosageAfternoon),
      dosageEvening: parseInt(additionalPrescription.dosageEvening),
      beforeOrAfterFood: parseInt(additionalPrescription.beforeOrAfterFood)
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    alert('Prescription Added!');
    setShowAdditionalForm(false); // Hide form after success
    setAdditionalPrescription({
      medicineId: '',
      recommendedTests: '',
      dosageMorning: '',
      dosageAfternoon: '',
      dosageEvening: '',
      beforeOrAfterFood: '',
    });
  }  catch (error) {
    console.error('Error adding additional prescription:', error.response ? error.response.data : error.message);
    alert('Failed to add additional prescription');
  }
};


  


  const handleSubmitMedicalRecord = async () => {
    if (!appointmentId || isNaN(appointmentId)) {
      alert('Please select a valid appointment.');
      return;
    }
  
    if (!doctorId) {
      alert('Doctor ID is missing.');
      return;
    }
  
    if (!patientId) {
      alert('Patient ID is missing.');
      return;
    }
    const { symptoms, diagnosis, treatmentPlan, prescribedMedications, recommendedTestIds } = medicalRecordData;

  if (!symptoms || symptoms.trim() === '') {
    alert('Please enter symptoms.');
    return;
  }

  if (!diagnosis || diagnosis.trim() === '') {
    alert('Please enter diagnosis.');
    return;
  }

  if (!treatmentPlan || treatmentPlan.trim() === '') {
    alert('Please enter a treatment plan.');
    return;
  }

  if (!prescribedMedications || prescribedMedications.trim() === '') {
    alert('Please enter prescribed medications.');
    return;
  }
  
    const payload = {
      appointmentId: parseInt(appointmentId),
      doctorId,
      patientId,
      symptoms: medicalRecordData.symptoms,
      diagnosis: medicalRecordData.diagnosis,
      treatmentPlan: medicalRecordData.treatmentPlan,
      prescribedMedications: medicalRecordData.prescribedMedications,
      recommendedTestIds: medicalRecordData.recommendedTestIds.map(id => parseInt(id))
    };
  
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5207/api/MedicalRecord', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Medical record submitted successfully');
      handleNext();
    } catch (error) {
      console.error('Error submitting medical record:', error);
      alert('Failed to submit medical record');
    }
  };
  

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5207/api/Doctor/appointment/${appointmentId}/status`,
        `"Payment Pending"`, // Send as plain string
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      alert('Consultation marked as completed!');
      navigate('/doctor/dashboard');
    } catch (error) {
      console.error('Error completing consultation:', error);
      alert('Failed to complete consultation');
    }
  };
  

  return (
    <div className="consultation-steps-container">
       <h2 className="consultation-title">Consultation Form</h2> {/* Consultation Form Title */}

      <div className="step-indicator">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`step ${step === s ? 'active' : ''}`}>Step {s}</div>
        ))}
      </div>

      <div className="step-form">
        {step === 1 && (
          <div className="form-section">
            <h3>Step 1: Prescription Form</h3>
            <label>Medicine Name:</label>
            <select name="medicineId" value={formData.medicineId} onChange={handleChange} required>
              <option value="">Select Medicine</option>
              {medicines.map((med) => (
                <option key={med.medicineId} value={med.medicineId}>
                  {med.medicineName}
                </option>
              ))}
            </select>

            <label>Recommended Tests:</label>
            <input
              type="text"
              name="recommendedTests"
              value={formData.recommendedTests}
              onChange={handleChange}
            />

            <label>Dosage Morning:</label>
            <select name="dosageMorning" value={formData.dosageMorning} onChange={handleChange}>
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="0">0</option>
            </select>

            <label>Dosage Afternoon:</label>
            <select name="dosageAfternoon" value={formData.dosageAfternoon} onChange={handleChange}>
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="0">0</option>
            </select>

            <label>Dosage Evening:</label>
            <select name="dosageEvening" value={formData.dosageEvening} onChange={handleChange}>
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="0">0</option>
            </select>

            <label>Before or After Food:</label>
            <select name="beforeOrAfterFood" value={formData.beforeOrAfterFood} onChange={handleChange}>
              <option value="">Select</option>
              <option value="1">Before Food</option>
              <option value="0">After Food</option>
            </select>

            <button onClick={handleSubmitPrescription}>Submit Prescription</button>
            <h1></h1>
          

            <button onClick={() => setShowAdditionalForm(true)}>Add Prescription</button>

{showAdditionalForm && (
  <div className="additional-prescription-form">
    <h1></h1>
    <h4>Add Additional Prescription</h4>
    
    <label>Medicine:</label>
    <select name="medicineId" value={additionalPrescription.medicineId} onChange={handleAdditionalChange}>
      <option value="">Select</option>
      {medicines.map((med) => (
        <option key={med.medicineId} value={med.medicineId}>{med.medicineName}</option>
      ))}
    </select>

    <label>Recommended Tests:</label>
    <input type="text" name="recommendedTests" value={additionalPrescription.recommendedTests} onChange={handleAdditionalChange} />

    <label>Dosage Morning:</label>
    <input type="number" name="dosageMorning" value={additionalPrescription.dosageMorning} onChange={handleAdditionalChange} />

    <label>Dosage Afternoon:</label>
    <input type="number" name="dosageAfternoon" value={additionalPrescription.dosageAfternoon} onChange={handleAdditionalChange} />

    <label>Dosage Evening:</label>
    <input type="number" name="dosageEvening" value={additionalPrescription.dosageEvening} onChange={handleAdditionalChange} />

    <label>Before or After Food (0/1):</label>
    <input type="number" name="beforeOrAfterFood" value={additionalPrescription.beforeOrAfterFood} onChange={handleAdditionalChange} />

    <button onClick={handleAddAdditionalPrescription}>Save </button>
    <button onClick={() => setShowAdditionalForm(false)}>Cancel</button>
  </div>
)}
<h1></h1>

  <button onClick={handleNext}>Next</button>
            
          </div>
        )}

{step === 2 && (
  <div className="form-section">
    <h3>Step 2: Medical Record Form</h3>

    <label>Symptoms:</label>
    <input
      type="text"
      name="symptoms"
      value={medicalRecordData.symptoms}
      onChange={handleMedicalRecordChange}
    />

    <label>Diagnosis:</label>
    <input
      type="text"
      name="diagnosis"
      value={medicalRecordData.diagnosis}
      onChange={handleMedicalRecordChange}
    />

    <label>Treatment Plan:</label>
    <input
      type="text"
      name="treatmentPlan"
      value={medicalRecordData.treatmentPlan}
      onChange={handleMedicalRecordChange}
    />

    <label>Prescribed Medications:</label>
    <input
      type="text"
      name="prescribedMedications"
      value={medicalRecordData.prescribedMedications}
      onChange={handleMedicalRecordChange}
    />
    <label>Recommended Tests:</label>
            <select multiple name="recommendedTestIds" value={medicalRecordData.recommendedTestIds} onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions, opt => opt.value);
              setMedicalRecordData((prev) => ({ ...prev, recommendedTestIds: selected }));
            }}>
              {medicalTests.map((test) => (
                <option key={test.medicalTestId} value={test.medicalTestId}>{test.testName}</option>
              ))}
            </select>




    <div className="button-group">
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleSubmitMedicalRecord}>Submit & Next</button>
    </div>
  </div>
)}


       

        {step === 3 && (
          <div className="form-section">
            <h3>Step 4: Complete Consultation</h3>
            <p>Are you sure you want to complete the consultation?</p>
            <div className="button-group">
              <button onClick={handlePrevious}>Wait</button>
              <button className="complete-btn" onClick={handleComplete}>Complete Consultation</button>
            </div>
          </div>
        )}
      </div>
       {/* Back Button Below the Form */}
       <div className="back-button-container">
        <button className="consul-back" onClick={() => navigate('/doctor/dashboard')}>Back to Dashboard</button>
      </div>
    </div>
  );
};

export default ConductConsultation;
