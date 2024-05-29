import React from "react";
import "../../styles/DatabaseTable.css";

const FoodEstablishmentLinksTable = ({ data }) => {
    return (
        <div className="food-establishments-table">
            {data.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Establishment_id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Address</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(ithRow => (
                            <tr key={ithRow.Establishment_id}>
                                <td>{ithRow.Establishment_id}</td>
                                <td>{ithRow.Name}</td>
                                <td>{ithRow.Description}</td>
                                <td>{ithRow.Address}</td>
                                <td>{ithRow.Type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="no-items">
                    <div className="no-items-large-text">
                        No Food Establishments Yet
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodEstablishmentLinksTable;