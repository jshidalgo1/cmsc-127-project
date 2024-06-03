import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import Navbar from "./components/Navbar.js";
import UserReviewsFoodEstablishmentTable from "./components/tables/UserReviewsFoodEstablishmentTable.js";
import UserReviewsFoodItemTable from "./components/tables/UserReviewsFoodItemTable.js";
import Modal from "./components/Modal.js";
import EstablishmentFormReview from "./components/UserEstablishmentReviewForm.js";
import UserContext from "../Routes/UserContext.js";
import ItemFormReview from "./components/ItemReviewForm.js";
function UserReviewsPage() {
    const { user } = useContext(UserContext);
    const [establishmentReviews, setEstablishmentReviews] = useState([]);
    const [itemReviews, setItemReviews] = useState([]);
    const [showEstablishmentModal, setShowEstablishmentModal] = useState(false);
    const [editingEstablishmentReview, setEditingEstablishmentReview] = useState(null);
    const [showItemModal, setShowItemModal] = useState(false);
    const [editingItemReview, setEditingItemReview] = useState(null);
    const [establishmentreviewsWithinMonthFetched, setestablishmentReviewsWithinMonthFetched] = useState(false);
    const [establishmentItemWithinMonthFetched, setestablishmentItemWithinMonthFetched] = useState(false);
    const [ShowEstablishmentReviews, setShowEstablishmentReviews] = useState(false);
    const fetchEstablishmentReviews = async () => {
            
        try {
            const response = await axios.get('http://localhost:3001/getFoodEstablishmentReviews');
            setEstablishmentReviews(response.data);
        } catch (error) {
            console.error('Error fetching establishment reviews:', error);
        }
    };

    const fetchAllFoodEstablishmentReviewsWithinMonth = async () => {
        try {
            const response = await axios.get('http://localhost:3001/getAllFoodEstablishmentReviewsWithinMonth');
            setEstablishmentReviews(response.data);
            setestablishmentReviewsWithinMonthFetched(true);
        } catch (error) {
            console.error('Error fetching reviews within the last month:', error);
        }
    };

    const fetchAllFoodItemReviewsWithinMonth = async () => {
        try {
            const response = await axios.get('http://localhost:3001/getAllFoodItemReviewsWithinMonth');
            setItemReviews(response.data);
            setestablishmentItemWithinMonthFetched(true);
        } catch (error) {
            console.error('Error fetching item reviews within the last month:', error);
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

    useEffect(() => {
        fetchEstablishmentReviews();
        fetchItemReviews();
    }, []);

    const handleAddEstablishmentReviewClick = () => {
        setEditingEstablishmentReview(null); // Clear the editing establishment
        setShowEstablishmentModal(true); // Show the modal
      };

    // Function to close the modal
    const handleCloseEstablishmentModal = () => {
        setShowEstablishmentModal(false);
    };

    // Function to save the establishment review
const handleSaveEstablishmentReview = async (reviewData) => {
    reviewData.Username = user.Username;
    try {
        let response;
        if (editingEstablishmentReview) {
          console.log('Editing establishment review');
            // Updating an existing review
            response = await axios.put(`http://localhost:3001/updateEstablishmentReview/${reviewData.Establishment_id}`, reviewData);
            if (response.status === 200) {
                // Update the review in the state
                setEstablishmentReviews(establishmentReviews.map(review => 
                    review.Establishment_id === editingEstablishmentReview.Establishment_id ? response.data : review
                ));
            }
        } else {
          console.log('adding new establishment review');
            // Saving a new review
            response = await axios.post('http://localhost:3001/saveEstablishmentReview', reviewData);
            if (response.status === 200) {
                // Add the new review to the state
                setEstablishmentReviews([...establishmentReviews, response.data]);
            }
        }
    } catch (error) {
        console.error('Error saving establishment review:', error);
    }

    // Close the modal
    setShowEstablishmentModal(false);

    // Fetch the latest reviews
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
        const response = await axios.get(`http://localhost:3001/getFoodEstablishmentReview/${establishmentReview.Establishment_id}/${establishmentReview.Username}`);
      console.log('Fetched establishment data:', response.data); // Log the response data
      setEditingEstablishmentReview(response.data); // Assuming response.data contains the establishment details
      setShowEstablishmentModal(true);
    } catch (error) {
      console.error('Error fetching establishment details:', error);
      alert("Failed to fetch establishment details. Please try again.");
    }
  };

  // Add this function to handle the opening of the food item review modal
  const handleAddItemReviewClick = () => {
    setEditingItemReview(null); // Clear the editing item review
    setShowItemModal(true); // Show the modal
  };

  const handleCloseItemModal = () => {
    setShowItemModal(false);
};

// Add this function to handle the saving of the food item review
const handleSaveItemReview = async (reviewData) => {
    reviewData.Username = user.Username;
    console.log(reviewData);
    try {
        let response;
        if (editingItemReview) {
          console.log('Editing establishment review');
            // Updating an existing review
            response = await axios.put(`http://localhost:3001/updateFoodItemReview/${reviewData.Item_id}`, reviewData);
            if (response.status === 200) {
                // Update the review in the state
                setItemReviews(itemReviews.map(review => 
                    review.Item_id === editingItemReview.Item_id ? response.data : review
                ));
            }

        } else {
          console.log('adding new establishment review');
            // Saving a new review
            response = await axios.post('http://localhost:3001/saveFoodItemReview', reviewData);
            if (response.status === 200) {
                // Add the new review to the state
                setEstablishmentReviews([...establishmentReviews, response.data]);
            }
        }
    } catch (error) {
        console.error('Error saving establishment review:', error);
    }
    setShowItemModal(false);
    fetchItemReviews();
    fetchEstablishmentReviews();
    
};

// Add this function to handle the updating of the food item review
const handleUpdateReviewItem = async (itemReview) => {
    try {

        const response = await axios.get(`http://localhost:3001/getFoodItemReview/${itemReview.Item_id}/${itemReview.Username}`);
      console.log('Fetched Food Item data:', response.data); // Log the response data
      setEditingItemReview(response.data); // Assuming response.data contains the establishment details
      setShowItemModal(true);
    } catch (error) {
      console.error('Error fetching establishment details:', error);
      alert("Failed to fetch establishment details. Please try again.");
    }
};

const handleDeleteReviewItem = async (Item_id) => {
    try {
        console.log("Item id: ", Item_id);
    
        await axios.delete(
        `http://localhost:3001/deleteFoodItemReview`,
        {
            data: { Item_id },
            withCredentials: true,
        }
        );
    
        // alert("Establishment deleted successfully!");
        fetchItemReviews();
    } catch (error) {
        console.error('Error deleting establishment:', error);
        alert("Failed to delete establishment. Please try again.");
    }
    
}

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
                <button className="add-new-establishment-button" onClick={fetchAllFoodEstablishmentReviewsWithinMonth}>
                    Get Food Establishment Reviews Within Last Month
                </button>
                <button className="add-new-establishment-button" onClick={fetchEstablishmentReviews}>
                    Refresh Establishment Reviews
                </button>
                <button className="add-new-establishment-button" onClick={fetchItemReviews}>
                    Filter by Food Establishment
                </button>
                <UserReviewsFoodEstablishmentTable 
                data={establishmentReviews} 
                onDelete={handleDeleteReviewEstablishment}
                onUpdate={handleUpdateReviewEstablishment}
                showEstablishmentName={establishmentreviewsWithinMonthFetched} 
                />

                <h2>Food Item Reviews</h2>
                <button className="add-new-establishment-button" onClick={handleAddItemReviewClick}>
                    <span className="plus-sign">+</span> Add New Food Item Review
                </button>
                <button className = "add-new-establishment-button" onClick={fetchAllFoodItemReviewsWithinMonth}>
                    Get Food Item Reviews Within Last Month
                </button>
                <button className="add-new-establishment-button" onClick={fetchItemReviews}>
                    Refresh Establishment Reviews
                </button>
                <button className="add-new-establishment-button" onClick={fetchItemReviews}>
                    Filter by Food_Item
                </button>
                <UserReviewsFoodItemTable 
                data={itemReviews}
                showItemName={establishmentItemWithinMonthFetched}
                onDelete={handleDeleteReviewItem}
                onUpdate={handleUpdateReviewItem}
                />
               

            </div>

            

            <Modal show={showEstablishmentModal} onClose={handleCloseEstablishmentModal}>
          <EstablishmentFormReview
            establishment={editingEstablishmentReview}
            onSave={handleSaveEstablishmentReview}
          />
        </Modal>

        <Modal show={showItemModal} onClose={handleCloseItemModal}>
            <ItemFormReview
                item={editingItemReview}
                onSave={handleSaveItemReview}
            />
        </Modal>


        </>
    );
}

export default UserReviewsPage;
