

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';
import './Login.css';
import { toast } from 'react-toastify'; 

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage('');
  };

  const handleLogin = async () => {
    try {
      const { email, password } = formData;
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password,
      });

      const { token, userId, username } = response.data;

      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username);

      login(userId, token, username);

      toast.success('Login successful!');
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid login credentials.');
      setErrorMessage(error.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-form">
      <h2 style={{ fontWeight: '18px', fontSize: '30px' }}>Login Your Account</h2>
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
          />
        </label>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signin">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;














































































