import React from "react";
import "../../styles/DatabaseTable.css";

const UserReviewsFoodItemTable = ({ data }) => {
    return (
        <div className="food-establishments-table">
            {data.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Item_id</th>
                            <th>Review_date_time</th>
                            <th>review</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(ithRow => (
                            <tr key={ithRow.Username}>
                                <td>{ithRow.Username}</td>
                                <td>{ithRow.Item_id}</td>
                                <td>{ithRow.Review_date_time}</td>
                                <td>{ithRow.review}</td>
                                <td>{ithRow.Rating}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="no-items">
                    <div className="no-items-large-text">
                        No User Reviews for Food Item Yet
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserReviewsFoodItemTable;