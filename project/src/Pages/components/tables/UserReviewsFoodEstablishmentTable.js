import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../../styles/DatabaseTable.css";

const UserReviewsFoodEstablishmentTable = ({ data, onDelete, onUpdate }) => {
    const [estNames, setEstNames] = useState({});

    useEffect(() => {
        const fetchNames = async () => {
            const ids = [...new Set(data.map(item => item.Establishment_id))];
            const names = await Promise.all(ids.map(id => 
                axios.get(`http://localhost:3001/getFoodEstablishmentName/${id}`)
                    .then(res => ({ [id]: res.data.name }))
            ));
            setEstNames(Object.assign({}, ...names));
        };
        fetchNames();
    }, [data]);


    const handleDelete = (establishmentId) => {
        onDelete(establishmentId);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    return (
        <div className="food-establishments-table">
            {data.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Establishment_id</th>
                            <th>Establishment Name</th>
                            <th>Review_date_time</th>
                            <th>review</th>
                            <th>Rating</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(ithRow => (
                            <tr key={ithRow.Establishment_id}>
                                <td>{ithRow.Username}</td>
                                <td>{ithRow.Establishment_id}</td>
                                <td>{estNames[ithRow.Establishment_id]}</td>
                                <td>{formatDate(ithRow.Review_date_time)}</td>
                                <td>{ithRow.review}</td>
                                <td>{ithRow.Rating}</td>
                                <td>
                                {/*  <button onClick={() => handleUpdate(ithRow)}>Update</button> {""} */}
                                    <button onClick={() => handleDelete(ithRow.Establishment_id)}>Delete</button></td>
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

export default UserReviewsFoodEstablishmentTable;