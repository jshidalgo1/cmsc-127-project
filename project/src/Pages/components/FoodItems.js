import React from "react";
import { Link } from 'react-router-dom';
import { FoodEstablishmentLinks, FoodEstablishmentContactNo } from "./FoodEstablishmentHelperComponents.js";
import "../styles/FoodEstablishmentsTable.css";

const FoodItems = ({ data, onDelete, onUpdate }) => {
    const handleDelete = (itemId) => {
        onDelete(itemId);
    };

    const handleUpdate = (item) => {
        onUpdate(item);
    };

    return (
        <div className="food-establishments-table">
            {data.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Item_id</th>
                            <th>Name</th>
                            <th>Food_type</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Establishment_id</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.Item_id}>
                                <td>{item.Item_id}</td>
                                <td>{item.Name}</td>
                                <td>{item.Food_type}</td>
                                <td>{item.Price}</td>
                                <td>{item.Description}</td>
                                <td>{item.Establishment_id}</td>

                                <td>
                                    {/* <button><Link to={{ pathname: `/food-establishment/${item.Establishment_id}` }}>View</Link></button> {""}
                                    <button className="action-button" onClick={() => handleUpdate(item)}>Update</button> {""}
                                    <button className="action-button" onClick={() => handleDelete(item.Establishment_id)}>Delete</button> */}
                                    <div className="action-buttons">
                                        <Link to={{ pathname: `/food-establishment/${item.Establishment_id}` }}>
                                            <button className="action-button">View</button>
                                        </Link>
                                        {" "}
                                        <button className="action-button" onClick={() => handleUpdate(item)}>Update</button>
                                        {" "}
                                        <button className="action-button" onClick={() => handleDelete(item.Item_id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="no-items">
                    <div className="no-items-large-text">
                        No Food Item
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodItems;

