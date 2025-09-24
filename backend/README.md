# Megastrength Limited Backend API

A comprehensive REST API for Megastrength Limited's automotive services website, built with Node.js, Express, supporting both MongoDB and MySQL databases.

## Features

- **Dual Database Support** - MongoDB for flexible document storage and MySQL for relational data
- **User Authentication & Authorization** - JWT-based authentication with role-based access control
- **Product Management** - Full CRUD operations for automotive products and parts
- **Service Booking System** - Appointment booking and management for vehicle services
- **Blog Management** - Content management system for articles and resources
- **Contact Management** - Handle customer inquiries and support requests
- **Fleet Tracking Portal** - GPS tracking integration for fleet management clients
- **Admin Dashboard** - Comprehensive admin interface for managing all aspects

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Databases**:
  - MongoDB with Mongoose ODM (Document database)
  - MySQL with Sequelize ORM (Relational database)
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator
- **Password Hashing**: bcryptjs
- **CORS**: Enabled for cross-origin requests

## Project Structure

```
backend/
├── models/                 # MongoDB models
│   ├── User.js            # User authentication model
│   ├── Product.js         # Product catalog model
│   ├── Booking.js         # Service booking model
│   ├── Blog.js            # Blog posts model
│   └── Contact.js         # Contact messages model
├── models/mysql/          # MySQL models (Sequelize)
│   ├── User.js            # MySQL user model
│   ├── Product.js         # MySQL product model
│   ├── Booking.js         # MySQL booking model
│   ├── Blog.js            # MySQL blog model
│   └── Contact.js         # MySQL contact model
├── routes/                # API route handlers
│   ├── auth.js           # Authentication routes
│   ├── products.js       # Product management routes
│   ├── bookings.js       # Service booking routes
│   ├── blog.js           # Blog management routes
│   ├── contact.js        # Contact form routes
│   └── fleet.js          # Fleet tracking routes
├── middleware/           # Custom middleware
├── uploads/             # File upload directory
├── server.js            # Main application entry point
├── package.json         # Dependencies and scripts
├── .env                 # Environment variables
└── README.md           # This file
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd megastrength-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   The `.env` file is already configured with default values. Update it with your specific configuration:
   ```env
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/megastrength
   MYSQL_HOST=localhost
   MYSQL_USER=root
   MYSQL_PASSWORD=your_mysql_password
   MYSQL_DATABASE=megastrength_mysql

   # Server Configuration
   PORT=5000
   JWT_SECRET=your-super-secret-jwt-key-here
   ```

4. **Database Setup**
   - **MongoDB**: Make sure MongoDB is running on your system
   - **MySQL**: Make sure MySQL is running and create the database:
     ```sql
     CREATE DATABASE megastrength_mysql;
     ```

5. **Run the application**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user (MongoDB)
- `POST /api/auth/login` - User login (MongoDB)
- `POST /api/auth/mysql/register` - Register new user (MySQL)
- `POST /api/auth/mysql/login` - User login (MySQL)
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products (MongoDB)
- `GET /api/products/:id` - Get single product (MongoDB)
- `GET /api/products/category/:category` - Get products by category (MongoDB)
- `GET /api/products/featured/list` - Get featured products (MongoDB)
- `POST /api/products` - Create new product (MongoDB)
- `PUT /api/products/:id` - Update product (MongoDB)
- `DELETE /api/products/:id` - Delete product (MongoDB)
- `GET /api/products/mysql/list` - Get all products (MySQL)
- `GET /api/products/mysql/:id` - Get single product (MySQL)
- `POST /api/products/mysql/create` - Create new product (MySQL)
- `PUT /api/products/mysql/:id` - Update product (MySQL)
- `DELETE /api/products/mysql/:id` - Delete product (MySQL)

### Bookings
- `GET /api/bookings` - Get all bookings (MongoDB)
- `GET /api/bookings/:id` - Get single booking (MongoDB)
- `GET /api/bookings/availability/:date` - Get available time slots (MongoDB)
- `POST /api/bookings` - Create new booking (MongoDB)
- `PUT /api/bookings/:id` - Update booking (MongoDB)
- `PATCH /api/bookings/:id/status` - Update booking status (MongoDB)
- `DELETE /api/bookings/:id` - Delete booking (MongoDB)
- `GET /api/bookings/mysql/list` - Get all bookings (MySQL)
- `GET /api/bookings/mysql/:id` - Get single booking (MySQL)
- `GET /api/bookings/mysql/availability/:date` - Get available time slots (MySQL)
- `POST /api/bookings/mysql/create` - Create new booking (MySQL)
- `PUT /api/bookings/mysql/:id` - Update booking (MySQL)
- `PATCH /api/bookings/mysql/:id/status` - Update booking status (MySQL)
- `DELETE /api/bookings/mysql/:id` - Delete booking (MySQL)

### Blog
- `GET /api/blog` - Get all blog posts (MongoDB)
- `GET /api/blog/:id` - Get single blog post (MongoDB)
- `GET /api/blog/slug/:slug` - Get blog post by slug (MongoDB)
- `GET /api/blog/category/:category` - Get posts by category (MongoDB)
- `GET /api/blog/featured/list` - Get featured posts (MongoDB)
- `POST /api/blog` - Create new blog post (MongoDB)
- `PUT /api/blog/:id` - Update blog post (MongoDB)
- `DELETE /api/blog/:id` - Delete blog post (MongoDB)
- `POST /api/blog/:id/like` - Like/unlike blog post (MongoDB)
- `GET /api/blog/mysql/list` - Get all blog posts (MySQL)
- `GET /api/blog/mysql/:id` - Get single blog post (MySQL)
- `GET /api/blog/mysql/slug/:slug` - Get blog post by slug (MySQL)
- `GET /api/blog/mysql/category/:category` - Get posts by category (MySQL)
- `GET /api/blog/mysql/featured/list` - Get featured posts (MySQL)
- `POST /api/blog/mysql/create` - Create new blog post (MySQL)
- `PUT /api/blog/mysql/:id` - Update blog post (MySQL)
- `DELETE /api/blog/mysql/:id` - Delete blog post (MySQL)
- `POST /api/blog/mysql/:id/like` - Like/unlike blog post (MySQL)

### Contact
- `GET /api/contact` - Get all contact messages (MongoDB)
- `GET /api/contact/:id` - Get single contact message (MongoDB)
- `GET /api/contact/stats/summary` - Get contact statistics (MongoDB)
- `POST /api/contact` - Submit contact form (MongoDB)
- `PUT /api/contact/:id` - Update contact message (MongoDB)
- `PATCH /api/contact/:id/status` - Update contact status (MongoDB)
- `DELETE /api/contact/:id` - Delete contact message (MongoDB)
- `GET /api/contact/mysql/list` - Get all contact messages (MySQL)
- `GET /api/contact/mysql/:id` - Get single contact message (MySQL)
- `GET /api/contact/mysql/stats/summary` - Get contact statistics (MySQL)
- `POST /api/contact/mysql/create` - Submit contact form (MySQL)
- `PUT /api/contact/mysql/:id` - Update contact message (MySQL)
- `PATCH /api/contact/mysql/:id/status` - Update contact status (MySQL)
- `DELETE /api/contact/mysql/:id` - Delete contact message (MySQL)

### Fleet Tracking
- `POST /api/fleet/login` - Fleet client login
- `GET /api/fleet/dashboard` - Get fleet dashboard data
- `GET /api/fleet/vehicles/:vehicleId` - Get vehicle details
- `GET /api/fleet/alerts` - Get fleet alerts
- `PATCH /api/fleet/alerts/:alertId/acknowledge` - Acknowledge alert
- `GET /api/fleet/reports` - Get fleet reports
- `GET /api/fleet/geofences` - Get geofences

## Dual Database Architecture

This API supports both MongoDB and MySQL databases simultaneously:

### MongoDB (Document Database)
- **Purpose**: Flexible document storage for complex, nested data
- **Use Cases**: Blog posts, contact messages, user profiles with flexible schemas
- **Endpoints**: Standard routes (e.g., `/api/bookings`, `/api/blog`)
- **ODM**: Mongoose

### MySQL (Relational Database)
- **Purpose**: Structured relational data with ACID compliance
- **Use Cases**: Bookings, products, user authentication with strict schemas
- **Endpoints**: MySQL-specific routes (e.g., `/api/bookings/mysql/list`, `/api/products/mysql/create`)
- **ORM**: Sequelize

### Choosing Between Databases
- **Use MongoDB** for: Flexible schemas, nested documents, quick prototyping
- **Use MySQL** for: Complex queries, transactions, reporting, strict data validation

## User Roles

- **customer**: Regular website users
- **admin**: Full administrative access
- **fleet_client**: Access to fleet tracking portal

## Data Models

### MongoDB Models

#### User
```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  phone: String,
  role: String (enum: customer, admin, fleet_client),
  company: String,
  isActive: Boolean,
  emailVerified: Boolean,
  phoneVerified: Boolean
}
```

#### Product
```javascript
{
  name: String,
  description: String,
  category: String (enum: injectors, alarms, radios, trackers, cameras, parts),
  price: Number,
  originalPrice: Number,
  stock: Number,
  images: [String],
  specifications: Map,
  features: [String],
  isActive: Boolean,
  isFeatured: Boolean,
  warranty: String,
  brand: String,
  model: String,
  compatibility: [String]
}
```

#### Booking
```javascript
{
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  service: String,
  vehicleInfo: {
    make: String,
    model: String,
    year: Number,
    registration: String
  },
  preferredDate: Date,
  preferredTime: String,
  urgency: String (enum: normal, urgent, emergency),
  message: String,
  status: String (enum: pending, confirmed, in-progress, completed, cancelled),
  assignedTechnician: ObjectId,
  estimatedCost: Number,
  actualCost: Number,
  location: String
}
```

### MySQL Models (Sequelize)

#### User
```javascript
{
  id: INTEGER (Primary Key),
  name: STRING,
  email: STRING (Unique),
  password: STRING (hashed),
  phone: STRING,
  role: ENUM('customer', 'admin', 'fleet_client'),
  company: STRING,
  isActive: BOOLEAN,
  emailVerified: BOOLEAN,
  phoneVerified: BOOLEAN,
  createdAt: DATE,
  updatedAt: DATE
}
```

#### Product
```javascript
{
  id: INTEGER (Primary Key),
  name: STRING,
  description: TEXT,
  category: ENUM('injectors', 'alarms', 'radios', 'trackers', 'cameras', 'parts'),
  price: DECIMAL(10,2),
  originalPrice: DECIMAL(10,2),
  stock: INTEGER,
  images: JSON,
  specifications: JSON,
  features: JSON,
  isActive: BOOLEAN,
  isFeatured: BOOLEAN,
  warranty: STRING,
  brand: STRING,
  model: STRING,
  compatibility: JSON,
  createdAt: DATE,
  updatedAt: DATE
}
```

#### Booking
```javascript
{
  id: INTEGER (Primary Key),
  customerName: STRING,
  customerEmail: STRING,
  customerPhone: STRING,
  service: ENUM('Fuel Injection Services', 'Car Alarms & Security Systems', ...),
  vehicleInfo: JSON,
  preferredDate: DATE,
  preferredTime: ENUM('09:00', '10:00', '11:00', '14:00', '15:00', '16:00'),
  urgency: ENUM('normal', 'urgent', 'emergency'),
  message: TEXT,
  status: ENUM('pending', 'confirmed', 'in-progress', 'completed', 'cancelled'),
  assignedTechnicianId: INTEGER (Foreign Key),
  estimatedCost: DECIMAL(10,2),
  actualCost: DECIMAL(10,2),
  location: STRING,
  notes: TEXT,
  createdAt: DATE,
  updatedAt: DATE
}
```

## Error Handling

The API uses consistent error response format:
```json
{
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Specific error message"
    }
  ]
}
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- Rate limiting (recommended for production)
- CORS configuration
- Environment-based configuration

## Development

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (when implemented)

### Code Style
- Use ES6+ syntax
- Follow consistent naming conventions
- Add proper error handling
- Include validation for all inputs
- Use async/await for database operations

## Production Deployment

1. Set environment variables
2. Use a process manager like PM2
3. Set up reverse proxy with Nginx
4. Configure SSL/TLS certificates
5. Set up database backups
6. Configure monitoring and logging

## Integration Notes

### GPS Tracking System
The fleet routes are designed to integrate with external GPS tracking providers. Update the GPS API configuration in `.env` and modify the fleet routes to connect to your specific GPS tracking system.

### Payment Integration
Payment functionality can be added by integrating with M-Pesa or other payment providers. The booking model includes payment fields that can be extended for this purpose.

### Email Notifications
Configure email settings in `.env` to enable email notifications for bookings, contact forms, and other events.

## Support

For technical support or questions about the API, please contact the development team.

## License

This project is proprietary to Megastrength Limited.
