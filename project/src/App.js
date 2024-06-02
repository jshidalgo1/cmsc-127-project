import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage.js';
import SignUpPage from './Pages/SignUpPage.js';
import UserFeedPage from './Pages/UserFeedPage.js';
import FoodEstablishmentsPage from './Pages/FoodEstablishmentsPage.js';
import FoodEstablishmentPage from './Pages/FoodEstablishmentPage.js';
import FoodItemsPage from './Pages/FoodItemsPage.js';
import UserReviewsPage from './Pages/UserReviewsPage.js';
import UserProfilePage from './Pages/UserProfilePage.js';
import DatabaseTablePage from './Pages/DatabaseTablePage.js';
import UserContext from './Routes/UserContext.js';

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/user-feed" element={<UserFeedPage />} />
          <Route path="/food-establishments" element={<FoodEstablishmentsPage />} />
          <Route path="/food-establishment/:id" element={<FoodEstablishmentPage />} />
          <Route path="/food-items" element={<FoodItemsPage />} />
          <Route path="/user-reviews" element={<UserReviewsPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/tables" element={<DatabaseTablePage />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;