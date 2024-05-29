import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage.js';
import SignUpPage from './Pages/SignUpPage.js';
import UserFeedPage from './Pages/UserFeedPage.js';

function App() {
  return (
    <Router>
      <Routes>
        {<Route path="/" element={<HomePage />} />}
        {<Route path="/signup" element={<SignUpPage />} />}

        <Route path="/user-feed" element={<UserFeedPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;