import React from 'react';
import { Link } from 'react-router-dom';
import '../css/loginSelection.css';

const LoginSelection = () => {
    return (
        <div id='style'>
            <div>
                <h2>Login as:</h2>
                <ul>
                    <li>
                        <Link to="/user-login">User</Link>
                    </li>
                    <li>
                        <Link to="/admin-login">Admin</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
 
export default LoginSelection;