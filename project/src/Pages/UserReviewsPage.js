import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import Navbar from "./components/Navbar.js";
import UserReviewsFoodEstablishmentTable from "./components/tables/UserReviewsFoodEstablishmentTable.js";
import UserReviewsFoodItemTable from "./components/tables/UserReviewsFoodItemTable.js";
import Modal from "./components/Modal.js";
import EstablishmentFormReview from "./components/UserEstablishmentReviewForm.js";
import UserContext from "../Routes/UserContext.js";
import "./styles/EstablishmentReviewForm.css";
function UserReviewsPage() {
    const { user } = useContext(UserContext);
    const [establishmentReviews, setEstablishmentReviews] = useState([]);
    const [itemReviews, setItemReviews] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingEstablishmentReview, setEditingEstablishmentReview] = useState(null);
    
    const fetchEstablishmentReviews = async () => {
            
        try {
            const response = await axios.get('http://localhost:3001/getFoodEstablishmentReviews');
            setEstablishmentReviews(response.data);
        } catch (error) {
            console.error('Error fetching establishment reviews:', error);
        }
    };

    useEffect(() => {
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
    reviewData.Username = user.Username;
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

    fetchEstablishmentReviews();
};
//TODO
const handleDeleteReviewEstablishment = async (Establishment_id) => {
    try {
      console.log("Establishment id: ", Establishment_id);

      await axios.delete(
        `http://localhost:3001/deleteEstablishmentReviews`,
        {
          data: { Establishment_id },
          withCredentials: true,
        }
      );

      // alert("Establishment deleted successfully!");
      fetchEstablishmentReviews();
    } catch (error) {
      console.error('Error deleting establishment:', error);
      alert("Failed to delete establishment. Please try again.");
    }
  };

  
  const handleUpdateReviewEstablishment = async (establishmentReview) => {
    
    try {
        const response = await axios.get(`http://localhost:3001/getFoodEstablishmentReview/${establishmentReview.Establishment_id}/${establishmentReview.Username}/${establishmentReview.Review_date_time}`);
      console.log('Fetched establishment data:', response.data); // Log the response data
      setEditingEstablishmentReview(response.data); // Assuming response.data contains the establishment details
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching establishment details:', error);
      alert("Failed to fetch establishment details. Please try again.");
    }
  };

//   const handleDeleteReviewFoodItem = async (Establishment_id) => {
//     try {
//       console.log("Establishment id: ", Establishment_id);

//       await axios.delete(
//         `http://localhost:3001/deleteEstablishment`,
//         {
//           data: { Establishment_id },
//           withCredentials: true,
//         }
//       );

//       // alert("Establishment deleted successfully!");
//       fetchEstablishments();
//     } catch (error) {
//       console.error('Error deleting establishment:', error);
//       alert("Failed to delete establishment. Please try again.");
//     }
//   };

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
                <UserReviewsFoodEstablishmentTable data={establishmentReviews} onDelete={handleDeleteReviewEstablishment} onUpdate={handleUpdateReviewEstablishment} />

                <h2>Food Item Reviews</h2>
                <button className="add-new-establishment-button">
                    <span className="plus-sign">+</span> Add New Food Item Review
                </button>
                {/* <UserReviewsFoodItemTable data={itemReviews} onDelete={handleDeleteReviewFoodItem} onUpdate={handleUpdateReviewFoodItem} /> */}

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
