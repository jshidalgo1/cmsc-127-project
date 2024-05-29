import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage.js';
import SignUpPage from './Pages/SignUpPage.js';
import UserFeedPage from './Pages/UserFeedPage.js';
import FoodEstablishmentsPage from './Pages/FoodEstablishmentsPage.js';
import DatabaseTablePage from './Pages/DatabaseTablePage.js';

function App() {
  return (
    <Router>
      <Routes>
        {<Route path="/" element={<HomePage />} />}
        {<Route path="/signup" element={<SignUpPage />} />}

        <Route path="/tables" element={<DatabaseTablePage />} />
        <Route path="/user-feed" element={<UserFeedPage />} />
        <Route path="/food-establishments" element={<FoodEstablishmentsPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;