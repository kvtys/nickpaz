// File: src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import TimelinePage from './pages/TimelinePage';
import ContactPage from './pages/ContactPage';
import Navbar from './components/Navbar';
import React from 'react';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;