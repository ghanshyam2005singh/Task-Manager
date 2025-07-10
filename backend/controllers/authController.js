const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  const existing = await User.findOne({ email });
  if (existing)
    return res.status(400).json({ message: 'Email already registered' });

  const user = await User.create({ name, email, password });
  const token = generateToken(user);

  res.status(201).json({
    user: { id: user._id, name: user.name, email: user.email },
    token,
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.status(400).json({ message: 'Invalid credentials' });

  const token = generateToken(user);

  res.status(200).json({
    user: { id: user._id, name: user.name, email: user.email },
    token,
  });
};

exports.profile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json({ user });
};