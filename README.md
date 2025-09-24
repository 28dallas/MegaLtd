# Megastrength Limited - Complete Website Solution

A comprehensive full-stack web application for Megastrength Limited, a Kenyan automotive services company specializing in diesel fuel injection services, car security systems, Android radios, GPS tracking, and fleet management solutions.

## 🚀 Features

### Frontend (React + Tailwind CSS)
- **Responsive Design** - Mobile-first approach with modern UI/UX
- **Multiple Pages**:
  - Home - Landing page with hero section and services overview
  - About - Company information and team details
  - Services - Detailed service offerings with booking system
  - E-commerce Shop - Product catalog with filtering and search
  - Fleet Portal - GPS tracking client login and dashboard
  - Blog - Articles and resources on automotive topics
  - Contact - Contact forms and location information
  - Admin Dashboard - Complete management interface
- **Interactive Components** - Service booking, contact forms, product filtering
- **Modern Styling** - Tailwind CSS with custom design system

### Backend (Node.js + Express + MongoDB)
- **RESTful API** - Complete API with authentication and CRUD operations
- **User Management** - Registration, login, role-based access control
- **Product Management** - Full inventory management system
- **Booking System** - Service appointment scheduling
- **Content Management** - Blog posts and article management
- **Contact Management** - Customer inquiry handling
- **Fleet Tracking** - GPS integration for fleet clients
- **Admin Features** - Comprehensive dashboard for business management

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Beautiful hand-crafted SVG icons
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation and sanitization
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
megastrength-website/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   │   ├── Header.js    # Navigation header
│   │   │   └── Footer.js    # Site footer
│   │   ├── pages/          # Page components
│   │   │   ├── Home.js     # Landing page
│   │   │   ├── About.js    # About page
│   │   │   ├── Services.js # Services page
│   │   │   ├── Ecommerce.js # Shop page
│   │   │   ├── FleetPortal.js # Fleet tracking portal
│   │   │   ├── Blog.js     # Blog page
│   │   │   ├── Contact.js  # Contact page
│   │   │   └── AdminDashboard.js # Admin dashboard
│   │   ├── App.js          # Main app component
│   │   ├── index.js        # App entry point
│   │   └── index.css       # Global styles
│   ├── package.json        # Frontend dependencies
│   ├── tailwind.config.js  # Tailwind configuration
│   └── postcss.config.js   # PostCSS configuration
├── backend/                # Express backend API
│   ├── models/            # MongoDB models
│   │   ├── User.js       # User model
│   │   ├── Product.js    # Product model
│   │   ├── Booking.js    # Booking model
│   │   ├── Blog.js       # Blog post model
│   │   └── Contact.js    # Contact message model
│   ├── routes/           # API route handlers
│   │   ├── auth.js      # Authentication routes
│   │   ├── products.js  # Product management routes
│   │   ├── bookings.js  # Service booking routes
│   │   ├── blog.js      # Blog management routes
│   │   ├── contact.js   # Contact form routes
│   │   └── fleet.js     # Fleet tracking routes
│   ├── server.js        # Main server file
│   ├── package.json     # Backend dependencies
│   ├── .env.example     # Environment variables template
│   └── README.md        # Backend documentation
└── README.md           # This file
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/megastrength
   JWT_SECRET=your-super-secret-jwt-key-here
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Start development server**
   ```bash
   npm run dev
   ```

   The backend API will be available at `http://localhost:5000`

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/megastrength

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration (for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
EMAIL_FROM=noreply@megastrength.co.ke

# GPS Tracking System Integration (if applicable)
GPS_API_URL=https://your-gps-provider.com/api
GPS_API_KEY=your-gps-api-key
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

## 📱 Features Overview

### 🏠 Home Page
- Hero section with company introduction
- Featured services showcase
- Latest blog posts
- Customer testimonials
- Call-to-action sections

### 🛠 Services Page
- Detailed service descriptions
- Service booking system
- Pricing information
- Service process explanation

### 🛒 E-commerce Shop
- Product catalog with categories
- Advanced filtering and search
- Product details and specifications
- Shopping cart functionality
- Inventory management

### 🚛 Fleet Portal
- Client login system
- Real-time GPS tracking dashboard
- Vehicle management interface
- Alert and notification system
- Trip history and reporting

### 📝 Blog System
- Article management
- Category-based organization
- SEO-friendly URLs
- Social sharing features
- Comment system (extensible)

### 📞 Contact System
- Contact form with validation
- Multiple contact methods
- Location information
- Business hours display
- Inquiry management

### 👨‍💼 Admin Dashboard
- User management
- Product inventory control
- Service booking management
- Blog content management
- Contact inquiry handling
- Analytics and reporting

## 🔐 Authentication & Authorization

### User Roles
- **Customer** - Regular website users
- **Admin** - Full administrative access
- **Fleet Client** - Access to fleet tracking portal

### Features
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Secure API endpoints
- Session management

## 🗄 Database Models

### User Model
- Personal information
- Authentication credentials
- Role-based permissions
- Account status tracking

### Product Model
- Product catalog
- Inventory management
- Pricing and specifications
- Category organization

### Booking Model
- Service appointments
- Customer information
- Scheduling system
- Status tracking

### Blog Model
- Article content
- SEO optimization
- Author information
- Publication management

### Contact Model
- Customer inquiries
- Message management
- Priority levels
- Response tracking

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - User profile
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking

### Blog
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:id` - Get single post
- `POST /api/blog` - Create post (Admin)
- `PUT /api/blog/:id` - Update post (Admin)
- `DELETE /api/blog/:id` - Delete post (Admin)

### Contact
- `GET /api/contact` - Get all messages
- `POST /api/contact` - Submit contact form
- `PUT /api/contact/:id` - Update message
- `DELETE /api/contact/:id` - Delete message

### Fleet
- `POST /api/fleet/login` - Fleet client login
- `GET /api/fleet/dashboard` - Fleet dashboard
- `GET /api/fleet/vehicles/:id` - Vehicle details
- `GET /api/fleet/alerts` - Fleet alerts

## 🎨 Design System

### Colors
- **Primary**: Blue tones (#1e40af, #1e3a8a)
- **Secondary**: Gray tones (#6b7280, #374151)
- **Accent**: Orange/amber (#f59e0b, #d97706)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Headings**: Inter font family
- **Body**: Inter font family
- **Sizes**: Responsive typography scale

### Components
- Consistent spacing and padding
- Hover and focus states
- Loading states and animations
- Form validation styles

## 🚀 Deployment

### Frontend Deployment
1. Build the production version:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `build` folder to your hosting provider (Netlify, Vercel, etc.)

### Backend Deployment
1. Set production environment variables
2. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "megastrength-api"
   ```

3. Set up reverse proxy with Nginx
4. Configure SSL/TLS certificates
5. Set up database backups

## 🔧 Development Guidelines

### Code Style
- Use functional React components with hooks
- Follow consistent naming conventions
- Add proper error handling
- Include validation for all inputs
- Use TypeScript for type safety (optional)

### Git Workflow
- Feature branches for new development
- Pull request reviews
- Semantic commit messages
- Regular updates to main branch

### Testing
- Unit tests for components
- Integration tests for API endpoints
- End-to-end testing with Cypress (recommended)

## 📞 Support & Contact

For technical support or questions about the website:

- **Email**: support@megastrength.co.ke
- **Phone**: +254 700 000 000
- **Address**: Nairobi CBD, Kenya

## 📄 License

This project is proprietary to Megastrength Limited. All rights reserved.

## 🤝 Contributing

This is a private project for Megastrength Limited. For contributions or modifications, please contact the development team.

---

**Built with ❤️ for Megastrength Limited**
*Empowering automotive solutions across Kenya*
# MegaLtd
