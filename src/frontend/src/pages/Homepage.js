import React, { useState } from 'react';
import '../App.css'; // Ensure CSS is linked correctly
import Axios from 'axios'

const Homepage = () => {
  // States for Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  // States for Create Account
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');

  // Handle Login
  const handleLogin = () => {
    // Replace with actual API call
    if (loginEmail === 'test@example.com' && loginPassword === 'password') {
      setLoginMessage('Login successful!');
    } else {
      setLoginMessage('Invalid email or password.');
    }
  };

  // Handle Registration
  const handleRegister = async () => {
    try {
      // Replace with actual API call
      console.log(`Registering: ${registerEmail}, ${registerPassword}`);
      setRegisterMessage('Account created successfully!');
    } catch (error) {
      setRegisterMessage('Error creating account. Please try again.');
    }
  };

  return (
    <div className="homepage">
      {/* Login Section */}
      <h1>Login</h1>
      <label htmlFor="emailLogin"> Email: </label>
      <input
        id="emailLogin"
        type="text"
        placeholder="Enter your email"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
      />
      <br />
      <br />
      <label htmlFor="passwordLogin"> Password: </label>
      <input
        id="passwordLogin"
        type="password"
        placeholder="Enter your password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleLogin} style={{ marginBottom: '40px' }}>
        Login
      </button>
      <p>{loginMessage}</p>
      <hr />
      <br />

      {/* Create Account Section */}
      <h1>Create Account</h1>
      <label htmlFor="emailRegister"> Email: </label>
      <input
        id="emailRegister"
        type="text"
        placeholder="Enter your email"
        value={registerEmail}
        onChange={(e) => setRegisterEmail(e.target.value)}
      />
      <br />
      <br />
      <label htmlFor="passwordRegister"> Password: </label>
      <input
        id="passwordRegister"
        type="password"
        placeholder="Enter your password"
        value={registerPassword}
        onChange={(e) => setRegisterPassword(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleRegister} style={{ marginBottom: '40px' }}>
        Create Account
      </button>
      <p>{registerMessage}</p>
    </div>
  );
};

export default Homepage;