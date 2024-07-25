import React from 'react';
import '../css/dashboard.css'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Setup = () => {
    return (
        <div className="setup">
            <Navbar />
            <ul id='list'>
                <li>
                    <Link to="/agency">Agency Master</Link>
                </li>
                <li> | </li>
                <li>
                    <Link to="/house">House Master</Link>
                </li>
                <li> | </li>
                <li>
                    <Link to="/colony">Colony Master</Link>
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
 
export default Setup;