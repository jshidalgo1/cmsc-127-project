import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from "./components/Navbar.js";
import FoodItemTable from "./components/tables/FoodItemTable.js";
import { FOOD_ITEM } from "./dummyData.js"; // Import FOOD_ESTABLISHMENT array

function FoodItemsPage() {
    const [user] = useState(null); // Assuming user state is not being used for now
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:3001/getFoodItems');
                setData(response.data);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    
    return (
        <>
            <Navbar user={user} />
            <div className="user-feed">

                <div className="user-header">
                    <h1>Food Items</h1>
                    <h3>
                        <span className="dashboard-text">Dashboard</span> &gt; Food Items
                    </h3>
                </div>

                <h2>Items</h2>
                <FoodItemTable data={data} />

            </div>

        </>
    );
}

export default FoodItemsPage;
