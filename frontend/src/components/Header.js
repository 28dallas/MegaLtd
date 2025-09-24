import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-primary-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={require('../img/Untitled design.png')}
              alt="Megastrength Logo"
              className="w-12 h-12 object-contain rounded-lg bg-white p-1"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-accent-300 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-accent-300 transition-colors">About</Link>
            <Link to="/services" className="hover:text-accent-300 transition-colors">Services</Link>
            <Link to="/shop" className="hover:text-accent-300 transition-colors">Shop</Link>
            <Link to="/fleet" className="hover:text-accent-300 transition-colors">Fleet Portal</Link>
            <Link to="/blog" className="hover:text-accent-300 transition-colors">Blog</Link>
            <Link to="/contact" className="hover:text-accent-300 transition-colors">Contact</Link>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <PhoneIcon className="w-4 h-4" />
              <span>+254 700 000 000</span>
            </div>
            <div className="flex items-center space-x-1">
              <EnvelopeIcon className="w-4 h-4" />
              <span>info@megastrength.co.ke</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md hover:bg-primary-800"
          >
            {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-primary-800">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="hover:text-accent-300 transition-colors" onClick={toggleMenu}>Home</Link>
              <Link to="/about" className="hover:text-accent-300 transition-colors" onClick={toggleMenu}>About</Link>
              <Link to="/services" className="hover:text-accent-300 transition-colors" onClick={toggleMenu}>Services</Link>
              <Link to="/shop" className="hover:text-accent-300 transition-colors" onClick={toggleMenu}>Shop</Link>
              <Link to="/fleet" className="hover:text-accent-300 transition-colors" onClick={toggleMenu}>Fleet Portal</Link>
              <Link to="/blog" className="hover:text-accent-300 transition-colors" onClick={toggleMenu}>Blog</Link>
              <Link to="/contact" className="hover:text-accent-300 transition-colors" onClick={toggleMenu}>Contact</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
