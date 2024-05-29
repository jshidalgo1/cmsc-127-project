import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
// import { Link, useNavigate } from "react-router-dom";

// function Navbar({ user, items }) {
//   const navigate = useNavigate();
function Navbar(user) {

  return (
    <>
      <nav className="navbar">
        <ul>
          <li><Link to="/user-feed">Dashboard</Link></li>
          <li><Link to="/food-establishments">Food Establishments</Link></li>
          <li><Link to="/food-items">Food Items</Link></li>
          <li><Link to="/user-reviews">Reviews</Link></li> {/* TODO: fetch reviews of current user*/}
          <li>
            {/* Pass the user object as a parameter */}
            <Link
              to={{
                pathname: "/profile",
                state: { user: user },
              }}
            >Profile
            </Link>
          </li>
          <li><Link to="/tables">Tables</Link></li>
          <li><Link to="/"><span style={{ cursor: 'pointer' }} >Logout</span></Link></li> {/* TODO: add logout feature*/}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;

