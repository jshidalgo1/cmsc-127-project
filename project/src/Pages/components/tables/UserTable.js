import React from "react";
import "../../styles/DatabaseTable.css";

const UserReviewsFoodEstablishmentTable = ({ data }) => {
    return (
        <div className="food-establishments-table">
            {data.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>First_name</th>
                            <th>Middle_name</th>
                            <th>Last_name</th>
                            <th>Password</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Birthday</th>
                            <th>No_of_reviews</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(ithRow => (
                            <tr key={ithRow.Username}>
                                <td>{ithRow.Username}</td>
                                <td>{ithRow.First_name}</td>
                                <td>{ithRow.Middle_name}</td>
                                <td>{ithRow.Last_name}</td>
                                <td>{ithRow.Password}</td>
                                <td>{ithRow.Email}</td>
                                <td>{ithRow.Age}</td>
                                <td>{ithRow.Birthday}</td>
                                <td>{ithRow.No_of_reviews}</td>
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