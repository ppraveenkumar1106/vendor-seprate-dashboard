import React from 'react';
import './sideBar.css';
import { Link } from 'react-router-dom';

function SideBar() {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link collapsed" to="/products">
            <i className="bi bi-menu-button-wide"></i>
            <span>Products</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link collapsed" to="/recentsales">
            <i className="bi bi-journal-text"></i>
            <span>Recent Sales</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link collapsed" to="/orders">
            <i className="bi bi-bag-heart"></i>
            <span>Orders</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link collapsed" to="/customer">
            <i className="bi bi-person-heart"></i>
            <span>Customer</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link collapsed" to="/message">
            <i className="bi bi-chat-heart-fill"></i>
            <span>Message</span>
          </Link>
        </li>

      </ul>
    </aside>
  );
}

export default SideBar;
