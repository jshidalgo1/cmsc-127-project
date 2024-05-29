import React from "react";
import "../../styles/DatabaseTable.css";

const FoodItemTable = ({ data }) => {
    return (
        <div className="food-establishments-table">
            {data.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Item_id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Food_type</th>
                            <th>Establishment_id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(ithRow => (
                            <tr key={ithRow.Item_id}>
                                <td>{ithRow.Item_id}</td>
                                <td>{ithRow.Name}</td>
                                <td>{ithRow.Description}</td>
                                <td>{ithRow.Price}</td>
                                <td>{ithRow.Food_type}</td>
                                <td>{ithRow.Establishment_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="no-items">
                    <div className="no-items-large-text">
                        No Food Items Yet
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodItemTable;