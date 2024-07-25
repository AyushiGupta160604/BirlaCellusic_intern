import React from 'react';
import '../css/dashboard.css'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const UserDashboard = () => {
    return (
      <div id='Dashboardoptions'>
        {/* <h2>User Dashboard</h2> */}
        <Navbar />
        <ul id='list'>
            <li>
              <Link to="/new-request">Job Request</Link>
            </li>
            <li> | </li>
            <li>
              <Link to="/history">My History</Link>
            </li>
            <li> | </li>
            <li>
              <Link to="/">Logout</Link>
            </li>
        </ul>
      </div>
  );
};

export default UserDashboard;