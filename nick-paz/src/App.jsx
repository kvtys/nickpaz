// File: src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import TimelinePage from './pages/TimelinePage';
import ContemporaryCritiquePage from './pages/ContemporaryCritiquePage';
import NewArtFormsPage from './pages/NewArtFormsPage';
import ContactPage from './pages/ContactPage';

import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nickpaz" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/contemporarycritique" element={<ContemporaryCritiquePage />} />
          <Route path="/newartforms" element={<NewArtFormsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
