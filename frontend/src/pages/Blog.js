import React, { useState } from 'react';
import { 
  CalendarIcon, 
  UserIcon, 
  ClockIcon,
  CogIcon,
  ShieldCheckIcon,
  TruckIcon,
  CameraIcon
} from '@heroicons/react/24/outline';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: 'Essential Diesel Engine Maintenance Tips',
      excerpt: 'Learn the key maintenance practices that can extend your diesel engine\'s lifespan and improve fuel efficiency.',
      content: 'Diesel engines are known for their durability and fuel efficiency, but proper maintenance is crucial to ensure optimal performance...',
      author: 'John Mwangi',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'maintenance',
      image: '/img/pexels-cottonbro-4489707.jpg',
      tags: ['diesel', 'maintenance', 'fuel efficiency']
    },
    {
      id: 2,
      title: 'Choosing the Right Car Security System',
      excerpt: 'A comprehensive guide to selecting the best security system for your vehicle in Kenya\'s urban environment.',
      content: 'Vehicle security is paramount in today\'s world, especially in bustling cities like Nairobi...',
      author: 'Sarah Wanjiku',
      date: '2024-01-10',
      readTime: '7 min read',
      category: 'security',
      image: '/img/pexels-geometric-photography-186685971-13124396.jpg',
      tags: ['security', 'alarms', 'GPS tracking']
    },
    {
      id: 3,
      title: 'Fleet Management Best Practices for Kenyan Businesses',
      excerpt: 'How to optimize your fleet operations for better efficiency and cost savings in the Kenyan market.',
      content: 'Managing a fleet in Kenya comes with unique challenges and opportunities...',
      author: 'David Kiprotich',
      date: '2024-01-08',
      readTime: '6 min read',
      category: 'fleet',
      image: '/img/pexels-athena-2996306.jpg',
      tags: ['fleet management', 'business', 'efficiency']
    },
    {
      id: 4,
      title: 'The Future of Vehicle Tracking Technology',
      excerpt: 'Exploring the latest advancements in GPS tracking and how they benefit fleet operators.',
      content: 'GPS tracking technology has evolved significantly over the past decade...',
      author: 'Michael Oduya',
      date: '2024-01-05',
      readTime: '8 min read',
      category: 'technology',
      image: '/img/pexels-tima-miroshnichenko-6169868.jpg',
      tags: ['GPS', 'technology', 'tracking']
    },
    {
      id: 5,
      title: 'Android Radios: Enhancing Your Driving Experience',
      excerpt: 'How modern Android car stereos are revolutionizing in-car entertainment and navigation.',
      content: 'The days of basic car radios are long gone. Today\'s Android car stereos offer...',
      author: 'Grace Achieng',
      date: '2024-01-03',
      readTime: '4 min read',
      category: 'audio',
      image: '/img/pexels-maksgelatin-4824424.jpg',
      tags: ['android radio', 'entertainment', 'navigation']
    },
    {
      id: 6,
      title: 'Dash Camera Benefits for Commercial Vehicles',
      excerpt: 'Why every commercial vehicle should have a dash camera and how to choose the right one.',
      content: 'Dash cameras have become essential for commercial vehicle operators...',
      author: 'Peter Njoroge',
      date: '2024-01-01',
      readTime: '6 min read',
      category: 'cameras',
      image: '/img/pexels-cottonbro-4489715.jpg',
      tags: ['dash camera', 'commercial', 'safety']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', icon: null },
    { id: 'maintenance', name: 'Maintenance', icon: CogIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'fleet', name: 'Fleet Management', icon: TruckIcon },
    { id: 'technology', name: 'Technology', icon: CameraIcon },
    { id: 'audio', name: 'Audio Systems', icon: null }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-800 text-white py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url('/img/pexels-pixabay-159293.jpg')` }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Resources & Insights</h1>
          <p className="text-xl md:text-2xl text-primary-200 max-w-3xl mx-auto">
            Expert articles and guides on vehicle maintenance, security, and fleet management.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors flex items-center space-x-2 ${
                    selectedCategory === category.id
                      ? 'bg-accent-500 text-white'
                      : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                  }`}
                >
                  {IconComponent && <IconComponent className="w-4 h-4" />}
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent-500 text-white px-2 py-1 rounded text-sm font-medium">
                      {categories.find(cat => cat.id === post.category)?.name}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-3 text-secondary-900 hover:text-accent-600 transition-colors cursor-pointer">
                    {post.title}
                  </h2>
                  <p className="text-secondary-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-secondary-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <UserIcon className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="w-full bg-accent-500 hover:bg-accent-600 text-white py-2 px-4 rounded font-semibold transition-colors">
                    Read More
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-secondary-600 mb-8">
            Subscribe to our newsletter for the latest tips, industry news, and exclusive offers.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
              required
            />
            <button
              type="submit"
              className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">Popular Topics</h2>
            <p className="text-lg text-secondary-600">
              Explore our most read articles by category.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CogIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Diesel Maintenance</h3>
              <p className="text-secondary-600 text-sm mb-4">
                Expert tips for keeping your diesel engine running smoothly.
              </p>
              <span className="text-accent-500 font-semibold">12 articles</span>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Vehicle Security</h3>
              <p className="text-secondary-600 text-sm mb-4">
                Latest trends and technologies in automotive security.
              </p>
              <span className="text-accent-500 font-semibold">8 articles</span>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TruckIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fleet Management</h3>
              <p className="text-secondary-600 text-sm mb-4">
                Strategies for efficient fleet operations and cost savings.
              </p>
              <span className="text-accent-500 font-semibold">15 articles</span>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CameraIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Technology Updates</h3>
              <p className="text-secondary-600 text-sm mb-4">
                Latest advancements in automotive technology and tracking.
              </p>
              <span className="text-accent-500 font-semibold">10 articles</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
