import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ShieldCheckIcon, TruckIcon, CogIcon, CameraIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-800 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url('/img/pexels-mikebirdy-190537.jpg')` }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Inject Power, Drive Further
            </h1>
            <p className="text-xl md:text-2xl text-primary-200 mb-8 max-w-3xl mx-auto">
              Leading vehicle solutions provider in Kenya, specializing in fuel injection services,
              diesel parts, car security systems, and advanced fleet management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/services"
                className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                Our Services <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-900 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Our Core Services
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Comprehensive vehicle solutions to keep your fleet running efficiently and securely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Fuel Injection Services */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow overflow-hidden">
              <div className="relative mb-4">
                <img
                  src="/img/pexels-cottonbro-4489707.jpg"
                  alt="Professional fuel injection service - Modern diesel engine components"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-4 left-4 w-12 h-12 bg-accent-500 rounded-lg flex items-center justify-center">
                  <CogIcon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fuel Injection Services</h3>
              <p className="text-secondary-600 mb-4">
                Expert diagnostics, repair, and remanufacturing of fuel injection systems for optimal performance.
              </p>
              <Link
                to="/services"
                className="text-accent-500 hover:text-accent-600 font-semibold flex items-center"
              >
                Learn More <ArrowRightIcon className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Car Security Systems */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow overflow-hidden">
              <div className="relative mb-4">
                <img
                  src="/img/pexels-geometric-photography-186685971-13124396.jpg"
                  alt="Advanced car security system installation - Modern vehicle protection technology"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-4 left-4 w-12 h-12 bg-accent-500 rounded-lg flex items-center justify-center">
                  <ShieldCheckIcon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Car Security Systems</h3>
              <p className="text-secondary-600 mb-4">
                Advanced car alarms, immobilizers, and security systems to protect your valuable assets.
              </p>
              <Link
                to="/services"
                className="text-accent-500 hover:text-accent-600 font-semibold flex items-center"
              >
                Learn More <ArrowRightIcon className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Fleet Management */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow overflow-hidden">
              <div className="relative mb-4">
                <img
                  src="/img/pexels-athena-2996306.jpg"
                  alt="Fleet management dashboard - GPS tracking and vehicle monitoring system"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-4 left-4 w-12 h-12 bg-accent-500 rounded-lg flex items-center justify-center">
                  <TruckIcon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fleet Management</h3>
              <p className="text-secondary-600 mb-4">
                GPS tracking, real-time monitoring, and comprehensive fleet management solutions.
              </p>
              <Link
                to="/fleet-portal"
                className="text-accent-500 hover:text-accent-600 font-semibold flex items-center"
              >
                Login Portal <ArrowRightIcon className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-secondary-50 rounded-lg p-6 text-center">
              <img
                src="/img/pexels-introspectivedsgn-9966011.jpg"
                alt="David Kimani - Fleet Manager at Kenya Logistics Ltd"
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <StarSolid key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-secondary-600 mb-4 italic">
                "Megastrength transformed our fleet operations. Their GPS tracking system helped us reduce fuel costs by 25% and improve delivery times significantly."
              </p>
              <p className="font-semibold text-secondary-900">David Kimani</p>
              <p className="text-sm text-secondary-500">Fleet Manager, Kenya Logistics Ltd</p>
            </div>

            <div className="bg-secondary-50 rounded-lg p-6 text-center">
              <img
                src="/img/pexels-khanniru-8684217.jpg"
                alt="Sarah Wanjiku - Car Owner and Business Professional"
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <StarSolid key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-secondary-600 mb-4 italic">
                "The fuel injection service was exceptional. My car runs smoother than ever, and the team's expertise is unmatched in Nairobi."
              </p>
              <p className="font-semibold text-secondary-900">Sarah Wanjiku</p>
              <p className="text-sm text-secondary-500">Business Professional</p>
            </div>

            <div className="bg-secondary-50 rounded-lg p-6 text-center">
              <img
                src="/img/pexels-athena-2996306.jpg"
                alt="Michael Oduya - Security Consultant"
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <StarSolid key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-secondary-600 mb-4 italic">
                "Installed their premium car alarm system. The advanced features and professional installation give me complete peace of mind."
              </p>
              <p className="font-semibold text-secondary-900">Michael Oduya</p>
              <p className="text-sm text-secondary-500">Security Consultant</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Enhance Your Vehicle's Performance?
          </h2>
          <p className="text-xl text-secondary-200 mb-8 max-w-2xl mx-auto">
            Contact us today for expert consultation and professional service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Book Appointment
            </Link>
            <Link
              to="/ecommerce"
              className="border-2 border-white text-white hover:bg-white hover:text-secondary-900 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Shop Parts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
