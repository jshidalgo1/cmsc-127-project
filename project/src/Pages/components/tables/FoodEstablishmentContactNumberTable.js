import React from "react";
import "../../styles/DatabaseTable.css";

const FoodEstablishmentContactNumberTable = ({ data }) => {
    return (
        <div className="food-establishments-table">
            {data.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Establishment_id</th>
                            <th>Contact_no</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(ithRow => (
                            <tr key={ithRow.Establishment_id}>
                                <td>{ithRow.Establishment_id}</td>
                                <td>{ithRow.Contact_no}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="no-items">
                    <div className="no-items-large-text">
                        No Food Establishment Contact Number Yet
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodEstablishmentContactNumberTable;
