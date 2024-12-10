
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './SignUp';
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './AuthContext';
import RecentSales from './components/RecentSales';
import Products from './components/Products';
import Order from './components/Order';

function Routee() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />          
          <Route path="/signin" element={<Signup />} />        
          
          {/* Protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/products' element={<Products />} />
          <Route path='/recentsales' element={<RecentSales />} />
          <Route path='/orders' element={<Order />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default Routee;
