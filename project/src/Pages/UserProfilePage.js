import React, { useState } from "react";
import Navbar from "./components/Navbar.js";
// import FoodItemTable from "./components/tables/FoodItemTable.js";
// import { FOOD_ITEM } from "./dummyData.js"; // Import FOOD_ESTABLISHMENT array

function UserProfilePage() {
    const [user] = useState(null); // Assuming user state is not being used for now

    return (
        <>
            <Navbar user={user} />
            <div className="user-feed">

                <div className="user-header">
                    <h1>User Profile</h1>
                    <h3>
                        <span className="dashboard-text">Dashboard</span> &gt; Profile
                    </h3>
                </div>

                <h2>Profile</h2>
                {/* <FoodItemTable data={FOOD_ITEM} /> */}

            </div>

        </>
    );
}

export default UserProfilePage;
