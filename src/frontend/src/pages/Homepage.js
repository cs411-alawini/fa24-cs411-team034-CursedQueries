import React, { useState, useContext } from "react";
import '../App.css'; // Ensure CSS is linked correctly
import Axios from 'axios'
import { UserContext } from '../context/UserContext'; // Import UserContext

const Homepage = () => {
  const { user, setUser } = useContext(UserContext); // Access user context

  // States for Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  // States for Create Account
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');

  // Handle Login
  const handleLogin = async () => {
    try {
      const response = await Axios.post('http://localhost:5000/api/homepage/login', {
        email: loginEmail,
        password: loginPassword,
      });

      if (response.data.success) {
        setUser(response.data.user); // Set global user context
        setLoginMessage('Login successful!');
      } else {
        setLoginMessage('Invalid email or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginMessage('An error occurred. Please try again.');
    }
  };

  // Handle Registration
  const handleRegister = async () => {
    try {
      const response = await Axios.post('http://localhost:5000/api/create-user', {
        email: registerEmail,
        password: registerPassword,
      });

      if (response.data.success) {
        setRegisterMessage('Account created successfully!');
      } else {
        setRegisterMessage('Error creating account.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setRegisterMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="homepage">
      {user ? (
        <div>
          <h1>Welcome, {user.email}!</h1>
          <p>You are logged in.</p>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Homepage;