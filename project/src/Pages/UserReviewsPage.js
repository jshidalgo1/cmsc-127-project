import React, { useState } from "react";
import Navbar from "./components/Navbar.js";
// import FoodItemTable from "./components/tables/FoodItemTable.js";
// import { FOOD_ITEM } from "./dummyData.js"; // Import FOOD_ESTABLISHMENT array

function UserReviewsPage() {
    const [user] = useState(null); // Assuming user state is not being used for now

    return (
        <>
            <Navbar user={user} />
            <div className="user-feed">

                <div className="user-header">
                    <h1>User Reviews</h1>
                    <h3>
                        <span className="dashboard-text">Dashboard</span> &gt; User Reviews
                    </h3>
                </div>

                <h2>Reviews</h2>
                {/* <FoodItemTable data={FOOD_ITEM} /> */}

            </div>

        </>
    );
}

export default UserReviewsPage;
