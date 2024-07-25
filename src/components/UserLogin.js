import React, { useState } from 'react';
import '../css/loginSelection.css';
import { useAuth } from '../AuthContext';

const UserLogin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      if (response.ok) {
        const user = await response.json();
        login(user);
        window.location.href = "/user-dashboard";
        console.log('User login successful:', { name, email, password });
      } else {
        console.error('Failed to login');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div id='style'>
      <form onSubmit={handleSubmit} id='form'>
        <h2>User Login</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default UserLogin;