import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: '100vh',
        background: 'linear-gradient(135deg, #A8CBB5, #E4E1C1)', // Chai Green Latte and soft cream gradient
        color: '#3C3C3C', // Dark greenish-gray text color for readability
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        className="text-center p-5 rounded shadow-lg"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)', // Light cream overlay for contrast
          maxWidth: '500px', // Increased max width
          width: '100%',
          borderRadius: '15px', // Rounded corners for a softer look
        }}
      >
        <h1 style={{ fontSize: '48px', marginBottom: '30px', color: '#4F7C44' }}>Welcome to Challery</h1>
        <p style={{ fontSize: '22px', marginBottom: '40px', color: '#6B6B6B' }}>A platform to buy and sell stunning digital art. Sign in to explore!</p>
        <Button
          type="button"
          size="lg"
          className="copy-btn"
          onClick={signIn}
          style={{
            backgroundColor: '#A8CBB5', // Chai green latte color for button
            borderColor: '#A8CBB5',
            fontSize: '22px', // Larger font size for the button
            padding: '15px 35px', // Increased padding for a bigger button
            borderRadius: '50px', // Rounded button
            boxShadow: '0 8px 20px rgba(168, 203, 181, 0.5)', // Larger shadow for the button
            color: '#3C3C3C', // Dark text on button for contrast
          }}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Signin;
