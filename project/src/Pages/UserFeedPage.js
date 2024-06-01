import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import React, { useState } from "react";
import "./styles/UserFeed.css";
import UserContext from "../Routes/UserContext.js";
// import React from "react";
// import "../../styles/UserFeedPage.css";
// import React, { useState, useEffect } from "react";
// import axios from "axios";

function UserFeedPage() {
  const { user } = React.useContext(UserContext);
  return (
    <>
      <Navbar user={user} />

      <div className="user-feed">

        <div className="user-header">
          <h1>Dashboard</h1>
          <h3>
            <span className="dashboard-text">Dashboard</span>
          </h3>
        </div>

        <h1>Welcome, {user ? user.First_name : "User"}!</h1>

      </div>
    </>
  );
}

export default UserFeedPage;
