import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
// import { Link, useNavigate } from "react-router-dom";

// function Navbar({ user, items }) {
//   const navigate = useNavigate();
function Navbar({ user }) {
  return (
    <>
      <nav className="navbar">
        <ul>
          <li><Link to={{ pathname: "/user-feed", state: { user } }}>Dashboard</Link></li>
          <li><Link to={{ pathname: "/food-establishments", state: { user } }}>Food Establishments</Link></li>
          <li><Link to={{ pathname: "/food-items", state: { user } }}>Food Items</Link></li>
          <li><Link to={{ pathname: "/user-reviews", state: { user } }}>Reviews</Link></li>
          <li><Link to={{ pathname: "/profile", state: { user } }}>Profile</Link></li>
          <li><Link to={{ pathname: "/tables", state: { user } }}>Tables</Link></li>
          <li><Link to={{ pathname: "/", state: { user } }}><span style={{ cursor: 'pointer' }} >Logout</span></Link></li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;

