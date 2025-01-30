import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate
  const baseurl = 'http://localhost:8000'; // Your base URL

  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const response = await fetch(baseurl + '/admin/csrf-token', {
          method: 'GET',
          credentials: 'include', // Include cookies for CSRF protection
        });
        const data = await response.json();
        setCsrfToken(data.csrfToken); // Set CSRF token from the response
      } catch (error) {
        console.error("Error fetching CSRF token", error);
      }
    };

    getCsrfToken();
  }, []); // Only run once when the component is mounted

  const handleLogin = async () => {
    try {
      const response = await fetch(baseurl + '/admin/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xsrf-token': csrfToken, // CSRF token header
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include', // Include cookies for CSRF protection
      });

      const data = await response.json();

      if (data.success) {
        setOtpSent(true);
        alert(data.otpmessage); // Notify user OTP sent
      } else {
        alert(data.message); // Display error if login failed
      }
    } catch (error) {
      alert('An error occurred');
    }
  };

  // Handle OTP verification
  const verifyOtp = async () => {
    try {
      const response = await fetch(baseurl + '/admin/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xsrf-token': csrfToken, // CSRF token header
        },
        body: JSON.stringify({ username, otp }),
        credentials: 'include', // Include cookies for CSRF protection
      });

      const data = await response.json();

      if (data.success) {
        setOtpVerified(true);
        loginWithPermission(); // Proceed to login with permission if OTP is verified
      } else {
        alert(data.message); // Notify if OTP verification failed
      }
    } catch (error) {
      alert('An error occurred');
    }
  };

  // Handle admin login after OTP verification
  const loginWithPermission = async () => {
    try {
      const response = await fetch(baseurl + '/admin/adminlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xsrf-token': csrfToken, // CSRF token header
        },
        body: JSON.stringify({ username, password, otp }),
        credentials: 'include', // Include cookies for CSRF protection
      });

      const data = await response.json();

      if (data.success) {
        // Store the token in local storage
        localStorage.setItem('token', data.data.token);
        navigate('/eaf-tracker'); // Navigate to EAF Tracker page after successful login
      } else {
        alert(data.message); // Notify if admin login failed
      }
    } catch (error) {
      alert('An error occurred');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleLogin}>Login</button>

      {otpSent && (
        <div>
          <input 
            type="text" 
            placeholder="Enter OTP" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
      )}
    </div>
  );
};

export default Login;
