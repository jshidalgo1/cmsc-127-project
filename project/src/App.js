import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from './Pages/SignInPage.js';
import SignUpPage from './Pages/SignUpPage.js';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<SignInPage />} />
        <Route path="/SignUpPage" element={<SignUpPage />} /> */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;