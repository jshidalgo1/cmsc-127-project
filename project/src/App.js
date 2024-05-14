import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsersPage from './Pages/UsersPage';

function App() {
  return (
    <Router>
      <Routes>
        {<Route path="/" element={<UsersPage />} />}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;