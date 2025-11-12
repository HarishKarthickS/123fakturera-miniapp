import React from 'react';
import './../styles/underConstruction.css';

const UnderConstruction = () => {
  return (
    <div className="under-construction-container">
      <div className="under-construction-content">
        <div className="construction-icon">
          ⚠️
        </div>
        <h1>Page Under Construction</h1>
        <p>We're working hard to bring you this page soon!</p>
        <p>Please check back later or visit other sections of our application.</p>
        <div className="back-button">
          <a href="/dashboard" className="ucbtn btn-primary">Go to Dashboard</a>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;