import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CsrfTutorials() {
  const [csrfToken, setCsrfToken] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Fetch CSRF token on component mount
  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const response = await axios.get("http://localhost:8800/csrf-token", {
          withCredentials: true, // Include cookies for CSRF protection
        });
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error("Error fetching CSRF token", error);
      }
    };

    getCsrfToken();
  }, []);

  // Register user (No CSRF protection needed here)
  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8800/register",
        { username, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include cookies for CSRF protection
        }
      );
      setMessage(res.data.message);
    } catch (error) {
      console.error("Error during registration", error);
      setMessage("Registration failed");
    }
  };

  // Login user (CSRF protection required)
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8800/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            "xsrf-token": csrfToken, // CSRF token header
          },
          withCredentials: true, // Include cookies for CSRF protection
        }
      );
      setMessage(res.data.message);
    } catch (error) {
      console.error("Error during login", error);
      setMessage("Login failed");
    }
  };

  return (
    <div>
      <h2>User Authentication</h2>

      {/* Register Form (No CSRF token needed here) */}
      <div>
        <h3>Register</h3>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
      </div>

      {/* Login Form (CSRF token required here) */}
      <div>
        <h3>Login</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>

      <p>{message}</p>
    </div>
  );
}

export default CsrfTutorials;
