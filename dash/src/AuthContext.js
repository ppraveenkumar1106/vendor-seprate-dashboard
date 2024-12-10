
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    username: localStorage.getItem('username') || '',
    userId: localStorage.getItem('userId') || '',
    token: localStorage.getItem('token') || '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');

    if (!storedUserId || !storedToken || !storedUsername) {
      const currentPath = window.location.pathname;
      if (currentPath === '/' || currentPath === '/signin') {
      } else {
        navigate('/');
      }
    } else {
      setAuthState({
        username: storedUsername,
        userId: storedUserId,
        token: storedToken,
      });
    }
  }, [navigate]);

  const login = (userId, userToken, username) => {
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', userToken);
    localStorage.setItem('username', username);

    setAuthState({ userId, token: userToken, username });

    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    setAuthState({
      username: '',
      userId: '',
      token: '',
    });

    navigate('/'); 
  };

  const isAuthenticated = () => authState.token !== '';

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, ...authState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
