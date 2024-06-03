import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar.js";
import FoodEstablishments from "./components/FoodEstablishments.js";
import FoodItems from "./components/FoodItems.js";
import FoodItemForm from "./components/FoodItemForm.js";
import Modal from "./components/Modal.js";
import axios from "axios";
import { useParams } from 'react-router-dom';

function FoodEstablishmentPage() {
  const [user] = useState(null);
  const { id } = useParams();
  console.log('Fetched ID:', id);

  const [establishment, setEstablishment] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const fetchEstablishmentAndItems = async () => {
    try {
      const establishmentResponse = await axios.get(`http://localhost:3001/getEstablishment/${id}`);
      setEstablishment([establishmentResponse.data]);
      console.log('Fetched Establishment:', establishmentResponse.data);

      const foodItemsResponse = await axios.get(`http://localhost:3001/getFoodItemsByEstablishmentId/${id}`);
      console.log('Fetched Food Items:', foodItemsResponse.data);

      setFoodItems(foodItemsResponse.data);
    } catch (error) {
      console.error('Error fetching establishment details or food items:', error);
    }
  };


  useEffect(() => {
    fetchEstablishmentAndItems();
  }, [id]);

  const handleAddFoodItemClick = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveFoodItem = async (foodItem) => {
    try {
      if (foodItem.Item_id) {
        await axios.put(
          "http://localhost:3001/updateFoodItem",
          // { foodItem },
          { ...foodItem, establishmentId: id },
          { withCredentials: true }
        );
        alert("Food item updated successfully!");
      } else {
        await axios.post(
          "http://localhost:3001/addFoodItemFromEstablishment",
          { ...foodItem, establishmentId: id },
          { withCredentials: true }
        );
        alert("Food item added successfully!");
      }
      setShowModal(false);
      fetchEstablishmentAndItems();
    } catch (error) {
      console.error("Error saving food item:", error);
      alert("Failed to save food item. Please try again.");
    }
  };

  const handleDeleteFoodItem = async (itemId) => {
    try {
      await axios.delete(
        `http://localhost:3001/deleteFoodItem`,
        {
          data: { itemId },
          withCredentials: true,
        }
      );
      fetchEstablishmentAndItems();
    } catch (error) {
      console.error('Error deleting food item:', error);
      alert("Failed to delete food item. Please try again.");
    }
  };

  const handleUpdateFoodItem = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  return (
    <>
      <Navbar user={user} />
      <div className="user-feed">
        <div className="user-header">
          <h1>{establishment.length > 0 ? establishment[0].Name : "Loading..."}</h1>
          {establishment.length > 0 && (
            <h3>
              <span className="dashboard-text">Dashboard &gt; Food Establishments </span> &gt; {establishment[0].Name}
            </h3>
          )}
        </div>

        <FoodEstablishments data={establishment} noAction={1} />

        <div className="inventory-header">
          <div className="left-inventory-header">
            <h2>{establishment.length > 0 ? `${establishment[0].Name}'s Food Items` : "Food Items"}</h2>
            <div className="search-container">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name..."
              />
            </div>
          </div>
          <button className="add-new-establishment-button" onClick={handleAddFoodItemClick}>
            <span className="plus-sign">+</span> Add New Food Item
          </button>
        </div>

        <FoodItems
          data={foodItems}
          onDelete={handleDeleteFoodItem}
          onUpdate={handleUpdateFoodItem}
        />

      </div>

      <Modal show={showModal} onClose={handleCloseModal}>
        <FoodItemForm
          estID={id}
          items={editingItem}
          onSave={handleSaveFoodItem}
        />
      </Modal>
    </>
  );
}

export default FoodEstablishmentPage;
