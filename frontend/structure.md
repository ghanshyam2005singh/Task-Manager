task-manager/
├── backend/
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   └── jwt.js               # JWT configuration
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── taskController.js    # Task CRUD operations
│   ├── middleware/
│   │   ├── auth.js             # JWT verification middleware
│   │   ├── errorHandler.js     # Global error handling
│   │   └── rateLimiter.js      # Rate limiting middleware
│   ├── models/
│   │   ├── User.js             # User schema
│   │   └── Task.js             # Task schema
│   ├── routes/
│   │   ├── auth.js             # Authentication routes
│   │   └── tasks.js            # Task routes
│   ├── utils/
│   │   ├── validation.js       # Input validation helpers
│   │   └── responseHelper.js   # API response helpers
│   ├── .env                    # Environment variables
│   ├── .gitignore             # Git ignore file
│   ├── package.json           # Backend dependencies
│   └── server.js              # Main server file
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Header.js           # Navigation header
│   │   │   │   ├── Loader.js           # Loading component
│   │   │   │   └── ProtectedRoute.js   # Route protection
│   │   │   ├── auth/
│   │   │   │   ├── Login.js            # Login form
│   │   │   │   └── Register.js         # Registration form
│   │   │   └── tasks/
│   │   │       ├── TaskList.js         # List of tasks
│   │   │       ├── TaskItem.js         # Individual task
│   │   │       ├── TaskForm.js         # Add/Edit task form
│   │   │       └── Dashboard.js        # Main dashboard
│   │   ├── context/
│   │   │   ├── AuthContext.js          # Authentication context
│   │   │   └── TaskContext.js          # Task management context
│   │   ├── hooks/
│   │   │   ├── useAuth.js              # Authentication hook
│   │   │   └── useTasks.js             # Task management hook
│   │   ├── services/
│   │   │   ├── api.js                  # Axios configuration
│   │   │   ├── authService.js          # Auth API calls
│   │   │   └── taskService.js          # Task API calls
│   │   ├── utils/
│   │   │   ├── constants.js            # App constants
│   │   │   └── helpers.js              # Utility functions
│   │   ├── styles/
│   │   │   └── global.css              # Global styles
│   │   ├── App.js                      # Main App component
│   │   ├── App.css                     # App styles
│   │   └── index.js                    # Entry point
│   ├── .env                            # Environment variables
│   ├── .gitignore                      # Git ignore file
│   └── package.json                    # Frontend dependencies
├── README.md                           # Project documentation
└── .gitignore                          # Root git ignore


# Navigate to backend directory
cd backend

# Initialize package.json (copy the package.json content above)
npm init -y

# Install production dependencies
npm install express mongoose bcryptjs jsonwebtoken cors helmet express-rate-limit express-validator dotenv express-async-errors morgan cookie-parser

# Install development dependencies
npm install --save-dev nodemon jest supertest @types/jest


# Navigate to frontend directory
cd ../frontend

# Create React app
npx create-react-app .

# Install additional dependencies
npm install react-router-dom axios react-hook-form react-hot-toast react-icons @mui/material @mui/icons-material @emotion/react @emotion/styled @mui/x-date-pickers date-fns


Package Explanations
Backend Packages:
express: Web framework for Node.js
mongoose: MongoDB ODM
bcryptjs: Password hashing
jsonwebtoken: JWT token generation/verification
cors: Cross-Origin Resource Sharing
helmet: Security headers
express-rate-limit: Rate limiting middleware
express-validator: Input validation
dotenv: Environment variables
express-async-errors: Better async error handling
morgan: HTTP request logger
cookie-parser: Parse cookies
nodemon: Auto-restart server in development
jest: Testing framework
supertest: HTTP testing
Frontend Packages:
react: Core React library
react-dom: React DOM renderer
react-router-dom: Client-side routing
axios: HTTP client
react-hook-form: Form handling
react-hot-toast: Toast notifications
react-icons: Icon library
@mui/material: Material-UI components
@emotion/react & @emotion/styled: CSS-in-JS for MUI
@mui/x-date-pickers: Date picker components
date-fns: Date utility library