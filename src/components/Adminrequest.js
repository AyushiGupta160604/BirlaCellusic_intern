import React from 'react';
import '../css/dashboard.css'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const AdminRequest = () => {
    return (
        <div className="adminRequest">
            <Navbar />
            <ul id='list'>
                <li>
                    <Link to="/new-request">New Job Request</Link>
                </li>
                <li> | </li>
                <li>
                    <Link to="/menu">Report Menu</Link>
                </li>
                <li> | </li>
                <li>
                    <Link to="/request-status">Job Request Status</Link>
                </li>
                <li> | </li>
                <li>
                    <Link to="/admin-dashboard">Up</Link>
                </li>
                <li> | </li>
                <li>
                    <Link to="/">Logout</Link>
                </li>
            </ul>
        </div>
    );
}
 
export default AdminRequest;