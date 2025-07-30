import React from 'react';
import './DailyRoutines.css';

const DailyRoutines = () => {
  const handleBack = () => {
    window.history.back(); // Navigates to previous page
  };

  return (
    <div className="pa-daily-routines">
      <button className="back-button" onClick={handleBack}>← Back</button>
      <h3>Recommended Daily Routines</h3>
      <ul>
        <li>🧘‍♂️ Morning Yoga</li>
        <li>🥗 Eat a Healthy Breakfast</li>
        <li>🚶‍♀️ Take a 30-minute walk</li>
        <li>💧 Drink plenty of water</li>
        <li>🛏️ Sleep well</li>
      </ul>
    </div>
  );
};

export default DailyRoutines;
