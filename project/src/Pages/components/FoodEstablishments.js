import React from "react";
import { FoodEstablishmentLinks, FoodEstablishmentContactNo } from "./FoodEstablishmentHelperComponents.js";
import { FOOD_ESTABLISHMENT_links, FOOD_ESTABLISHMENT_CONTACT_NO } from "../dummyData.js";
import "../styles/FoodEstablishmentsTable.css";

const FoodEstablishments = ({ data }) => {
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
                                    <FoodEstablishmentLinks data={FOOD_ESTABLISHMENT_links} estId={est.Establishment_id} />
                                </td>
                                <td>
                                    <FoodEstablishmentContactNo data={FOOD_ESTABLISHMENT_CONTACT_NO} estId={est.Establishment_id} />
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
