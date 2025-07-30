import React from 'react';
import './DailyExercises.css';

const DailyExercises = () => {
  const handleBack = () => {
    window.history.back(); // Navigates to the previous page
  };

  return (
    <div className="exer-daily-exercises">
      <button className="exer-back-button" onClick={handleBack}>← Back</button>
      <h3>Daily Exercises</h3>
      <ul>
        <li>🏋️‍♂️ Strength Training</li>
        <li>🤸‍♀️ Stretching</li>
        <li>🏃‍♂️ Running or Jogging</li>
        <li>🚴‍♀️ Cycling</li>
        <li>🤾‍♂️ Sports Activities</li>
        <li>💪 Core Workouts</li>
      </ul>
      <div className="exer-pa-card" onClick={() => console.log("Exercise Details")}>
        <h3>Exercise Tips</h3>
        <p>Get the Most Out of Your Workouts</p>
      </div>
    </div>
  );
};

export default DailyExercises;
