import React from "react";

const FoodEstablishmentLinks = ({ data }) => {
    if (!data || !Array.isArray(data)) {
        return <div>No links available</div>;
    }

    return (
        <div>
            {data.map((link, index) => (
                <div key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        {link}
                    </a>
                </div>
            ))}
        </div>
    );
};

const FoodEstablishmentContactNo = ({ data }) => {
    if (!data || !Array.isArray(data)) {
        return <div>No contact numbers available</div>;
    }

    return (
        <div>
            {data.map((contact, index) => (
                <div key={index}>{contact}</div>
            ))}
        </div>
    );
};
export { FoodEstablishmentLinks, FoodEstablishmentContactNo };
