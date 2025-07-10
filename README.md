# Task Manager - MERN Stack Application

A full-stack Task Manager (To-Do) application built with MongoDB, Express.js, React, and Node.js. This application features user authentication, CRUD operations for tasks, and a responsive user interface.

## 🚀 Features

### Backend Features
- User registration and login with JWT authentication
- Password hashing using bcrypt
- CRUD operations for tasks (Create, Read, Update, Delete)
- User-specific task management
- Protected routes with authentication middleware
- Rate limiting and IP blocking
- Comprehensive error handling
- Clean MVC architecture

### Frontend Features
- User registration and login forms with validation
- Protected dashboard route
- Task management interface (add, edit, delete, view)
- Responsive design with modern UI
- Global state management
- React Router for navigation

### Security Features
- JWT tokens stored securely
- Password hashing with bcrypt
- Environment variables for sensitive data
- Input validation and sanitization
- Rate limiting for API endpoints

## 🛠 Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **express-rate-limit** - Rate limiting
- **cors** - Cross-origin resource sharing
- **helmet** - Security headers
- **dotenv** - Environment variables

### Frontend
- **React** - Frontend library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Context API/Redux** - State management
- **Material-UI/Bootstrap** - UI components
- **React Hook Form** - Form handling

## 📁 Project Structure

```
task-manager/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── jwt.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── rateLimiter.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── utils/
│   │   ├── validation.js
│   │   └── responseHelper.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Header.js
│   │   │   │   ├── Loader.js
│   │   │   │   └── ProtectedRoute.js
│   │   │   ├── auth/
│   │   │   │   ├── Login.js
│   │   │   │   └── Register.js
│   │   │   └── tasks/
│   │   │       ├── TaskList.js
│   │   │       ├── TaskItem.js
│   │   │       ├── TaskForm.js
│   │   │       └── Dashboard.js
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── TaskContext.js
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useTasks.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   └── taskService.js
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
├── README.md
└── .gitignore
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ghanshyam2005singh/task-manager.git
cd task-manager
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

4. **Environment Setup**

- Copy `.env.example` to `.env` in both `backend` and `frontend` directories and fill in the required values.

    **Backend `.env.example`:**
    ```env
    NODE_ENV=development
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    JWT_EXPIRE=7d
    BCRYPT_SALT_ROUNDS=12
    RATE_LIMIT_WINDOW_MS=900000
    RATE_LIMIT_MAX_REQUESTS=100
    ```

    **Frontend `.env.example`:**
    ```env
    REACT_APP_API_URL=http://localhost:5000/api
    REACT_APP_APP_NAME=Task Manager
    GENERATE_SOURCEMAP=false
    ```

5. **Build the Frontend**
    ```bash
    cd frontend
    npm run build
    ```

6. **Start the Application**

    **Backend (from backend directory):**
    ```bash
    npm run dev
    ```

    **Frontend (for development, from frontend directory):**
    ```bash
    npm start
    ```

    The backend will run on `http://localhost:5000` and frontend on `http://localhost:3000`.

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Tasks
- `GET /api/tasks` - Get all user tasks (protected)
- `POST /api/tasks` - Create new task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)
- `GET /api/tasks/:id` - Get specific task (protected)
- `GET /api/tasks/stats` - Get task statistics (protected)

## 🔐 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: API endpoints protected against abuse
- **Input Validation**: All inputs validated and sanitized
- **Environment Variables**: Sensitive data stored in environment variables
- **CORS Configuration**: Proper cross-origin resource sharing setup

## 🎨 UI Features

- Responsive design that works on desktop and mobile
- Loading states for better user experience
- Form validation with error messages
- Toast notifications for user feedback
- Clean and modern interface

## 🚀 Deployment

### Backend Deployment (Render/Railway)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Connect your GitHub repository
2. Set build directory to `build`
3. Add environment variables
4. Deploy

## 🧪 Testing

Run tests for backend:
```bash
cd backend
npm test
```

Run tests for frontend:
```bash
cd frontend
npm test
```

copy env file
```bash
cp .env.example .env
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Ghanshyam Singh**

- GitHub: [@ghanshyam2005singh](https://github.com/ghanshyam2005singh)
- Email: ghanshyam2005singh@gmail.com

## 🙏 Acknowledgments

- Create React App for the frontend boilerplate
- Express.js community for excellent documentation
- MongoDB for the flexible database solution

---

**Demo Credentials for Testing:**
- Email: demo@example.com
- Password: Demo123!

**Live Demo:** [Task Manager App](https://task-manager-rust-rho.vercel.app/login)