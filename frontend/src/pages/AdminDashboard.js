import React, { useState } from 'react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  UsersIcon,
  ShoppingBagIcon,
  DocumentTextIcon,
  TicketIcon,
  ChartBarIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([
    { id: 1, name: 'Fuel Injector Set', category: 'Injectors', price: 8500, stock: 15, status: 'active' },
    { id: 2, name: 'Car Alarm Pro', category: 'Security', price: 18500, stock: 8, status: 'active' },
    { id: 3, name: 'Android Radio 10.1"', category: 'Audio', price: 32000, stock: 0, status: 'inactive' }
  ]);

  const [blogPosts, setBlogPosts] = useState([
    { id: 1, title: 'Essential Diesel Engine Maintenance Tips', author: 'John Mwangi', status: 'published', date: '2024-01-15' },
    { id: 2, title: 'Choosing the Right Car Security System', author: 'Sarah Wanjiku', status: 'draft', date: '2024-01-10' }
  ]);

  const [serviceRequests, setServiceRequests] = useState([
    { id: 1, customer: 'David Kiprotich', service: 'Fuel Injection Services', status: 'pending', date: '2024-01-16' },
    { id: 2, customer: 'Grace Achieng', service: 'Car Alarm Installation', status: 'in-progress', date: '2024-01-15' }
  ]);

  const stats = [
    { title: 'Total Products', value: '24', icon: ShoppingBagIcon, change: '+12%' },
    { title: 'Blog Posts', value: '18', icon: DocumentTextIcon, change: '+8%' },
    { title: 'Service Requests', value: '7', icon: TicketIcon, change: '+25%' },
    { title: 'Active Customers', value: '156', icon: UsersIcon, change: '+18%' }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'products', name: 'Products', icon: ShoppingBagIcon },
    { id: 'blog', name: 'Blog Posts', icon: DocumentTextIcon },
    { id: 'requests', name: 'Service Requests', icon: TicketIcon },
    { id: 'settings', name: 'Settings', icon: CogIcon }
  ];

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleDeleteBlogPost = (id) => {
    setBlogPosts(blogPosts.filter(post => post.id !== id));
  };

  const handleDeleteRequest = (id) => {
    setServiceRequests(serviceRequests.filter(request => request.id !== id));
  };

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-accent-500 rounded-lg flex items-center justify-center">
              <ChartBarIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-secondary-900">Admin Dashboard</h1>
              <p className="text-secondary-600 mt-2">Manage your website content and operations</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-secondary-200">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-accent-500 text-accent-600'
                      : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Dashboard Overview Image */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="/img/pexels-tima-miroshnichenko-6169868.jpg"
                alt="Admin dashboard interface showing analytics and management tools"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-secondary-900 mb-2">Dashboard Overview</h2>
                <p className="text-secondary-600">
                  Comprehensive management interface for monitoring your business operations, analytics, and customer interactions.
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-secondary-600">{stat.title}</p>
                        <p className="text-3xl font-bold text-secondary-900">{stat.value}</p>
                      </div>
                      <div className="w-12 h-12 bg-accent-500 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                      <span className="text-sm text-secondary-500 ml-1">from last month</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">Recent Service Requests</h3>
                <div className="space-y-4">
                  {serviceRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex items-center justify-between py-2 border-b border-secondary-100">
                      <div>
                        <p className="font-medium text-secondary-900">{request.customer}</p>
                        <p className="text-sm text-secondary-600">{request.service}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        request.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">Low Stock Products</h3>
                <div className="space-y-4">
                  {products.filter(p => p.stock <= 10).map((product) => (
                    <div key={product.id} className="flex items-center justify-between py-2 border-b border-secondary-100">
                      <div>
                        <p className="font-medium text-secondary-900">{product.name}</p>
                        <p className="text-sm text-secondary-600">{product.stock} units left</p>
                      </div>
                      <span className="text-red-600 font-medium">Low Stock</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-secondary-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-secondary-900">Products Management</h3>
                <button className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg font-medium flex items-center">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add Product
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-secondary-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-secondary-900">{product.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-secondary-500">{product.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-secondary-900">KES {product.price.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-secondary-500">{product.stock}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button className="text-accent-600 hover:text-accent-900">
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Blog Posts Tab */}
        {activeTab === 'blog' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-secondary-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-secondary-900">Blog Management</h3>
                <button className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg font-medium flex items-center">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  New Post
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Author</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-secondary-200">
                  {blogPosts.map((post) => (
                    <tr key={post.id}>
                      <td className="px-6 py-4">
                        <div className="font-medium text-secondary-900">{post.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-secondary-500">{post.author}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-secondary-500">{post.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button className="text-accent-600 hover:text-accent-900">
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteBlogPost(post.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Service Requests Tab */}
        {activeTab === 'requests' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-secondary-200">
              <h3 className="text-lg font-semibold text-secondary-900">Service Requests</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-secondary-200">
                  {serviceRequests.map((request) => (
                    <tr key={request.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-secondary-900">{request.customer}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-secondary-500">{request.service}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          request.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-secondary-500">{request.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button className="text-accent-600 hover:text-accent-900">
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteRequest(request.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-6">System Settings</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-medium text-secondary-900 mb-3">General Settings</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Company Name</label>
                    <input type="text" defaultValue="Megastrength Limited" className="w-full px-3 py-2 border border-secondary-300 rounded-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Contact Email</label>
                    <input type="email" defaultValue="info@megastrength.co.ke" className="w-full px-3 py-2 border border-secondary-300 rounded-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Phone Number</label>
                    <input type="tel" defaultValue="+254 700 000 000" className="w-full px-3 py-2 border border-secondary-300 rounded-md" />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium text-secondary-900 mb-3">Notification Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input type="checkbox" id="email-notifications" className="h-4 w-4 text-accent-500 focus:ring-accent-500 border-secondary-300 rounded" />
                    <label htmlFor="email-notifications" className="ml-2 text-sm text-secondary-700">Email notifications for new service requests</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="sms-notifications" className="h-4 w-4 text-accent-500 focus:ring-accent-500 border-secondary-300 rounded" />
                    <label htmlFor="sms-notifications" className="ml-2 text-sm text-secondary-700">SMS notifications for urgent requests</label>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-2 rounded-lg font-semibold">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
