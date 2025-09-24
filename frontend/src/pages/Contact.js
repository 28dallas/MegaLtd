import React, { useState } from 'react';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        subject: '',
        message: ''
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: 'Phone',
      details: ['+254 700 000 000', '+254 733 000 000'],
      description: 'Call us for immediate assistance'
    },
    {
      icon: EnvelopeIcon,
      title: 'Email',
      details: ['info@megastrength.co.ke', 'support@megastrength.co.ke'],
      description: 'Send us an email anytime'
    },
    {
  icon: MapPinIcon,
      title: 'Location',
      details: ['Nairobi CBD', 'Industrial Area'],
      description: 'Visit our offices'
    },
    {
      icon: ClockIcon,
      title: 'Business Hours',
      details: ['Mon - Fri: 8:00 AM - 6:00 PM', 'Sat: 8:00 AM - 4:00 PM'],
      description: 'When we\'re open'
    }
  ];

  const services = [
    'Fuel Injection Services',
    'Car Alarms & Security Systems',
    'Android Radios & Car Stereos',
    'Vehicle Tracking & Fleet Management',
    '4G Live Dash Camera Solutions',
    'Diesel Parts Supply',
    'General Inquiry'
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center py-16">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircleIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">Message Sent!</h2>
          <p className="text-secondary-600 mb-6">
            Thank you for contacting us. We'll get back to you within 24 hours.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-800 text-white py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url('/img/pexels-pixabay-210881.jpg')` }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl text-primary-200 max-w-3xl mx-auto">
            Get in touch with our expert team for all your vehicle solution needs.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-secondary-900 mb-8">Get In Touch</h2>
            
            <div className="space-y-8">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                        {info.title}
                      </h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-secondary-600 mb-1">
                          {detail}
                        </p>
                      ))}
                      <p className="text-sm text-secondary-500 mt-2">
                        {info.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Emergency Contact */}
            <div className="mt-12 p-6 bg-red-50 rounded-lg border border-red-200">
              <h3 className="text-lg font-semibold text-red-900 mb-3">Emergency Service</h3>
              <p className="text-red-700 mb-4">
                Need urgent assistance? We're available 24/7 for emergency repairs and security issues.
              </p>
              <a 
                href="tel:+254700000000" 
                className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                <PhoneIcon className="w-5 h-5 mr-2" />
                Emergency Line
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
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
                      value={formData.email}
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
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-secondary-700 mb-2">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                    >
                      <option value="">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    required
                    className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-accent-300 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending Message...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">Our Locations</h2>
            <p className="text-lg text-secondary-600">
              Visit us at our convenient locations across Nairobi.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Main Office */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="/img/pexels-pixabay-159293.jpg"
                alt="Megastrength Limited Main Office - Professional business environment in Nairobi CBD"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-secondary-900 mb-4">Main Office - Nairobi CBD</h3>
                <div className="space-y-2 text-sm text-secondary-600 mb-4">
                  <p><strong>Address:</strong> Kimathi Street, Nairobi CBD, Kenya</p>
                  <p><strong>Phone:</strong> +254 700 000 000</p>
                  <p><strong>Hours:</strong> Mon-Fri: 8:00 AM - 6:00 PM</p>
                </div>
                <p className="text-secondary-600 text-sm">
                  Our main office provides consultation services, customer support, and administrative functions.
                  Visit us for detailed project discussions and professional consultations.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="/img/pexels-pixabay-210881.jpg"
                alt="Megastrength Workshop - State-of-the-art automotive service facility in Industrial Area"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-secondary-900 mb-4">Workshop - Industrial Area</h3>
                <div className="space-y-2 text-sm text-secondary-600 mb-4">
                  <p><strong>Address:</strong> Industrial Area, Nairobi, Kenya</p>
                  <p><strong>Phone:</strong> +254 733 000 000</p>
                  <p><strong>Hours:</strong> Mon-Sat: 8:00 AM - 6:00 PM</p>
                </div>
                <p className="text-secondary-600 text-sm">
                  Our fully-equipped workshop handles all technical installations, diagnostics, and repairs.
                  Features modern equipment and certified technicians for all your automotive needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
