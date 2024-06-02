import React, { useState, useEffect } from 'react';
import '../styles/EstablishmentForm.css';

const FoodItemForm = ({ estID, items, onSave }) => {
    // console.log('establishment to edit:', establishment);
    const [itemName, setItemName] = useState(items ? items.Name : '');
    const [itemType, setItemType] = useState(items ? items.Food_type : '');
    const [itemPrice, setItemPrice] = useState(items ? items.Price : '');
    const [itemDescription, setItemDescription] = useState(items ? items.Description : '');
    // const [EstablishmentId, setEstablishmentId] = useState(items ? items.Description : '');
    // const [estLinks, setEstLinks] = useState(items ? (items.links && items.links.length > 0 ? items.links : ['']) : ['']);
    // const [estContactNumbers, setEstContactNumbers] = useState(items ? (items.Contact_no && items.Contact_no.length > 0 ? items.Contact_no : ['']) : ['']);

    useEffect(() => {
        if (items) {
            setItemName(items.Name || '');
            setItemType(items.Type || '');
            setItemPrice(items.Address || '');
            setItemDescription(items.Description || '');
            // setEstLinks(items.links && items.links.length > 0 ? items.links : ['']);
            // setEstContactNumbers(items.Contact_no && items.Contact_no.length > 0 ? items.Contact_no : ['']);
        } else {
            setItemName('');
            setItemType('');
            setItemPrice('');
            setItemDescription('');
            // setEstLinks(['']);
            // setEstContactNumbers(['']);
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
            // Links: estLinks,
            // ContactNumbers: estContactNumbers,
        };

        onSave(updatedEstablishment);
    };


    // const handleLinkChange = (index, value) => {
    //     const newLinks = [...estLinks];
    //     newLinks[index] = value;
    //     setEstLinks(newLinks);
    // };

    // const handleContactNumberChange = (index, value) => {
    //     const newContactNumbers = [...estContactNumbers];
    //     newContactNumbers[index] = value;
    //     setEstContactNumbers(newContactNumbers);
    // };

    // const addLinkInput = () => {
    //     setEstLinks([...estLinks, '']);
    // };

    // const addContactNumberInput = () => {
    //     setEstContactNumbers([...estContactNumbers, '']);
    // };

    // const deleteLinkInput = (index) => {
    //     const newLinks = [...estLinks];
    //     newLinks.splice(index, 1);
    //     setEstLinks(newLinks);
    // };

    // const deleteContactNumberInput = (index) => {
    //     const newContactNumbers = [...estContactNumbers];
    //     newContactNumbers.splice(index, 1);
    //     setEstContactNumbers(newContactNumbers);
    // };

    // const renderLinkInputs = () => {
    //     return estLinks.map((link, index) => (
    //         <div key={index} className="add-icon">
    //             {index === 0 && <label>Link:</label>}
    //             <div className="input-with-icons">
    //                 <input
    //                     type="text"
    //                     value={link}
    //                     onChange={(e) => handleLinkChange(index, e.target.value)}
    //                 />
    //                 <span onClick={addLinkInput} className="plus-icon">+</span>
    //                 {estLinks.length > 1 && <span onClick={() => deleteLinkInput(index)} className="minus-icon">-</span>}
    //             </div>
    //         </div>
    //     ));
    // };

    // const renderContactNumberInputs = () => {
    //     return estContactNumbers.map((contactNumber, index) => (
    //         <div key={index} className="add-icon">
    //             {index === 0 && <label>Contact Number:</label>}
    //             <div className="input-with-icons">
    //                 <input
    //                     type="text"
    //                     value={contactNumber}
    //                     onChange={(e) => handleContactNumberChange(index, e.target.value)}
    //                 />
    //                 <span onClick={addContactNumberInput} className="plus-icon">+</span>
    //                 {estContactNumbers.length > 1 && <span onClick={() => deleteContactNumberInput(index)} className="minus-icon">-</span>}
    //             </div>
    //         </div>
    //     ));
    // };

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
                        type="text"
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
                {/* <div>
                    {renderLinkInputs()}
                </div>
                <div>
                    {renderContactNumberInputs()}
                </div> */}
                <button type="submit">
                    {items ? 'Edit Establishment' : 'Add Establishment'}
                </button>
            </form>
        </div>
    );
}

export default FoodItemForm;
