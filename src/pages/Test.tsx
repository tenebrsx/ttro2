import React from 'react';

const Test = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: '#333', fontSize: '24px' }}>React is Working!</h1>
      <p style={{ color: '#666' }}>If you can see this, your development server is running correctly.</p>
      <p style={{ color: '#666' }}>Current time: {new Date().toLocaleString()}</p>
    </div>
  );
};

export default Test;
