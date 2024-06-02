import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from "./components/Navbar.js";
import FoodItemTable from "./components/tables/FoodItemTable.js";

function FoodItemsPage() {
    const [user] = useState(null); // Assuming user state is not being used for now
    const [data, setData] = useState([]);
    const [isOrdered, setIsOrdered] = useState(false);
    
    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try {
            const response = await axios.post('http://localhost:3001/getFoodItems');
            setData(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchFoodItemsOrderedByEstablishmentName = async () => {
        try {
            const response = await axios.post('http://localhost:3001/getAllFoodItemsOrderedByEstablishmentName');
            console.log('Ordered fetch response:', response.data);
    
            if (Array.isArray(response.data)) {
                const transformedData = response.data.map(item => {
                    console.log('Transforming item:', item); // Log each item before transformation
                    return {
                        ...item,
                        Name: `${item.Name}`
                    };
                });
                console.log('Transformed data:', transformedData); // Log transformed data
                setData(transformedData);
                setIsOrdered(true); // Set isOrdered to true
            } else {
                console.error('Unexpected response data:', response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchFoodItemsOrderedByEstablishmentNameAndPrice = async () => {
        try {
            const response = await axios.post('http://localhost:3001/getAllFoodItemsOrderedByEstablishmentNameAndPrice');
            console.log('Ordered by Establishment Name and Price fetch response:', response.data);
    
            if (Array.isArray(response.data)) {
                const transformedData = response.data.map(item => {
                    console.log('Transforming item:', item); // Log each item before transformation
                    return {
                        ...item,
                        Name: `${item.Name}`
                    };
                });
                console.log('Transformed data:', transformedData); // Log transformed data
                setData(transformedData);
                setIsOrdered(true); // Set isOrdered to true
            } else {
                console.error('Unexpected response data:', response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchFoodItemsOrderedByEstablishmentNameAndFoodType = async () => {
        try {
            const response = await axios.post('http://localhost:3001/getAllFoodItemsOrderedByEstablishmentNameAndFoodType');
            console.log('Ordered by Establishment Name and Food Type fetch response:', response.data);
    
            if (Array.isArray(response.data)) {
                const transformedData = response.data.map(item => {
                    console.log('Transforming item:', item); // Log each item before transformation
                    return {
                        ...item,
                        Name: `${item.Name}`
                    };
                });
                console.log('Transformed data:', transformedData); // Log transformed data
                setData(transformedData);
                setIsOrdered(true); // Set isOrdered to true
            } else {
                console.error('Unexpected response data:', response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
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
                <button onClick={fetchFoodItemsOrderedByEstablishmentName}>Order by Establishment Name</button>
                <span>&nbsp;</span> {/* Add a non-breaking space */}
                <button onClick={fetchFoodItemsOrderedByEstablishmentNameAndPrice}>Order by Establishment Name and Price</button>
                <span>&nbsp;</span> {/* Add a non-breaking space */}
                <button onClick={fetchFoodItemsOrderedByEstablishmentNameAndFoodType}>Order by Establishment Name and Food Type</button>
                <FoodItemTable data={data} isOrdered={isOrdered} /> {/* Pass isOrdered prop */}
            </div>
        </>
    );
}

export default FoodItemsPage;
