import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";
import "./navbar.css"; // Import the CSS file for styling

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">Admin Panel</div>
        <div className="navbar-links">
          <Link to="/dashboard" className="navbar-link">
            Home
          </Link>
          <Link to="/dashboard/employees" className="navbar-link">
            Employee List
          </Link>
        </div>
        <div className="navbar-user">
          {user?.username && (
            <span className="navbar-username">{user.username}</span>
          )}
          <button className="navbar-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
