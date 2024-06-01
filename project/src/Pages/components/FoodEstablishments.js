import React from "react";
import { FoodEstablishmentLinks, FoodEstablishmentContactNo } from "./FoodEstablishmentHelperComponents.js";
import "../styles/FoodEstablishmentsTable.css";

const FoodEstablishments = ({ data, onDelete, onUpdate }) => {
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
                            <th>Action</th>
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
                                <td>
                                    <button onClick={() => handleUpdate(est)}>Update</button> {""} {/* TODO: update feature */}
                                    <button onClick={() => handleDelete(est.Establishment_id)}>Delete</button>
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

