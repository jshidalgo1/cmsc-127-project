import React from "react";
import { Link } from 'react-router-dom';
import { FoodEstablishmentLinks, FoodEstablishmentContactNo } from "./FoodEstablishmentHelperComponents.js";
import "../styles/FoodEstablishmentsTable.css";

const FoodEstablishments = ({ data, onDelete, onUpdate, noAction }) => {
    const handleDelete = (establishmentId) => {
        onDelete(establishmentId);
    };

    const handleUpdate = (establishment) => {
        onUpdate(establishment);
    };

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
                            <th>Average Rating</th>
                            {noAction === 1 ? null : <th>Action</th>}
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
                                {/* Display average rating */}
                                <td>
                                    <FoodEstablishmentLinks data={est.links} />
                                </td>
                                <td>
                                    <FoodEstablishmentContactNo data={est.Contact_no} />
                                </td>
                                <td>{est.AverageRating}</td>
                                {!noAction && (
                                    <td>
                                        <div className="action-buttons">
                                            <Link to={{ pathname: `/food-establishment/${est.Establishment_id}` }}>
                                                <button className="action-button">View</button>
                                            </Link>
                                            {" "}
                                            <button className="action-button" onClick={() => handleUpdate(est)}>Update</button>
                                            {" "}
                                            <button className="action-button" onClick={() => handleDelete(est.Establishment_id)}>Delete</button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="no-items">
                    <div className="no-items-large-text">
                        No Food Establishment
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodEstablishments;
