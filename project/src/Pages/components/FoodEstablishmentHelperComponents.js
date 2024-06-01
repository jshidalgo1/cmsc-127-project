import React from "react";

const FoodEstablishmentLinks = ({ data }) => {
    return (
        <>
            {data.map((link, index) => (
                <div key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                </div>
            ))}
        </>
    );
};

const FoodEstablishmentContactNo = ({ data }) => {
    return (
        <div>
            {data.map((contact, index) => (
                <div key={index}>
                    <span>{contact}</span>
                </div>
            ))}
        </div>
    );
};
export { FoodEstablishmentLinks, FoodEstablishmentContactNo };
