import React, { useState, useEffect } from 'react';
import '../styles/EstablishmentForm.css';

const FoodItemForm = ({ estID, items, onSave }) => {
    const [itemName, setItemName] = useState(items ? items.Name : '');
    const [itemType, setItemType] = useState(items ? items.Food_type : '');
    const [itemPrice, setItemPrice] = useState(items ? items.Price : '');
    const [itemDescription, setItemDescription] = useState(items ? items.Description : '');

    useEffect(() => {
        if (items) {
            setItemName(items.Name || '');
            setItemType(items.Type || '');
            setItemPrice(items.Address || '');
            setItemDescription(items.Description || '');
        } else {
            setItemName('');
            setItemType('');
            setItemPrice('');
            setItemDescription('');
        }
    }, [items]);


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const updatedEstablishment = {
            Item_id: items ? items.Item_id : null,
            Name: itemName,
            Food_type: itemType,
            Price: itemPrice,
            Description: itemDescription,
            Establishment_id: estID,
        };

        onSave(updatedEstablishment);
    };


    return (
        <div className="establishment-form">
            <h2>{items ? 'Edit Item' : 'Add Food Item'}</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Type:</label>
                    <input
                        type="text"
                        value={itemType}
                        onChange={(e) => setItemType(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        value={itemPrice}
                        onChange={(e) => setItemPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={itemDescription}
                        onChange={(e) => setItemDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">
                    {items ? 'Edit Establishment' : 'Add Establishment'}
                </button>
            </form>
        </div>
    );
}

export default FoodItemForm;
