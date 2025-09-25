import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCartIcon,
  StarIcon,
  TruckIcon,
  ShieldCheckIcon,
  PhoneIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState('featured');

  const featuredProducts = [
    {
      id: 1,
      name: 'Premium Diesel Injector Kit',
      price: 12500,
      originalPrice: 15000,
      rating: 4.8,
      reviews: 34,
      image: '/img/2/actros.jpg',
      description: 'Complete diesel injector kit with all necessary components',
      category: 'injectors',
      inStock: true
    },
    {
      id: 2,
      name: 'Advanced Car Security System',
      price: 22000,
      originalPrice: 28000,
      rating: 4.9,
      reviews: 56,
      image: '/img/pexels-geometric-photography-186685971-13124396.jpg',
      description: 'Comprehensive security system with GPS tracking',
      category: 'security',
      inStock: true
    },
    {
      id: 3,
      name: 'Android Radio 12.3" Display',
      price: 45000,
      originalPrice: 52000,
      rating: 4.7,
      reviews: 23,
      image: '/img/pexels-maksgelatin-4824424.jpg',
      description: 'Large touchscreen with wireless connectivity',
      category: 'entertainment',
      inStock: false
    },
    {
      id: 4,
      name: 'Cloud tracking',
      price: 8500,
      originalPrice: 12000,
      rating: 4.6,
      reviews: 89,
      image: '/img/pexels-athena-2996306.jpg',
      description: 'Real-time cloud tracking with mobile app integration',
      category: 'tracking',
      inStock: true
    }
  ];

  const categories = [
    { id: 'featured', name: 'Featured Products', icon: '⭐' },
    { id: 'injectors', name: 'Diesel Injectors', icon: '⚙️' },
    { id: 'security', name: 'Security Systems', icon: '🔒' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎵' },
    { id: 'tracking', name: 'Cloud Tracking', icon: '📍' }
  ];

  const filteredProducts = selectedCategory === 'featured'
    ? featuredProducts
    : featuredProducts.filter(product => product.category === selectedCategory);

  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-800 text-white py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url('/img/pexels-cottonbro-4480453.jpg')` }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Premium Auto Parts Store</h1>
          <p className="text-xl md:text-2xl text-primary-200 max-w-3xl mx-auto mb-8">
            Discover our extensive collection of high-quality automotive parts and accessories.
          </p>
          <Link
            to="/ecommerce"
            className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
          >
            Shop All Products <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'bg-accent-500 text-white shadow-lg'
                    : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              {selectedCategory === 'featured' ? 'Featured Products' : `${categories.find(c => c.id === selectedCategory)?.name}`}
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Hand-picked premium automotive parts and accessories for your vehicle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {!product.inStock && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">
                      Out of Stock
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white rounded-full p-2 shadow-md">
                      <ShoppingCartIcon className="w-5 h-5 text-accent-500" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-secondary-900">{product.name}</h3>
                  <p className="text-secondary-600 text-sm mb-3">{product.description}</p>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarSolid
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400'
                              : 'text-secondary-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-secondary-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  

                  <button
                    disabled={!product.inStock}
                    className={`w-full mt-4 py-2 px-4 rounded-lg font-semibold transition-colors ${
                      product.inStock
                        ? 'bg-accent-500 hover:bg-accent-600 text-white'
                        : 'bg-secondary-300 text-secondary-500 cursor-not-allowed'
                    }`}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories Showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-secondary-600">
              Find exactly what you need with our organized product categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors">
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Diesel Systems</h3>
              <p className="text-secondary-600 mb-4">Injectors, pumps, and diesel system components</p>
              <Link to="/ecommerce" className="text-accent-500 hover:text-accent-600 font-semibold">
                Shop Now →
              </Link>
            </div>

            <div className="text-center p-6 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors">
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Security</h3>
              <p className="text-secondary-600 mb-4">Alarms, immobilizers, and tracking systems</p>
              <Link to="/ecommerce" className="text-accent-500 hover:text-accent-600 font-semibold">
                Shop Now →
              </Link>
            </div>

            <div className="text-center p-6 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors">
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎵</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Entertainment</h3>
              <p className="text-secondary-600 mb-4">Android radios and audio systems</p>
              <Link to="/ecommerce" className="text-accent-500 hover:text-accent-600 font-semibold">
                Shop Now →
              </Link>
            </div>

            <div className="text-center p-6 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors">
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Cloud & Tracking</h3>
              <p className="text-secondary-600 mb-4">Fleet management and cloud tracking solutions</p>
              <Link to="/ecommerce" className="text-accent-500 hover:text-accent-600 font-semibold">
                Shop Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-secondary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Store?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TruckIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-secondary-200">
                Express delivery across Kenya with real-time tracking and secure packaging.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Genuine Products</h3>
              <p className="text-secondary-200">
                All products are authentic with manufacturer warranties and quality certificates.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <PhoneIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
              <p className="text-secondary-200">
                Technical guidance and installation support from certified automotive specialists.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Store;
