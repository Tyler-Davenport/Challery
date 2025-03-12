/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        height: '100vh',
        background: 'linear-gradient(135deg, #A8CBB5, #E4E1C1)', // Chai Green Latte and soft cream gradient
        color: '#3C3C3C', // Dark greenish-gray text color for readability
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Sign-in Card */}
      <div
        className="text-center p-5 rounded shadow-lg"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)', // Light cream overlay for contrast
          maxWidth: '1000px', // Doubled max width
          width: '100%',
          padding: '80px', // Doubled padding for a larger card
          borderRadius: '30px', // Bigger rounded corners
        }}
      >
        <h1 style={{ fontSize: '96px', marginBottom: '40px', color: '#4F7C44' }}>Welcome to Challery</h1>

        {/* Logo inside the card, bigger size */}
        <img
          src="/images/favicon.ico"
          alt="Challery Logo"
          style={{
            width: '300px', // Doubled logo size
            height: '300px',
            marginBottom: '40px', // More spacing
          }}
        />

        <p style={{ fontSize: '44px', marginBottom: '60px', color: '#6B6B6B' }}>A platform to buy and sell stunning digital art. Sign in to explore!</p>

        <Button
          type="button"
          size="lg"
          className="copy-btn"
          onClick={signIn}
          style={{
            backgroundColor: '#A8CBB5', // Chai green latte color for button
            borderColor: '#A8CBB5',
            fontSize: '44px', // Doubled font size for the button
            padding: '30px 70px', // Bigger button
            borderRadius: '100px', // More rounded button
            boxShadow: '0 16px 40px rgba(168, 203, 181, 0.5)', // Larger shadow for the button
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
