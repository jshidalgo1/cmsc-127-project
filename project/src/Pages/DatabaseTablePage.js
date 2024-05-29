import React, { useState } from "react";
import Navbar from "./components/Navbar.js";
import UserTable from "./components/tables/UserTable.js";
import FoodEstablishmentsTable from "./components/tables/FoodEstablishmentsTable.js";
import UserReviewsFoodEstablishmentTable from "./components/tables/UserReviewsFoodEstablishmentTable.js";
import FoodEstablishmentLinksTable from "./components/tables/FoodEstablishmentLinksTable.js";
import FoodEstablishmentContactNumberTable from "./components/tables/FoodEstablishmentContactNumberTable.js";
import FoodItemTable from "./components/tables/FoodItemTable.js";
import UserReviewsFoodItemTable from "./components/tables/UserReviewsFoodItemTable.js";
import {
    USER,
    FOOD_ESTABLISHMENT,
    USER_REVIEWS_FOOD_ESTABLISHMENT,
    FOOD_ESTABLISHMENT_links,
    FOOD_ESTABLISHMENT_CONTACT_NO,
    FOOD_ITEM,
    USER_REVIEWS_FOOD_ITEM
} from "./dummyData.js"; // Import data

function DatabaseTablePage() {
    const [user] = useState(null); // Assuming user state is not being used for now

    return (
        <>
            <Navbar user={user} />
            <div className="user-feed">

                <div className="user-header">
                    <h1>Database Tables</h1>
                    <h3>
                        <span className="dashboard-text">Dashboard</span> &gt; Database Tables
                    </h3>
                </div>

                <h2>User Table</h2>
                <UserTable data={USER} />
                <br />

                <h2>Food Establishment Table</h2>
                <FoodEstablishmentsTable data={FOOD_ESTABLISHMENT} />
                <br />

                <h2>Food Establishment Links Table</h2>
                <FoodEstablishmentLinksTable data={FOOD_ESTABLISHMENT_links} />
                <br />

                <h2>Food Establishment Contact Number Table</h2>
                <FoodEstablishmentContactNumberTable data={FOOD_ESTABLISHMENT_CONTACT_NO} />
                <br />

                <h2>User Reviews Food Establishment Table</h2>
                <UserReviewsFoodEstablishmentTable data={USER_REVIEWS_FOOD_ESTABLISHMENT} />
                <br />

                <h2>Food Item Table</h2>
                <FoodItemTable data={FOOD_ITEM} />
                <br />

                <h2>User Reviews Food Item Table</h2>
                <UserReviewsFoodItemTable data={USER_REVIEWS_FOOD_ITEM} />
                <br />

            </div>

        </>
    );
}

export default DatabaseTablePage;
