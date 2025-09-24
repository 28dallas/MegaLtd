import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Megastrength</h3>
                <p className="text-sm text-secondary-300">Limited</p>
              </div>
            </div>
            <p className="text-secondary-300 mb-4">
              Leading vehicle solutions provider in Kenya, specializing in fuel injection services, 
              diesel parts, car security systems, and fleet management.
            </p>
            <p className="text-sm text-secondary-400">
              "Inject Power, Drive Further"
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-secondary-300 hover:text-accent-300 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-secondary-300 hover:text-accent-300 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-secondary-300 hover:text-accent-300 transition-colors">Services</Link></li>
              <li><Link to="/shop" className="text-secondary-300 hover:text-accent-300 transition-colors">Shop</Link></li>
              <li><Link to="/blog" className="text-secondary-300 hover:text-accent-300 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <PhoneIcon className="w-5 h-5 text-accent-500" />
                <span className="text-secondary-300">+254 700 000 000</span>
              </div>
              <div className="flex items-center space-x-2">
                <EnvelopeIcon className="w-5 h-5 text-accent-500" />
                <span className="text-secondary-300">info@megastrength.co.ke</span>
              </div>
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="w-5 h-5 text-accent-500" />
                <span className="text-secondary-300">Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-800 mt-8 pt-8 text-center">
          <p className="text-secondary-400">
            © 2024 Megastrength Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
