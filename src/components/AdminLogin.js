// UserLogin.js
import React, { useState } from 'react';
import '../css/loginSelection.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = "/admin-dashboard";
    console.log('Admin login:', { username, password });
    // Example: Send login request to backend API
  };

  return (
    <div id='style'>
      <form onSubmit={handleSubmit} id='form'>
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Username or Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;