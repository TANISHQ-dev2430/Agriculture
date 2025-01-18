import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/HomePage/Home.jsx';
import LoginPage from './Pages/LoginPage/LoginPage.jsx';
import ConsumerPage from './Pages/ConsumerPage/ConsumerPage.jsx';
import FarmerPage from './Pages/FarmerPage/FarmerPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/consumer" element={<ConsumerPage />} />
        <Route path="/farmer" element={<FarmerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
