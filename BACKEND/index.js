import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
const port = 8800;

// CSRF Protection middleware
const csrfProtection = csrf({
  cookie: { httpOnly: true, secure: false, maxAge: 3600000 }, // CSRF token cookie
  value: (req) => req.headers['xsrf-token'], // Read CSRF token from header
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5174", "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(cookieParser());


// Database connection
mongoose
.connect("mongodb://localhost:27017/csrfdb")
.then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
const User = mongoose.model('User', UserSchema);

// CSRF token route
app.get('/csrf-token', csrfProtection, (req, res) => {
  res.send({ csrfToken: req.csrfToken() });
});

// User Registration Route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send({ message: 'User already exists' });
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  res.status(201).send({ message: 'User registered successfully' });
});

// User Login Route
app.post('/login', csrfProtection, async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({ message: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send({ message: 'Invalid credentials' });
  }

  // Here we don't use sessions, so we just send a success message
  res.send({ message: 'Login successful' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});