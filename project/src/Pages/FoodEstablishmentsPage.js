import React, { useState } from "react";
import Navbar from "./components/Navbar.js";
import FoodEstablishments from "./components/FoodEstablishments.js";
import EstablishmentForm from "./components/EstablishmentForm.js";
import Modal from "./components/Modal.js";
import axios from "axios";

function FoodEstablishmentsPage() {
  const [user] = useState(null); // Assuming user state is not being used for now

  const [showModal, setShowModal] = useState(false);
  const [editingEstablishment, setEditingEstablishment] = useState(null);

  // Function to handle the click event for adding a new establishment
  const handleAddEstablishmentClick = () => {
    setEditingEstablishment(null); // Clear the editing establishment
    setShowModal(true); // Show the modal
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // TODO: Function to handle saving a establishment (both add and update)
  // Function to handle saving a new or edited establishment
  const handleSaveEstablishment = async (establishment) => {
    try {
      if (establishment.Establishment_id) {
        // If establishment ID exists, it means it's an update
        // await axios.put(
        //     `http://localhost:3001/updateEstablishment/${establishment.Establishment_id}`,
        //     establishment,
        //     { withCredentials: true }
        // );
        // alert("Establishment updated successfully!");
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
    } catch (error) {
      console.error("Error saving establishment:", error);
      alert("Failed to save establishment. Please try again.");
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
          <h2>Establishments</h2>
          <button className="add-new-establishment-button" onClick={handleAddEstablishmentClick}>
            <span className="plus-sign">+</span> Add New Food Establishment
          </button>
        </div>


        {/* <h2>Establishments</h2> */}
        <FoodEstablishments /> {/* Pass FOOD_ESTABLISHMENT data here */}


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
