import React from "react";

const FoodEstablishmentLinks = ({ data, estId }) => {
    const links = data.filter(link => link.Establishment_id === estId).map(link => link.links); /* TODO: this could be a query statement*/
    return (
        <>
            {links.map((link, index) => (
                <div key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                </div>
            ))}
        </>
    );
};

const FoodEstablishmentContactNo = ({ data, estId }) => {
    const contactNumbers = data.filter(contact => contact.Establishment_id === estId).map(contact => contact.Contact_no); /* TODO: this could be a query statement*/
    return (
        <>
            {contactNumbers.map((contact, index) => (
                <div key={index}>
                    <span>{contact}</span>
                </div>
            ))}
        </>
    );
};

export { FoodEstablishmentLinks, FoodEstablishmentContactNo };
