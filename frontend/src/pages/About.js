import React from 'react';
import { CheckCircleIcon, StarIcon } from '@heroicons/react/24/solid';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const About = () => {
  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-800 text-white py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url('/img/pexels-cottonbro-4480453.jpg')` }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Megastrength Limited</h1>
          <p className="text-xl md:text-2xl text-primary-200 max-w-3xl mx-auto">
            Pioneering vehicle solutions in Kenya with expertise in diesel systems and automotive security.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">Our Story</h2>
              <p className="text-lg text-secondary-600 mb-6">
                Founded with a vision to revolutionize vehicle maintenance and security in Kenya,
                Megastrength Limited has grown to become a trusted partner for businesses and individuals
                seeking reliable automotive solutions.
              </p>
              <p className="text-lg text-secondary-600 mb-6">
                Our journey began with a focus on fuel injection systems, where we quickly established
                ourselves as experts in diagnostics, repair, and performance optimization. Today, we offer
                comprehensive services ranging from advanced security systems to cutting-edge fleet management solutions.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-5 h-5 text-accent-500" />
                  <span className="text-secondary-700">10+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-5 h-5 text-accent-500" />
                  <span className="text-secondary-700">500+ Happy Clients</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-5 h-5 text-accent-500" />
                  <span className="text-secondary-700">24/7 Support</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/img/pexels-pixabay-210881.jpg"
                alt="Modern automotive workshop - Professional technicians working on vehicle diagnostics and repairs"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg p-4 shadow-lg">
                <h3 className="text-lg font-bold text-secondary-900 mb-2">Our Mission</h3>
                <p className="text-sm text-secondary-600">
                  To provide innovative, reliable, and cost-effective vehicle solutions that enhance
                  performance, security, and efficiency for our clients across Kenya.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision with Team */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="/img/pexels-introspectivedsgn-9966011.jpg"
                alt="Professional team of automotive experts - Megastrength technical staff"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg p-4 shadow-lg">
                <h3 className="text-lg font-bold text-secondary-900 mb-2">Our Vision</h3>
                <p className="text-sm text-secondary-600">
                  To be the leading automotive technology company in East Africa, setting standards
                  for excellence in vehicle maintenance, security, and fleet management.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">Meet Our Expert Team</h2>
              <p className="text-lg text-secondary-600 mb-6">
                Our certified technicians and engineers bring decades of combined experience in automotive systems,
                security technology, and fleet management. Each team member is continuously trained on the latest
                technologies to ensure we deliver cutting-edge solutions.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <img
                    src="/img/pexels-khanniru-8684217.jpg"
                    alt="Lead Technician - Specialized in fuel injection systems and diesel engines"
                    className="w-20 h-20 rounded-full mx-auto mb-2 object-cover"
                  />
                  <p className="font-semibold text-secondary-900">John Mwangi</p>
                  <p className="text-sm text-secondary-500">Lead Technician</p>
                </div>
                <div className="text-center">
                  <img
                    src="/img/pexels-athena-2996306.jpg"
                    alt="Security Systems Specialist - Expert in automotive security and GPS tracking"
                    className="w-20 h-20 rounded-full mx-auto mb-2 object-cover"
                  />
                  <p className="font-semibold text-secondary-900">Mary Achieng</p>
                  <p className="text-sm text-secondary-500">Security Specialist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">Areas of Expertise</h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Our specialized knowledge and cutting-edge technology ensure superior results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Diesel Systems</h3>
              <p className="text-secondary-600">
                Advanced fuel injection diagnostics and optimization for maximum efficiency.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Car Security</h3>
              <p className="text-secondary-600">
                State-of-the-art alarm systems and anti-theft solutions for complete protection.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fleet Tracking</h3>
              <p className="text-secondary-600">
                Real-time GPS monitoring and comprehensive fleet management platforms.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Audio Systems</h3>
              <p className="text-secondary-600">
                Premium Android radios and car stereo systems for enhanced driving experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">Why Choose Megastrength?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Technicians</h3>
              <p className="text-secondary-600">
                Certified professionals with extensive experience in automotive systems and security.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Guarantee</h3>
              <p className="text-secondary-600">
                All services and products come with comprehensive warranties and quality assurance.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
              <p className="text-secondary-600">
                Round-the-clock customer support and emergency services for your peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
