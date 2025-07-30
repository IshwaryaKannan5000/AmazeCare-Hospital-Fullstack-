import React, { useState } from "react";
import "./LoginRegister.css";
import { userLoginAPICall } from "../../Services/AuthenticationService";
import { LoginModel } from "../../Models/Login";
import { RegisterModel } from "../../Models/Register"; // Import RegisterModel
import { userRegisterAPICall } from "../../Services/UserRegister";
import { useNavigate } from "react-router-dom";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(new LoginModel());
  const [newUser, setNewUser] = useState(new RegisterModel());
  const [confirmPassword, setConfirmPassword] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); 
  const navigate = useNavigate();

  // Handle login input change
  const changeUser = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  // Handle register input change
  const changeNewUser = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Handle gender change
  const changeGender = (event) => {
    setNewUser({ ...newUser, gender: event.target.value });
  };

  // Handle login submission
  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await userLoginAPICall(user);
      console.log("Response data:", response.data);
      if (response.status === 200) {
        alert("Login Success");
        const loggedInUser = response.data;
        sessionStorage.setItem("user", JSON.stringify(loggedInUser));
        
        // Store userId and token in localStorage
      const { userId, token } = loggedInUser;
      localStorage.setItem("userId", loggedInUser.userId);
      localStorage.setItem("token", loggedInUser.token);


     

        const role = loggedInUser.role?.toLowerCase();

        if (role === "patient")  navigate("/patient/dashboard");

        else if (role === "doctor") navigate("/doctor/dashboard");
        else if (role === "admin") navigate("/admin/dashboard");
        else alert("Unknown role. Cannot navigate.");
      } else {
        alert("Incorrect email or password");
      }
    }catch (error) {
      if (error.response && error.response.status === 401) {
        alert("User not found");
      } else {
        alert("Login failed. Please try again.");
      }
    }
  };

  // Handle register submission
  const register = (event) => {
    event.preventDefault();

    // Validation
    if (
      !newUser.fullName ||
      !newUser.email ||
      !newUser.password ||
      !newUser.contactNo ||
      !newUser.gender ||
      !newUser.dateOfBirth
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (newUser.password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    userRegisterAPICall(newUser)
    .then((response) => {
      // console.log("Registration Success:", response.data);
      alert("Registration successful!");
      setIsLogin(true); // Switch to login after success
    })
    .catch((error) => {
      console.error("Registration Error:", error);
      alert("Registration failed. Please try again.");
    });
  };

  return (
    <div>
       <header className="navbar">
       <div className="logo">
  <img src="/src/assets/logoamaze.jpeg" alt="AmazeCare Logo" />
  <h1>AMAZECARE</h1>
</div>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <ul>
            <li><a href="/">Home</a></li>
          </ul>
        </nav>
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </header>

      <div className="container">
        <div className="left-panel">
          <h1>Welcome</h1>
          <p>Your trusted healthcare partner.</p>
        </div>

        <div className="right-panel">
          <h2 id="form-title">{isLogin ? "Login" : "Register"}</h2>

          {isLogin ? (
            <form onSubmit={login}>
              <div className="input-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={user.email}
                  onChange={changeUser}
                />
              </div>
              <div className="input-group">
                <label>Password *</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={user.password}
                  onChange={changeUser}
                />
              </div>
              
              <p><a href="#" onClick={() => setIsLogin(false)}>Don't have an account? Register</a></p>
              <button type="submit" className="register-btn">Login</button>
            </form>
          ) : (
            <form onSubmit={register}>
              <div className="input-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter Full Name"
                  value={newUser.fullName}
                  onChange={changeNewUser}
                />
              </div>
              <div className="input-group">
                <label>Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={newUser.dateOfBirth}
                  onChange={changeNewUser}
                />
              </div>
              <div className="input-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={newUser.email}
                  onChange={changeNewUser}
                />
              </div>
              <div className="input-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  name="contactNo"
                  placeholder="Enter Phone Number"
                  value={newUser.contactNo}
                  onChange={changeNewUser}
                />
              </div>
              <div className="input-group">
                <label>Password *</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={newUser.password}
                  onChange={changeNewUser}
                />
              </div>
              <div className="input-group">
                <label>Confirm Password *</label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="gender">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={newUser.gender === "Male"}
                  onChange={changeGender}
                />{" "}
                <label>Male</label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={newUser.gender === "Female"}
                  onChange={changeGender}
                />{" "}
                <label>Female</label>
              </div>
              <p><a href="#" onClick={() => setIsLogin(true)}>Already have an account? Login</a></p>
              <button type="submit" className="register-btn">Register</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
