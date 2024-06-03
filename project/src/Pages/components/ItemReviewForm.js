import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/EstablishmentReviewForm.css';

const ItemFormReview = ({item: foodItemReview, onSave }) => {
    const [estName, setEstName] = useState(foodItemReview ? foodItemReview.Name : '');
    const [estItemId, setItemId] = useState(foodItemReview ? foodItemReview.Item_id : null);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(foodItemReview ? foodItemReview.Rating : '');
    const [FoodItem, setFoodItem] = useState([]);

    useEffect(() => {
    const fetchFoodItem = async () => {
        const response = await axios.post('http://localhost:3001/getFoodItems');
        setFoodItem(response.data);
        if (!foodItemReview && response.data.length > 0) {
            setEstName(response.data[0].Name);
            setItemId(response.data[0].Item_id);
        }
    };

    fetchFoodItem();
}, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const updatedItemReview = {
            Item_id: estItemId,
            Name: estName,
            Review: review,
            Rating: rating,
        };
        onSave(updatedItemReview);
    };

    const handleEstablishmentChange = (e) => {
        const selectedFoodItem = FoodItem.find(est => est.Name === e.target.value);
        setEstName(selectedFoodItem.Name);
        setItemId(selectedFoodItem.Item_id);
        console.log(selectedFoodItem.Item_id);
        
    }

    return (
        <div className="establishment-form">
            <h2>{foodItemReview ? 'Edit Food Item Review' : 'Add Food Item Review'}</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Food Item to be reviewed:</label>
                    {foodItemReview ? (
                        <p>{foodItemReview.name}  </p>
                    ) : FoodItem.length > 0 ? (
                        <select
                            value={estName}
                            onChange={handleEstablishmentChange}
                            required
                        >
                            {FoodItem.map((est) => (
                                <option key={est.id} value={est.Name}>
                                    {est.Name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p> No Food Items available.</p>
                    )}
                </div>
                <div>
                    <label>Review:</label>
                    <textarea
                        defaultValue={foodItemReview ? foodItemReview.review : ''}
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
                    {foodItemReview ? 'Edit Review' : 'Add Review'}
                </button>
            </form>
        </div>
    );
}

export default ItemFormReview;