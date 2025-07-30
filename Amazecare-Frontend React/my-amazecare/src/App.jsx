import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import Homepage from './Components/Homepage/Homepage';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginRegister from './Components/LoginRegister/LoginResgister';
import PatientDashboard from './Components/Patient/PatientDashborad';
import Prescription from './Components/Patient/Prescription';
import DailyRoutines from './Components/Patient/DailyRoutines';
import DailyExercises from './Components/Patient/DailyExercises';
import DoctorDashboard from './Components/Doctor/DoctorDashboard';
import ConductConsultation from './Components/Doctor/ConductConsultation';
import AdminDashboard from './Components/Admin/AdminDashboard';
import PrivateRoute from './Components/PrivateRoute'; // Import this






function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/login" element={<LoginRegister/>} />
         {/* Protected Routes */}
         <Route path="/patient/dashboard" element={
          <PrivateRoute><PatientDashboard /></PrivateRoute>
        } />
        <Route path="/doctor/dashboard" element={
          <PrivateRoute><DoctorDashboard /></PrivateRoute>
        } />
        <Route path="/admin/dashboard" element={
          <PrivateRoute><AdminDashboard /></PrivateRoute>
        } />


        <Route path="/prescriptions" element={<Prescription/>} />
        <Route path="/daily-routines" element={<DailyRoutines/>} />
        <Route path="/daily-Exercises" element={<DailyExercises/>} />
        <Route path="/conduct-consultation/:appointmentId" element={<ConductConsultation/>} />  Add this route


      </Routes>
    </BrowserRouter>
  );
}


export default App
