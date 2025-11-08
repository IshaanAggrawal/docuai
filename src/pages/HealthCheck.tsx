import React from 'react';

const HealthCheck = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Health Check</h1>
      <p>Application is running successfully!</p>
      <p>Current time: {new Date().toLocaleString()}</p>
    </div>
  );
};

export default HealthCheck;