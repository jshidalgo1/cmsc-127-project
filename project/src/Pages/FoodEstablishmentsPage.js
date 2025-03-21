import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar.js";
import FoodEstablishments from "./components/FoodEstablishments.js";
import EstablishmentForm from "./components/EstablishmentForm.js";
import Modal from "./components/Modal.js";
import axios from "axios";

function FoodEstablishmentsPage() {
  const [user] = useState(null); // Assuming user state is not being used for now

  const [establishments, setEstablishments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewHighRating, setViewHighRating] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [editingEstablishment, setEditingEstablishment] = useState(null);


  const fetchEstablishments = async () => {
    try {
      let response;
      if (searchQuery) {
        response = await axios.get(
          `http://localhost:3001/searchEstablishments?name=${searchQuery}`
        );
      } else if (viewHighRating === 1) {
        response = await axios.post(
          `http://localhost:3001/getHigRatingEstablishment`
        );
      }
      else {
        response = await axios.post(
          "http://localhost:3001/getFoodEstablishments"
        );
      }

      setEstablishments(response.data);

      // console.log('Establishment:', response.data);

    } catch (error) {
      console.error('Error fetching establishments:', error);
    }
  };

  useEffect(() => {
    fetchEstablishments();
  }, [searchQuery, viewHighRating]);



  // Function to handle the click event for adding a new establishment
  const handleAddEstablishmentClick = () => {
    setEditingEstablishment(null); // Clear the editing establishment
    setShowModal(true); // Show the modal
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };


  // Function to handle saving a new or edited establishment
  const handleSaveEstablishment = async (establishment) => {
    try {
      if (establishment.Establishment_id) {
        // If establishment ID exists, it means it's an update
        await axios.put(
          "http://localhost:3001/updateEstablishment",
          establishment,
          { withCredentials: true }
        );
        alert("Establishment updated successfully!");

      } else {
        // If no establishment ID, it's a new establishment
        await axios.post(
          "http://localhost:3001/addEstablishment",
          establishment,
          { withCredentials: true }
        );
        alert("Establishment added successfully!");
      }
      setShowModal(false); // Close the modal
      fetchEstablishments();
    } catch (error) {
      console.error("Error saving establishment:", error);
      console.error("Error saving establishment:", error);
      alert("Failed to save establishment. Please try again.");
    }
  };

  // Function to handle the deletion of an establishment
  const handleDeleteEstablishment = async (Establishment_id) => {
    try {
      console.log("Establishment id: ", Establishment_id);

      await axios.delete(
        `http://localhost:3001/deleteEstablishment`,
        {
          data: { Establishment_id },
          withCredentials: true,
        }
      );

      // alert("Establishment deleted successfully!");
      fetchEstablishments();
    } catch (error) {
      console.error('Error deleting establishment:', error);
      alert("Failed to delete establishment. Please try again.");
    }
  };

  // Function to handle the update action for a establishment
  const handleUpdateEstablishment = async (establishment) => {
    try {
      const response = await axios.get(`http://localhost:3001/getEstablishment/${establishment.Establishment_id}`);
      console.log('Fetched establishment data:', response.data); // Log the response data
      setEditingEstablishment(response.data); // Assuming response.data contains the establishment details
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching establishment details:', error);
      alert("Failed to fetch establishment details. Please try again.");
    }
  };

  // Function to handle View High Rating Establishment
  const handleViewHighRatingEstablishment = () => {
    if (viewHighRating === 0) {
      setViewHighRating(1);
      setSearchQuery('');
    } else {
      setViewHighRating(0);
      setSearchQuery('');
    }
  };


  return (
    <>
      <Navbar user={user} />
      <div className="user-feed">

        <div className="user-header">
          <h1>Food Establishments</h1>
          <h3>
            <span className="dashboard-text">Dashboard</span> &gt; Food Establishments
          </h3>
        </div>


        <div className="inventory-header">
          <div className="left-inventory-header">

            <h2>Establishments</h2>

            <div className="search-container">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name..."
              />
            </div>

            <button className="view-button" onClick={handleViewHighRatingEstablishment}>
              {viewHighRating === 0 ? "View High Rating Food Establishment" : "View All Food Establishment"}
            </button>

          </div>

          <button className="add-new-establishment-button" onClick={handleAddEstablishmentClick}>
            <span className="plus-sign">+</span> Add New Food Establishment
          </button>
        </div>

        <FoodEstablishments
          data={establishments}
          onDelete={handleDeleteEstablishment}
          onUpdate={handleUpdateEstablishment}
        />


        <Modal show={showModal} onClose={handleCloseModal}>
          <EstablishmentForm
            establishment={editingEstablishment}
            onSave={handleSaveEstablishment}
          />
        </Modal>

      </div>

    </>
  );
}

export default FoodEstablishmentsPage;
