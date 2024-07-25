import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';
import Navbar from '../components/Navbar';

const RequestStatus = () => {
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [agencyOptions, setAgencyOptions] = useState([]);
    const [houseMap, setHouseMap] = useState({});
    const [selectedAgency, setSelectedAgency] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchRequests();
        fetchAgencyOptions();
        fetchHouseMap();
    }, [location]);

    const fetchRequests = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/requests');
            setRequests(response.data);
            setFilteredRequests(response.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const fetchAgencyOptions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/agencies');
            const options = response.data.map(agency => ({
                value: agency._id,
                label: agency.agencyName
            }));
            setAgencyOptions(options);
        } catch (error) {
            console.error('Error fetching agency options:', error);
        }
    };

    const fetchHouseMap = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/houses');
            const houseMap = {};
            response.data.forEach(house => {
                houseMap[house._id] = house.houseNum;
            });
            setHouseMap(houseMap);
        } catch (error) {
            console.error('Error fetching house map:', error);
        }
    };

    const handleAgencyChange = selectedOption => {
        setSelectedAgency(selectedOption);
        if (selectedOption) {
            const filtered = requests.filter(request => request.agency === selectedOption.value);
            setFilteredRequests(filtered);
        } else {
            setFilteredRequests(requests);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleRowClick = (requestId) => {
        navigate(`/requests/${requestId}`);
    };

    return (
        <>
            <Navbar />
            <div className="status-container">
                <h2>Job Request Status</h2>
                <div className="form-group">
                    <label>Select Agency:</label>
                    <Select
                        options={agencyOptions}
                        onChange={handleAgencyChange}
                        placeholder="Select Agency"
                        isClearable
                    />
                </div>
                <table className="status-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>House No.</th>
                            <th>House Owned By</th>
                            <th>Contact No.</th>
                            <th>Status</th>
                            <th>Job Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.map(request => (
                            <tr key={request._id}>
                                <td onClick={() => handleRowClick(request._id)}>{request._id}</td>
                                <td>{formatDate(request.requestDate)}</td>
                                <td>{houseMap[request.houseNo] || 'Unknown'}</td>
                                <td>{request.raisedBy}</td>
                                <td>{request.contactNumber}</td>
                                <td>{request.status}</td>
                                <td>{request.jobDescription}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default RequestStatus;