import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed w-full z-40 p-4">
      <div className="flex justify-end">
        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="z-50 relative w-10 h-10 flex flex-col justify-center items-center focus:outline-none"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-out ${isOpen ? 'rotate-45 translate-y-1' : ''}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white mt-1 transition-all duration-300 ease-out ${isOpen ? 'opacity-0' : ''}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white mt-1 transition-all duration-300 ease-out ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}
          ></span>
        </button>
      </div>

      {/* Overlay for closing the menu when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-full sm:w-64 max-w-full bg-black bg-opacity-95 transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col justify-center items-center overflow-y-auto`}
      >
        <div className="flex flex-col space-y-8 text-xl px-4 py-8 w-full text-center">
          <Link
            to="/"
            className="hover:text-gray-400 transition-colors tracking-widest py-2"
            onClick={() => setIsOpen(false)}
          >
            HOME
          </Link>
          <Link
            to="/portfolio"
            className="hover:text-gray-400 transition-colors tracking-widest py-2"
            onClick={() => setIsOpen(false)}
          >
            PORTFOLIO
          </Link>
          <Link
            to="/contemporarycritique"
            className="hover:text-gray-400 transition-colors tracking-widest py-2 break-words"
            onClick={() => setIsOpen(false)}
          >
            CONTEMPORARY CRITIQUE
          </Link>
          <Link
            to="/newartforms"
            className="hover:text-gray-400 transition-colors tracking-widest py-2 break-words"
            onClick={() => setIsOpen(false)}
          >
            NEW ART FORMS
          </Link>
          <Link
            to="/timeline"
            className="hover:text-gray-400 transition-colors tracking-widest py-2"
            onClick={() => setIsOpen(false)}
          >
            CAPSTONE BLOG
          </Link>
          <Link
            to="/contact"
            className="hover:text-gray-400 transition-colors tracking-widest py-2"
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