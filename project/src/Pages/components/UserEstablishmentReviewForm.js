import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/EstablishmentReviewForm.css';

const EstablishmentFormReview = ({ establishment, onSave }) => {
    const [estName, setEstName] = useState(establishment ? establishment.Name : '');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState('');
    const [establishments, setEstablishments] = useState([]);

    useEffect(() => {
        const fetchEstablishments = async () => {
            const response = await axios.post('http://localhost:3001/getFoodEstablishments');
            setEstablishments(response.data);
            console.log('hello');
        };

        fetchEstablishments();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const updatedEstablishmentReview = {
            Establishment_id: establishment ? establishment.Establishment_id : null,
            Name: estName,
            Review: review,
            Rating: rating,
        };

        onSave(updatedEstablishmentReview);
    };

    return (
        <div className="establishment-form">
            <h2>{establishment ? 'Edit Establishment Review' : 'Add Establishment Review'}</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Establishment to be reviewed:</label>
                    {establishments.length > 0 ? (
                        <select
                        value={estName}
                        onChange={(e) => setEstName(e.target.value)}
                        required
                        >
                        {establishments.map((est) => (
                            <option key={est.id} value={est.Name}>
                                {est.Name}
                            </option>
                        ))}
                        </select>
                    ) : (<p> No establishments available.</p>
                    )}
                </div>
                <div>
                    <label>Review:</label>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Rating:</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">
                    {establishment ? 'Edit Review' : 'Add Review'}
                </button>
            </form>
        </div>
    );
}

export default EstablishmentFormReview;