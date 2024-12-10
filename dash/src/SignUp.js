


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import './Login.css';

const SignUp = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(''); 
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
    
    if (!username || !email || !password) {
      setErrorMessage('All fields are required.');
      return;
    }
    
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    console.log('Form Data:', formData);

    try {
      const response = await axios.post('http://localhost:3001/api/auth/signup', formData);
      setSuccessMessage('Signup successful! Please check your email to verify your account.');
      setTimeout(() => navigate('/login'), 5000); 

      setFormData({ username: '', email: '', password: '' });
    } catch (error) {
      console.error('SignUp Error:', error);
      if (error.response) {
        setErrorMessage(error.response?.data?.message || 'Signup failed. Please try again.');
      } else {
        setErrorMessage('An unknown error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="signup-form">
    <h2 style={{fontWeight:"18px", fontSize:"30px"}}> Login Your Account</h2>
    <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            title="Password must be at least 6 characters long"
          />
        </label>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/">Log In</Link>
      </p>
    </div>
  );
};

export default SignUp;
