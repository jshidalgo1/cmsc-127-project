import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../../styles/DatabaseTable.css";

const UserReviewsFoodItemTable = ({ data, onDelete, onUpdate, showItemName }) => {
    const [ItemNames, setItemNames] = useState({});
    useEffect(() => {
        const fetchNames = async () => {
            const ids = [...new Set(data.map(item => item.Item_id))];
            const names = await Promise.all(ids.map(id => 
                axios.get(`http://localhost:3001/getFoodItemName/${id}`)
                    .then(res => ({ [id]: res.data.name }))
            ));
            setItemNames(Object.assign({}, ...names));
        };
        fetchNames();
    }, [data]);
    
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const handleDelete = (foodItemReview) => {
        onDelete(foodItemReview);
    };

    const handleUpdate = (foodItemReview) => {
        onUpdate(foodItemReview);
    }

    return (
        <div className="database-table">
            {data.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Item Name</th>
                            <th>Item_id</th>
                            <th>Review_date_time</th>
                            <th>review</th>
                            <th>Rating</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(ithRow => (
                            <tr key={ithRow.Username}>
                                <td>{ithRow.Username}</td>
                                <td>{ItemNames[ithRow.Item_id]}</td>
                                <td>{ithRow.Item_id}</td>
                                <td>{formatDate(ithRow.Review_date_time)}</td>
                                <td>{ithRow.review}</td>
                                <td>{ithRow.Rating}</td>
                                <td> 
                                    <button onClick={() => handleDelete(ithRow.Item_id)}>Delete</button>
                                    <button onClick={() => handleUpdate(ithRow)}>Update</button>
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="no-items">
                    <div className="no-items-large-text">
                        No User Reviews for Food Establishment Yet
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserReviewsFoodItemTable;
