import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FoodEstablishmentLinks, FoodEstablishmentContactNo } from "./FoodEstablishmentHelperComponents.js";
import "../styles/FoodEstablishmentsTable.css";

const FoodEstablishments = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:3001/getFoodEstablishments');
                setData(response.data);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    // console.log(data);
    return (
        <div className="food-establishments-table">
            {data.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Establishment_id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Address</th>
                            <th>Links</th>
                            <th>Contact Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(est => (
                            <tr key={est.Establishment_id}>
                                <td>{est.Establishment_id}</td>
                                <td>{est.Name}</td>
                                <td>{est.Type}</td>
                                <td>{est.Description}</td>
                                <td>{est.Address}</td>
                                <td>
                                    <FoodEstablishmentLinks data={est.links} />
                                </td>
                                <td>
                                    <FoodEstablishmentContactNo data={est.contact_nos} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="no-items">
                    <div className="no-items-large-text">
                        No Food Establishment Yet
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodEstablishments;