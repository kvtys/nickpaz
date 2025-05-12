// File: src/components/Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed w-full z-50 p-4">
      <div className="flex justify-end">
        {/* Hamburger Button */}
        <button 
          onClick={toggleMenu} 
          className="z-1000 relative w-10 h-10 pr-10 flex flex-col justify-center items-center focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <span 
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-out ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
          ></span>
          <span 
            className={`block w-6 h-0.5 bg-white mt-1 transition-all duration-300 ease-out ${isOpen ? 'opacity-0' : ''}`}
          ></span>
          <span 
            className={`block w-6 h-0.5 bg-white mt-1 transition-all duration-300 ease-out ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed top-0 right-0 h-screen w-64 bg-black bg-opacity-95 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col justify-center items-center`}
      >
        <div className="flex flex-col space-y-8 text-xl">
          <Link 
            to="/" 
            className="hover:text-gray-400 transition-colors tracking-widest"
            onClick={() => setIsOpen(false)}
          >
            HOME
          </Link>
          <Link 
            to="/portfolio" 
            className="hover:text-gray-400 transition-colors tracking-widest"
            onClick={() => setIsOpen(false)}
          >
            PORTFOLIO
          </Link>
          <Link 
            to="/timeline" 
            className="hover:text-gray-400 transition-colors tracking-widest"
            onClick={() => setIsOpen(false)}
          >
            TIMELINE
          </Link>
          <Link 
            to="/contact" 
            className="hover:text-gray-400 transition-colors tracking-widest"
            onClick={() => setIsOpen(false)}
          >
            CONTACT
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;