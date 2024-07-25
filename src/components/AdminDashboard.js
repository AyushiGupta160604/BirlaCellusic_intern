import React from 'react';
import '../css/dashboard.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const AdminDashboard = () => {
    return (
      <div id='Dashboardoptions'>
        {/* <h2>Admin Dashboard</h2> */}
        <Navbar />
        <ul id='list'>
            <li>
              <Link to="/setup">Setup</Link>
            </li>
            <li> | </li>
            <li>
              <Link to="/AdminRequest">Job Request</Link>
            </li>
            <li> | </li>
            <li>
              <Link to="/">Logout</Link>
            </li>
        </ul>
      </div>
  );
};

export default AdminDashboard;