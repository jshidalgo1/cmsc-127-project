import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar.js";
import FoodEstablishments from "./components/FoodEstablishments.js";
import FoodItemForm from "./components/FoodItemForm.js";
import Modal from "./components/Modal.js";
import axios from "axios";
import { useParams } from 'react-router-dom';

function FoodEstablishmentPage() {
  const [user] = useState(null);
  const { id } = useParams();
  console.log('Fetched ID:', id); // Log the ID to ensure it's correct

  const [establishment, setEstablishment] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const fetchEstablishmentAndItems = async () => {
    try {
      const establishmentResponse = await axios.get(`http://localhost:3001/getEstablishment/${id}`);
      setEstablishment([establishmentResponse.data]);
      console.log('Fetched Establishment:', establishmentResponse.data); // Log the response data
      console.log('Length Establishment:', establishmentResponse.data.length);

      const foodItemsResponse = await axios.get(`http://localhost:3001/getFoodItemsByEstablishmentId/${id}`);
      setFoodItems(foodItemsResponse.data);
      console.log('Fetched Food Items:', foodItemsResponse.data); // Log the food items data
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
      if (foodItem.Id) {
        await axios.put(
          "http://localhost:3001/updateFoodItem",
          { ...foodItem, establishmentId: id },
          { withCredentials: true }
        );
        alert("Food item updated successfully!");
      } else {
        await axios.post(
          "http://localhost:3001/addFoodItem",
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

  const filteredFoodItems = foodItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        <FoodEstablishments
          data={establishment}
          foodItems={filteredFoodItems}
          onDelete={handleDeleteFoodItem}
          onUpdate={handleUpdateFoodItem}
        />

        <div className="inventory-header">
          <div className="left-inventory-header">
            <h2>Food Items</h2>
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
      </div>
      <Modal show={showModal} onClose={handleCloseModal}>
        <FoodItemForm foodItem={editingItem} onSave={handleSaveFoodItem} />
      </Modal>
    </>
  );
}

export default FoodEstablishmentPage;
