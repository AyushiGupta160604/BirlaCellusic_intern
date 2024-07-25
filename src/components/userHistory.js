// History.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useAuth } from '../AuthContext';

const History = () => {
    const { currentUser } = useAuth();  // Get the current user from context
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        if (currentUser) {
            fetchRequests();
        } else {
            alert('You need to be logged in to view your history.');
        }
    }, [currentUser]);

    const fetchRequests = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/requests?user=${currentUser.name}`);
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="history-container">
                <h2>Your Request History</h2>
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>House No.</th>
                            <th>Agency</th>
                            <th>Contact Number</th>
                            <th>Job Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request._id}>
                                <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                                <td>{request.houseNo}</td>
                                <td>{request.agency}</td>
                                <td>{request.contactNumber}</td>
                                <td>{request.jobDescription}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default History;