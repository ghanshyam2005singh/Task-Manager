const { verifyToken } = require('../config/jwt');
const User = require('../models/User');
const { sendErrorResponse } = require('../utils/responseHelper');

const auth = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Check for token in cookies
    else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return sendErrorResponse(res, 'Access denied. No token provided.', 401);
    }

    try {
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return sendErrorResponse(res, 'User not found', 401);
      }

      if (!user.isActive) {
        return sendErrorResponse(res, 'User account is deactivated', 401);
      }

      req.user = user;
      next();
    } catch (jwtError) {
      return sendErrorResponse(res, 'Invalid token', 401);
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return sendErrorResponse(res, 'Authentication failed', 500);
  }
};

// Optional auth middleware (doesn't throw error if no token)
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (token) {
      try {
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id).select('-password');
        if (user && user.isActive) {
          req.user = user;
        }
      } catch (jwtError) {
        // Silent fail for optional auth
      }
    }

    next();
  } catch (error) {
    next();
  }
};

module.exports = { auth, optionalAuth };