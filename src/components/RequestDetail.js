import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/requestDetail.css';
import Navbar from './Navbar';

const RequestDetail = () => {
  const { requestId } = useParams();
  const [request, setRequest] = useState(null);
  const navigate = useNavigate();
  const [houseMap, setHouseMap] = useState({});
  const [agencyMap, setAgencyMap] = useState({});

  useEffect(() => {
    fetchRequestDetails();
    fetchHouseMap();
    fetchAgencyMap();
  }, [requestId]);

  const fetchRequestDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/requests/${requestId}`);
      setRequest(response.data);
    } catch (error) {
      console.error('Error fetching request details:', error);
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

const fetchAgencyMap = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/agencies');
      const agencyMap = {};
      response.data.forEach(agency => {
        agencyMap[agency._id] = agency.agencyName;
      });
      setAgencyMap(agencyMap);
    } catch (error) {
      console.error('Error fetching agency map:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/requests/${request._id}`, request);
      alert('Request updated successfully!');
      console.log('Form submitted:', request);

      navigate('/request-status');
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRequest({ ...request, [name]: value });
  };

  if (!request) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Navbar />
    <div className="request-detail-container">
      <h2>Request Detail - {request._id}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Request No.:</label>
          <input type="text" value={request._id} readOnly />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input type="text" value={new Date(request.requestDate).toLocaleDateString()} readOnly />
        </div>
        <div className="form-group">
          <label>House No.:</label>
          <input type="text" value={houseMap[request.houseNo]} readOnly />
        </div>
        <div className="form-group">
          <label>Agency:</label>
          <input type="text" value={agencyMap[request.agency]} readOnly />
        </div>
        <div className="form-group">
          <label>Contact No.:</label>
          <input type="text" value={request.contactNumber} readOnly />
        </div>
        <div className="form-group">
          <label>Complaint:</label>
          <textarea value={request.jobDescription} readOnly />
        </div>
        <div className="form-group">
          <label>Service Observation:</label>
          <textarea
            name="serviceObservation"
            value={request.serviceObservation}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Action Taken:</label>
          <textarea
            name="actionTaken"
            value={request.actionTaken}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Expected Date:</label>
          <input
            type="date"
            name="expectedBy"
            value={request.expectedBy}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select
            name="status"
            value={request.status}
            onChange={handleChange}
          >
            <option value="Attended">Attended</option>
            <option value="Pending">Pending</option>
            <option value="Debarred">Debarred</option>
          </select>
        </div>
        <div className="form-group">
          <label>Expenditure:</label>
          <input
            type="number"
            name="expenditure"
            value={request.expenditure}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Recoverable:</label>
          <select
            name="recoverable"
            value={request.recoverable}
            onChange={handleChange}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="button-group">
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
          <button onClick={() => navigate('/request-status')} type="button">Exit</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default RequestDetail;