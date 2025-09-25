import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheckIcon,
  TruckIcon,
  CameraIcon,
  RadioIcon,
  MapIcon,
  PhoneIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

import { CogIcon } from '@heroicons/react/24/outline';

const Services = () => {
  const [bookingForm, setBookingForm] = useState({
    service: '',
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert('Booking request submitted! We will contact you soon.');
    setBookingForm({
      service: '',
      name: '',
      email: '',
      phone: '',
      vehicle: '',
      message: ''
    });
  };

  const services = [
    {
      icon: CogIcon,
      title: 'Diesel Injection Services',
      description: 'Complete diesel injection system diagnostics, repair, cleaning, and optimization.',
      features: ['Injector testing and calibration', 'Diesel system cleaning', 'Performance optimization', 'Warranty on all work'],
      
    },
    {
      icon: ShieldCheckIcon,
      title: 'Car Alarms & Security Systems',
      description: 'Advanced security solutions including alarms, immobilizers, and tracking systems.',
      features: ['Latest alarm technology', 'GPS tracking integration', 'Mobile app control', 'Professional installation'],
     
    },
    {
      icon: RadioIcon,
      title: 'Android Radios & Car Stereos',
      description: 'Premium audio systems with Android integration for entertainment and navigation.',
      features: ['Large touchscreen displays', 'Android Auto/Apple CarPlay', 'GPS navigation', 'Bluetooth connectivity'],
     
    },
    {
      icon: TruckIcon,
      title: 'Vehicle Tracking & Fleet Management',
      description: 'Comprehensive fleet tracking solutions with real-time monitoring and reporting.',
      features: ['Real-time GPS tracking', 'Fleet analytics', 'Driver behavior monitoring', 'Custom reporting'],
     
    },
    {
      icon: CameraIcon,
      title: '4G Live Dash Camera Solutions',
      description: 'High-definition dash cameras with live streaming and cloud storage.',
      features: ['4G connectivity', 'Live video streaming', 'Cloud storage', 'Accident recording'],
     
    },
    {
      icon: MapIcon,
      title: 'Diesel Parts Supply',
      description: 'Genuine diesel parts and components for all major vehicle brands.',
      features: ['Original equipment quality', 'Wide range of parts', 'Fast delivery', 'Technical support'],
      price: 'Varies by part'
    }
  ];

  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl text-primary-200 max-w-3xl mx-auto">
            Comprehensive vehicle solutions to enhance performance, security, and efficiency.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const serviceImages = {
                'Diesel Injection Services': '/img/2/actros.jpg',
                'Car Alarms & Security Systems': '/img/download.png',
                'Android Radios & Car Stereos': '/img/pexels-maksgelatin-4824424.jpg',
                'Vehicle Tracking & Fleet Management': '/img/pexels-athena-2996306.jpg',
                '4G Live Dash Camera Solutions': '/img/pexels-tima-miroshnichenko-6169868.jpg',
                'Diesel Parts Supply': '/img/pexels-cottonbro-4489715.jpg'
              };

              return (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-secondary-200 overflow-hidden">
                  <div className="relative mb-4">
                    <img
                      src={serviceImages[service.title] || '/img/pexels-pixabay-159293.jpg'}
                      alt={`${service.title} - Professional automotive service`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute top-4 left-4 w-12 h-12 bg-accent-500 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-secondary-600 mb-4">{service.description}</p>
                  <ul className="text-sm text-secondary-600 mb-4 space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-accent-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-primary-600">{service.price}</span>
                    <Link
                      to="/contact"
                      className="text-accent-500 hover:text-accent-600 font-semibold"
                    >
                      Book Now →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">Book Your Service</h2>
            <p className="text-lg text-secondary-600">
              Schedule an appointment for diagnostics, installation, or consultation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-secondary-700 mb-2">
                  Service Required *
                </label>
                <select
                  id="service"
                  name="service"
                  value={bookingForm.service}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                >
                  <option value="">Select a service</option>
                  {services.map((service, index) => (
                    <option key={index} value={service.title}>{service.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={bookingForm.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={bookingForm.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={bookingForm.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="vehicle" className="block text-sm font-medium text-secondary-700 mb-2">
                  Vehicle Make & Model
                </label>
                <input
                  type="text"
                  id="vehicle"
                  name="vehicle"
                  value={bookingForm.vehicle}
                  onChange={handleInputChange}
                  placeholder="e.g., Toyota Prado 2018"
                  className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={bookingForm.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe your requirements or any specific issues..."
                  className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                ></textarea>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                type="submit"
                className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center mx-auto"
              >
                <CalendarIcon className="w-5 h-5 mr-2" />
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Emergency Service?</h2>
          <p className="text-xl text-primary-200 mb-8">
            We're available 24/7 for urgent repairs and security system issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+254700000000" 
              className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              <PhoneIcon className="w-5 h-5 mr-2" />
              Call Now: +254 700 000 000
            </a>
            <Link 
              to="/contact" 
              className="border-2 border-white text-white hover:bg-white hover:text-primary-900 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Emergency Contact Form
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
