import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from "./components/Navbar.js";
import UserReviewsFoodEstablishmentTable from "./components/tables/UserReviewsFoodEstablishmentTable.js";
import UserReviewsFoodItemTable from "./components/tables/UserReviewsFoodItemTable.js";
import Modal from "./components/Modal.js";
import EstablishmentFormReview from "./components/UserEstablishmentReviewForm.js";

function UserReviewsPage() {
    const [user] = useState(null); // Assuming user state is not being used for now
    const [establishmentReviews, setEstablishmentReviews] = useState([]);
    const [itemReviews, setItemReviews] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingEstablishmentReview, setEditingEstablishmentReview] = useState(null);

    useEffect(() => {
        const fetchEstablishmentReviews = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getFoodEstablishmentReviews');
                setEstablishmentReviews(response.data);
            } catch (error) {
                console.error('Error fetching establishment reviews:', error);
            }
        };

        const fetchItemReviews = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getFoodReviews');
                setItemReviews(response.data);
            } catch (error) {
                console.error('Error fetching item reviews:', error);
            }
        };

        fetchEstablishmentReviews();
        fetchItemReviews();
    }, []);

    const handleAddEstablishmentReviewClick = () => {
        setEditingEstablishmentReview(null); // Clear the editing establishment
        setShowModal(true); // Show the modal
      };

    // Function to close the modal
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Function to save the establishment review
    const handleSaveEstablishmentReview = async (reviewData) => {
    try {
        // Send the review data to the server
        const response = await axios.post('http://localhost:3001/saveEstablishmentReview', reviewData);

        // If the request was successful, update the state with the new review
        if (response.status === 200) {
            setEstablishmentReviews([...establishmentReviews, response.data]);
        }
    } catch (error) {
        console.error('Error saving establishment review:', error);
    }

    // Close the modal
    setShowModal(false);
};

    return (
        <>
            <Navbar user={user} />
            <div className="user-feed">

                <div className="user-header">
                    <h1>User Reviews</h1>
                    <h3>
                        <span className="dashboard-text">Dashboard</span> &gt; User Reviews
                    </h3>
                </div>

                <h2>Food Establishment Reviews</h2>
                <button className="add-new-establishment-button" onClick={handleAddEstablishmentReviewClick}>
                    <span className="plus-sign">+</span> Add New Food Establishment Review
                </button>
                <UserReviewsFoodEstablishmentTable data={establishmentReviews} />

                <h2>Food Item Reviews</h2>
                <button className="add-new-establishment-button">
                    <span className="plus-sign">+</span> Add New Food Item Review
                </button>
                <UserReviewsFoodItemTable data={itemReviews} />

            </div>

            <Modal show={showModal} onClose={handleCloseModal}>
          <EstablishmentFormReview
            establishment={editingEstablishmentReview}
            onSave={handleSaveEstablishmentReview}
          />
        </Modal>


        </>
    );
}

export default UserReviewsPage;
