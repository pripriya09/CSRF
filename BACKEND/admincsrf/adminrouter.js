import csrf  from 'csurf';
import { Router } from 'express';

import { sendOtp, verifyOtp, adminLogin, getPermission } from './admincontroller.js';

const router = Router();

const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: false, // Set to `true` in production with HTTPS
    maxAge: 86400000, // 1 day
  },
  value: (req) => {
    // Log the CSRF token from headers
    console.log('CSRF Token from Headers:', req.headers['xsrf-token']);
    
    // Log cookies received in the request
    console.log('Cookies Received:', req.cookies);

    // Return the CSRF token from the headers
    return req.headers['xsrf-token'];
  },
});

// Add Debug Logs
router.use((req, res, next) => {
  console.log('Cookies:', req.cookies); // Logs all cookies received in the request
  console.log('Headers:', req.headers); // Logs all headers sent in the request
  next();
});

// CSRF token route
router.get('/csrf-token', csrfProtection, (req, res) => {
    res.send({ csrfToken: req.csrfToken() });
  });
  
// OTP and Admin routes with /admin prefix
router.post('/send-otp',csrfProtection,sendOtp);
router.post('/verify-otp',csrfProtection, verifyOtp);
router.post('/adminlogin', adminLogin);
router.get('/get-permission', getPermission);

export default router;
