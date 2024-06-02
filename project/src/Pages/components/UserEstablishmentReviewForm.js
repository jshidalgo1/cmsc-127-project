import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/EstablishmentReviewForm.css';

const EstablishmentFormReview = ({ establishment: establishmentReview, onSave }) => {
    const [estName, setEstName] = useState(establishmentReview ? establishmentReview.Name : '');
    const [estId, setEstId] = useState(establishmentReview ? establishmentReview.Establishment_id : null);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState('');
    const [establishments, setEstablishments] = useState([]);

    useEffect(() => {
        const fetchEstablishments = async () => {
            const response = await axios.post('http://localhost:3001/getFoodEstablishments');
            setEstablishments(response.data);
            if (response.data.length > 0) {
                setEstName(response.data[0].Name);
                setEstId(response.data[0].Establishment_id);
            }
        };

        fetchEstablishments();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const updatedEstablishmentReview = {
            Establishment_id: estId,
            Name: estName,
            Review: review,
            Rating: rating,
        };

        onSave(updatedEstablishmentReview);
    };

    const handleEstablishmentChange = (e) => {
        const selectedEstablishment = establishments.find(est => est.Name === e.target.value);
        setEstName(selectedEstablishment.Name);
        setEstId(selectedEstablishment.Establishment_id);
        console.log(selectedEstablishment.Establishment_id);
        
    }

    return (
        <div className="establishment-form">
            <h2>{establishmentReview ? 'Edit Establishment Review' : 'Add Establishment Review'}</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Establishment to be reviewed:</label>
                    {establishments.length > 0 ? (
                        <select
                        value={estName}
                        onChange={handleEstablishmentChange}
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
                    {establishmentReview ? 'Edit Review' : 'Add Review'}
                </button>
            </form>
        </div>
    );
}

export default EstablishmentFormReview;