import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import axios from 'axios';
import '../css/request.css';
import Navbar from '../components/Navbar';
import { useAuth } from '../AuthContext';

const NewRequest = () => {
    const { currentUser } = useAuth();  // Get the current user from context
    console.log('Current User:', currentUser);

    const [requestDate, setRequestDate] = useState(new Date());
    const [houseNo, setHouseNo] = useState('');
    const [agency, setAgency] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [houseOptions, setHouseOptions] = useState([]);
    const [agencyOptions, setAgencyOptions] = useState([]);
    
    useEffect(() => {
        fetchHouseOptions();
        fetchAgencyOptions();
    }, []);

    useEffect(() => {
        if (!currentUser) {
            alert('You need to be logged in to create a new request.');
            // Redirect to login page or take other appropriate action
        }
    }, [currentUser]);

    const fetchHouseOptions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/houses');
            const options = response.data.map(house => ({
                value: house._id,
                label: house.houseNum
            }));
            setHouseOptions(options);
        } catch (error) {
            console.error('Error fetching house options:', error);
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

    const handleDateChange = date => {
        setRequestDate(date);
    };

    const handleHouseChange = selectedOption => {
        setHouseNo(selectedOption.value);
    };

    const handleAgencyChange = selectedOption => {
        setAgency(selectedOption.value);
    };

    const handleSubmit = async event => {
        event.preventDefault();

        if (!currentUser) {
            alert('User not logged in');
            return;
        }

        const newRequest = {
            requestDate,
            houseNo,
            raisedBy: currentUser.name,  // Use currentUser's name
            agency,
            contactNumber,
            jobDescription
        };

        try {
            await axios.post('http://localhost:5000/api/requests', newRequest);
            alert('Request submitted successfully!');
            handleReset();
        } catch (error) {
            console.error('Error submitting request:', error);
            alert('Failed to submit request.');
        }
    };

    const handleReset = () => {
        setRequestDate(new Date());
        setHouseNo('');
        setAgency('');
        setContactNumber('');
        setJobDescription('');
    };

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <Navbar />
        <div className="job-request-container">
            <h2>Job Request Table</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Request Date:</label>
                    <DatePicker
                        selected={requestDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>House No.:</label>
                    <Select
                        options={houseOptions}
                        onChange={handleHouseChange}
                        placeholder="Select House No."
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Raised By:</label>
                    <input
                        type="text"
                        value={currentUser.name}  // Set to currentUser's name
                        disabled
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Agency:</label>
                    <Select
                        options={agencyOptions}
                        onChange={handleAgencyChange}
                        placeholder="Select Agency"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Contact Number:</label>
                    <input
                        type="text"
                        value={contactNumber}
                        onChange={e => setContactNumber(e.target.value)}
                        placeholder="Enter Contact Number"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Job Description:</label>
                    <textarea
                        value={jobDescription}
                        onChange={e => setJobDescription(e.target.value)}
                        rows="4"
                        placeholder="Enter Job Description"
                        className="form-control"
                    />
                </div>
                <div className="button-group">
                    <button type="submit" className="submit-btn">Submit</button>
                    <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
                    <button type="button" className="exit-btn">Exit</button>
                </div>
            </form>
        </div>
        </>
    );
};

export default NewRequest;