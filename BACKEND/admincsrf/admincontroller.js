import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;

const secretKey = 'secretKey'; // Change this for production

// Simulate a database user
const validUser = { username: 'admin', password: 'password123' };
const validOtp = '123456'; // For demonstration purposes

// Send OTP
export const sendOtp = (req, res) => {
  const { username, password } = req.body;
  
  if (username === validUser.username && password === validUser.password) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Generated OTP:', otp); // Log the OTP for testing
    // You can send OTP via email here (using nodemailer) or directly to the client
    res.status(200).json({ success: true, otpmessage: 'OTP sent to your email.' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid username or password.' });
  }
};

// Verify OTP
export const verifyOtp = (req, res) => {
  const { username, otp } = req.body;
  
  if (username === validUser.username && otp === validOtp) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, message: 'Invalid OTP.' });
  }
};

// Admin Login
export const adminLogin = (req, res) => {
  const { username, password, otp } = req.body;
  
  if (username === validUser.username && password === validUser.password && otp === validOtp) {
    const token = sign({ username, role: 'Admin' }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ success: true, data: { token } });
  } else {
    res.status(400).json({ success: false, message: 'Invalid credentials or OTP.' });
  }
};

// Get Permission
export const getPermission = (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ success: false, message: 'No token provided.' });

  try {
    const decoded = verify(token, secretKey);
    res.status(200).json({ success: true, data: decoded.role });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token.' });
  }
};
