import React, { useState } from 'react';
import { 
  ShoppingCartIcon, 
  HeartIcon, 
  StarIcon,
  TruckIcon,
  ShieldCheckIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const Ecommerce = () => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    {
      id: 1,
      name: 'Fuel Injector Set',
      category: 'injectors',
      price: 8500,
      originalPrice: 9500,
      rating: 4.5,
      reviews: 23,
      image: '/img/pexels-cottonbro-4489707.jpg',
      description: 'High-performance fuel injectors for diesel engines',
      inStock: true
    },
    {
      id: 2,
      name: 'Car Alarm System Pro',
      category: 'alarms',
      price: 18500,
      originalPrice: 22000,
      rating: 4.8,
      reviews: 45,
      image: '/img/pexels-geometric-photography-186685971-13124396.jpg',
      description: 'Advanced car alarm with GPS tracking',
      inStock: true
    },
    {
      id: 3,
      name: 'Android Radio 10.1"',
      category: 'radios',
      price: 32000,
      originalPrice: 38000,
      rating: 4.6,
      reviews: 31,
      image: '/img/pexels-maksgelatin-4824424.jpg',
      description: 'Large touchscreen Android radio with navigation',
      inStock: false
    },
    {
      id: 4,
      name: 'GPS Tracker Pro',
      category: 'trackers',
      price: 12500,
      originalPrice: 15000,
      rating: 4.7,
      reviews: 67,
      image: '/img/pexels-athena-2996306.jpg',
      description: 'Real-time GPS tracking device with mobile app',
      inStock: true
    },
    {
      id: 5,
      name: '4G Dash Camera',
      category: 'cameras',
      price: 42000,
      originalPrice: 48000,
      rating: 4.9,
      reviews: 28,
      image: '/img/pexels-tima-miroshnichenko-6169868.jpg',
      description: '4G live streaming dash camera with cloud storage',
      inStock: true
    },
    {
      id: 6,
      name: 'Diesel Pump Assembly',
      category: 'injectors',
      price: 15600,
      originalPrice: 18000,
      rating: 4.4,
      reviews: 19,
      image: '/img/pexels-cottonbro-4489715.jpg',
      description: 'Complete diesel fuel pump assembly',
      inStock: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'injectors', name: 'Fuel Injectors' },
    { id: 'alarms', name: 'Car Alarms' },
    { id: 'radios', name: 'Android Radios' },
    { id: 'trackers', name: 'GPS Trackers' },
    { id: 'cameras', name: 'Dash Cameras' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  const toggleWishlist = (product) => {
    if (wishlist.find(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-800 text-white py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url('/img/pexels-cottonbro-4489715.jpg')` }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Shop Quality Auto Parts</h1>
          <p className="text-xl md:text-2xl text-primary-200 max-w-3xl mx-auto">
            Genuine automotive parts and accessories for optimal vehicle performance.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-accent-500 text-white'
                    : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-secondary-50 transition-colors"
                  >
                    {isInWishlist(product.id) ? (
                      <HeartSolidIcon className="w-5 h-5 text-red-500" />
                    ) : (
                      <HeartIcon className="w-5 h-5 text-secondary-400" />
                    )}
                  </button>
                  {!product.inStock && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-sm">
                      Out of Stock
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-secondary-600 mb-4">{product.description}</p>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon 
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
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-primary-600">
                        KES {product.price.toLocaleString()}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="ml-2 text-sm text-secondary-500 line-through">
                          KES {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center ${
                      product.inStock
                        ? 'bg-accent-500 hover:bg-accent-600 text-white'
                        : 'bg-secondary-300 text-secondary-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCartIcon className="w-5 h-5 mr-2" />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">Why Shop With Us?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TruckIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-secondary-600">
                Quick and reliable delivery across Kenya with tracking information.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Guarantee</h3>
              <p className="text-secondary-600">
                All products come with manufacturer warranty and quality assurance.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <PhoneIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
              <p className="text-secondary-600">
                Technical support and installation guidance from our expert team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <section className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 border">
          <div className="flex items-center space-x-2">
            <ShoppingCartIcon className="w-6 h-6 text-accent-500" />
            <span className="font-semibold">{cart.length} items in cart</span>
          </div>
          <div className="mt-2">
            <span className="text-sm text-secondary-600">
              Total: KES {cart.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
            </span>
          </div>
        </section>
      )}
    </div>
  );
};

export default Ecommerce;
