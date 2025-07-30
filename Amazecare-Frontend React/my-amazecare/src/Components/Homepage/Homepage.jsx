import React from 'react';


import './Homepage.css';

const Homepage = () => {
  const toggleMenu = () => {
    const menu = document.querySelector('.navbar-menu');
    menu.classList.toggle('active');
  };

  return (
    <div>
      {/* Navbar */}
      <header className="homepage-header">
        <div className="homepage-container">
        <div className="homepage-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
  <img src="/src/assets/logoamaze.jpeg" alt="AmazeCare Logo" style={{ height: '50px' }} />
  <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'white' }}>AmazeCare Hospital</span>
</div>

          <div className="homepage-menu-icon" onClick={toggleMenu}>
            &#9776;
          </div>
          <nav className="navbar-menu">
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#doctors">Doctors</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><button className="homepage-login-btn" onClick={() => window.location.href = '/login'}>Login/Register</button></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="homepage-hero" id="home">
        <div className="hero-content">
          <h1>Your Partner In Health and Wellness</h1>
          <p>We provide quality healthcare services with the best medical professionals.</p>
          <button className="homepage-login-btn" onClick={() => window.location.href = '/login'}>Login/Register</button>
        </div>
        <div className="hero-image">
          <img src="images/doctor.jpg" alt="Doctor" />
        </div>
      </section>

      {/* Doctors Section */}
      <section className="homepage-doctors" id="doctors">
        <h2>Meet Our Doctors</h2>
        <div className="doctor-grid">
          <div className="doctor-card" data-experience="Specialist in orthopedic surgery with 10 years of experience in treating joint and bone conditions.">
            <img src="images/doctor1.jpg" alt="Doctor" />
            <h3>Dr. Hari</h3>
            <p>Orthopedic</p>
            <span>$6/h</span>
          </div>
          <div className="doctor-card" data-experience="Expert in heart diseases with 15 years of experience in treating cardiovascular conditions.">
            <img src="images/doctor6.jpg" alt="Doctor" />
            <h3>Prof. Dr. Thiya</h3>
            <p>Cardiologist</p>
            <span>$5/h</span>
          </div>
          <div className="doctor-card" data-experience="Expert in heart diseases with 15 years of experience in treating cardiovascular conditions.">
            <img src="images/doctor4.jpg" alt="Doctor" />
            <h3>Prof. Dr. Ashfaq</h3>
            <p>Cardiologist</p>
            <span>$5/h</span>
          </div>
          {/* Add remaining doctors here */}
        </div>
      </section>

      {/* Services Section */}
      <section className="homepage-services" id="services">
        <h2>Our Services</h2>
        <div className="service-cards">
          <div className="service-card">
            <h3>Emergency Care</h3>
            <p>24/7 emergency services available</p>
          </div>
          <div className="service-card">
            <h3>Cardiology</h3>
            <p>Advanced heart care treatments</p>
          </div>
          <div className="service-card">
            <h3>Inpatient Services</h3>
            <p>Medical or Surgical care</p>
          </div>
          <div className="service-card">
            <h3>Surgery Department</h3>
            <p>Elective and Emergency services</p>
          </div>
          <div className="service-card">
            <h3>Inpatient Services</h3>
            <p>Medical or Surgical care</p>
          </div>
          <div className="service-card">
            <h3>Maternity Services</h3>
            <p>Prenetal care,delivery</p>
          </div>
          <div className="service-card">
            <h3>Pediatrics</h3>
            <p>Healthcare for children</p>
          </div>
          <div className="service-card">
            <h3>Cardiology</h3>
            <p>Heart Related Diagnostics</p>
          </div>
          {/* Add remaining services here */}
        </div>
      </section>

      {/* Contact Section */}
      <footer className="homepage-contact" id="contact">
  <div className="contact-container">
    <h2>Contact Us</h2>
    <div className="contact-details">
      <p><strong>Email:</strong> support@amazecare.com</p>
      <p><strong>Phone:</strong> +1 234 567 890</p>
      <p><strong>Address:</strong> 123 Medical St, New York, NY</p>
    </div>
  </div>
</footer>

    </div>
  );
};

export default Homepage;
