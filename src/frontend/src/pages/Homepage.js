import React, { useState } from "react";
import '../App.css'; 
import Axios from 'axios'
import { useUserContext } from '../context/UserContext'; 

const Homepage = () => {
  const { user, setUser } = useUserContext();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await Axios.post('http://localhost:5000/api/homepage/login', {
        email: loginEmail,
        password: loginPassword,
      });

      if (response.data.success) {
        setUser({
          user_id: response.data.user_id,
          email: response.data.email,
        });
        setLoginMessage('Login successful!');
      } else {
        setLoginMessage(response.data.message || 'Invalid email or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginMessage('An error occurred. Please try again.');
    }
  };

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
          <p>Your User ID: {user.user_id}</p>
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