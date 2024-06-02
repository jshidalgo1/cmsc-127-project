import React, { useState, useEffect } from 'react';
import '../styles/EstablishmentForm.css';

const FoodItemForm = ({ establishment, onSave }) => {
    // console.log('establishment to edit:', establishment);
    const [estName, setEstName] = useState(establishment ? establishment.Name : '');
    const [estType, setEstType] = useState(establishment ? establishment.Type : '');
    const [estDescription, setEstDescription] = useState(establishment ? establishment.Description : '');
    const [estAddress, setEstAddress] = useState(establishment ? establishment.Address : '');
    const [estLinks, setEstLinks] = useState(establishment ? (establishment.links && establishment.links.length > 0 ? establishment.links : ['']) : ['']);
    const [estContactNumbers, setEstContactNumbers] = useState(establishment ? (establishment.Contact_no && establishment.Contact_no.length > 0 ? establishment.Contact_no : ['']) : ['']);

    useEffect(() => {
        if (establishment) {
            setEstName(establishment.Name || '');
            setEstType(establishment.Type || '');
            setEstDescription(establishment.Description || '');
            setEstAddress(establishment.Address || '');
            setEstLinks(establishment.links && establishment.links.length > 0 ? establishment.links : ['']);
            setEstContactNumbers(establishment.Contact_no && establishment.Contact_no.length > 0 ? establishment.Contact_no : ['']);
        } else {
            setEstName('');
            setEstType('');
            setEstDescription('');
            setEstAddress('');
            setEstLinks(['']);
            setEstContactNumbers(['']);
        }
    }, [establishment]);


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const updatedEstablishment = {
            Establishment_id: establishment ? establishment.Establishment_id : null,
            Name: estName,
            Type: estType,
            Description: estDescription,
            Address: estAddress,
            Links: estLinks,
            ContactNumbers: estContactNumbers,
        };

        onSave(updatedEstablishment);
    };


    const handleLinkChange = (index, value) => {
        const newLinks = [...estLinks];
        newLinks[index] = value;
        setEstLinks(newLinks);
    };

    const handleContactNumberChange = (index, value) => {
        const newContactNumbers = [...estContactNumbers];
        newContactNumbers[index] = value;
        setEstContactNumbers(newContactNumbers);
    };

    const addLinkInput = () => {
        setEstLinks([...estLinks, '']);
    };

    const addContactNumberInput = () => {
        setEstContactNumbers([...estContactNumbers, '']);
    };

    const deleteLinkInput = (index) => {
        const newLinks = [...estLinks];
        newLinks.splice(index, 1);
        setEstLinks(newLinks);
    };

    const deleteContactNumberInput = (index) => {
        const newContactNumbers = [...estContactNumbers];
        newContactNumbers.splice(index, 1);
        setEstContactNumbers(newContactNumbers);
    };

    const renderLinkInputs = () => {
        return estLinks.map((link, index) => (
            <div key={index} className="add-icon">
                {index === 0 && <label>Link:</label>}
                <div className="input-with-icons">
                    <input
                        type="text"
                        value={link}
                        onChange={(e) => handleLinkChange(index, e.target.value)}
                    />
                    <span onClick={addLinkInput} className="plus-icon">+</span>
                    {estLinks.length > 1 && <span onClick={() => deleteLinkInput(index)} className="minus-icon">-</span>}
                </div>
            </div>
        ));
    };

    const renderContactNumberInputs = () => {
        return estContactNumbers.map((contactNumber, index) => (
            <div key={index} className="add-icon">
                {index === 0 && <label>Contact Number:</label>}
                <div className="input-with-icons">
                    <input
                        type="text"
                        value={contactNumber}
                        onChange={(e) => handleContactNumberChange(index, e.target.value)}
                    />
                    <span onClick={addContactNumberInput} className="plus-icon">+</span>
                    {estContactNumbers.length > 1 && <span onClick={() => deleteContactNumberInput(index)} className="minus-icon">-</span>}
                </div>
            </div>
        ));
    };

    return (
        <div className="establishment-form">
            <h2>{establishment ? 'Edit Item' : 'Add Food Item'}</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={estName}
                        onChange={(e) => setEstName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Type:</label>
                    <input
                        type="text"
                        value={estType}
                        onChange={(e) => setEstType(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={estDescription}
                        onChange={(e) => setEstDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        value={estAddress}
                        onChange={(e) => setEstAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    {renderLinkInputs()}
                </div>
                <div>
                    {renderContactNumberInputs()}
                </div>
                <button type="submit">
                    {establishment ? 'Edit Establishment' : 'Add Establishment'}
                </button>
            </form>
        </div>
    );
}

export default FoodItemForm;
