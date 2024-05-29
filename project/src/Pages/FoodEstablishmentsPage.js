import React, { useState } from "react";
import Navbar from "./components/Navbar.js";
import FoodEstablishments from "./components/FoodEstablishments.js";
import { FOOD_ESTABLISHMENT } from "./dummyData.js"; // Import FOOD_ESTABLISHMENT array

function FoodEstablishmentsPage() {
  const [user] = useState(null); // Assuming user state is not being used for now

  return (
    <>
      <Navbar user={user} />
      <div className="user-feed">

        <div className="user-header">
          <h1>Food Establishments</h1>
          <h3>
            <span className="dashboard-text">Dashboard</span> &gt; Food Establishments
          </h3>
        </div>

        <h2>Establishments</h2>
        <FoodEstablishments data={FOOD_ESTABLISHMENT} /> {/* Pass FOOD_ESTABLISHMENT data here */}

      </div>

    </>
  );
}

export default FoodEstablishmentsPage;
