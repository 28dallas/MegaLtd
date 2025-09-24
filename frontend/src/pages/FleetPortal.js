import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TruckIcon, 
  MapIcon, 
  ChartBarIcon, 
  ShieldCheckIcon,
  EyeIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';

const FleetPortal = () => {
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Login functionality will be connected to your GPS tracking backend.');
    }, 2000);
  };

  const features = [
    {
      icon: MapIcon,
      title: 'Real-time Tracking',
      description: 'Monitor your entire fleet in real-time with live GPS updates'
    },
    {
      icon: ChartBarIcon,
      title: 'Analytics Dashboard',
      description: 'Comprehensive reports and analytics for fleet performance'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Security Monitoring',
      description: 'Advanced security features and theft prevention alerts'
    },
    {
      icon: EyeIcon,
      title: 'Driver Monitoring',
      description: 'Track driver behavior and ensure safety compliance'
    }
  ];

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-800 text-white py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url('/img/pexels-athena-2996306.jpg')` }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center">
              <TruckIcon className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Fleet Tracking Portal</h1>
          <p className="text-xl md:text-2xl text-primary-200 max-w-3xl mx-auto">
            Advanced GPS tracking and fleet management system for complete visibility and control.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Login Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-2">Client Login</h2>
              <p className="text-secondary-600">Access your fleet tracking dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-secondary-700 mb-2">
                  Username or Email
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={loginForm.username}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  placeholder="Enter your username or email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-secondary-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={loginForm.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-accent-500 focus:ring-accent-500 border-secondary-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-secondary-700">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm text-accent-500 hover:text-accent-600">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-accent-300 text-white py-2 px-4 rounded-md font-semibold transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    <LockClosedIcon className="w-5 h-5 mr-2" />
                    Sign In
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-secondary-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-accent-500 hover:text-accent-600 font-semibold">
                  Contact us to get started
                </Link>
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">Portal Features</h2>
              <div className="space-y-6">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-accent-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-secondary-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-3">Need Help?</h3>
              <p className="text-secondary-600 mb-4">
                Our support team is available 24/7 to assist with your fleet tracking needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="tel:+254700000000" 
                  className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-md font-semibold transition-colors text-center"
                >
                  Call Support
                </a>
                <Link 
                  to="/contact" 
                  className="border border-accent-500 text-accent-500 hover:bg-accent-50 px-4 py-2 rounded-md font-semibold transition-colors text-center"
                >
                  Contact Form
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
              Dashboard Preview
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Get a glimpse of our powerful fleet management interface.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/img/pexels-tima-miroshnichenko-6169868.jpg"
                alt="Fleet tracking dashboard interface showing real-time vehicle locations and analytics"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-secondary-900">Real-time Fleet Visibility</h3>
              <p className="text-secondary-600">
                Our dashboard provides comprehensive insights into your fleet operations with live tracking,
                performance metrics, and detailed analytics. Monitor vehicle locations, driver behavior,
                fuel consumption, and maintenance schedules all in one place.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center">
                    <MapIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-secondary-700">Live GPS Tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center">
                    <ChartBarIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-secondary-700">Performance Analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center">
                    <ShieldCheckIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-secondary-700">Security Alerts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center">
                    <EyeIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-secondary-700">Driver Monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
            See the Portal in Action
          </h2>
          <p className="text-lg text-secondary-600 mb-8 max-w-2xl mx-auto">
            Request a demo to see how our fleet tracking portal can transform your business operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Request Demo
            </Link>
            <Link
              to="/services"
              className="border-2 border-accent-500 text-accent-500 hover:bg-accent-50 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FleetPortal;
