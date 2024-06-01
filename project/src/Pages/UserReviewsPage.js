import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from "./components/Navbar.js";
import UserReviewsFoodEstablishmentTable from "./components/tables/UserReviewsFoodEstablishmentTable.js";
import UserReviewsFoodItemTable from "./components/tables/UserReviewsFoodItemTable.js";

function UserReviewsPage() {
    const [user] = useState(null); // Assuming user state is not being used for now
    const [establishmentReviews, setEstablishmentReviews] = useState([]);
    const [itemReviews, setItemReviews] = useState([]);

    useEffect(() => {
        const fetchEstablishmentReviews = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getFoodEstablishmentReviews');
                setEstablishmentReviews(response.data);
            } catch (error) {
                console.error('Error fetching establishment reviews:', error);
            }
        };

        const fetchItemReviews = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getFoodReviews');
                setItemReviews(response.data);
            } catch (error) {
                console.error('Error fetching item reviews:', error);
            }
        };

        fetchEstablishmentReviews();
        fetchItemReviews();
    }, []);
    
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

                <h2>Food Establishment Reviews</h2>
                <UserReviewsFoodEstablishmentTable data={establishmentReviews} />

                <h2>Food Item Reviews</h2>
                <UserReviewsFoodItemTable data={itemReviews} />

            </div>
        </>
    );
}

export default UserReviewsPage;
