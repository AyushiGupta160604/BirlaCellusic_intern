import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const AgencyReport = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { fromDate, toDate } = location.state;
  const [houseMap, setHouseMap] = useState({});
  const [agencyMap, setAgencyMap] = useState({});

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

  console.log('Received state:', { fromDate, toDate }); // Debugging log

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/agency-report', {
          params: { 
            fromDate, 
            toDate 
          }
        });
        console.log('API response:', response.data); // Debugging log
        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error('There was an error fetching the data!', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
    fetchHouseMap();
    fetchAgencyMap();
  }, [fromDate, toDate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }



  return (
    <>
    <Navbar />
    <div>
      <h1>Agency Report</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Agency Name</th>
            <th>Date</th>
            <th>House No.</th>
            <th>Expected By</th>
            <th>Expenditure</th>
            <th>Status</th>
            <th>Job Description</th>
            <th>Action Taken</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request._id}>
              <td>{request._id}</td>
              <td>{agencyMap[request.agency]}</td>
              <td>{request.requestDate ? new Date(request.requestDate).toLocaleDateString() : 'N/A'}</td>
                <td>{houseMap[request.houseNo]}</td>
                <td>{request.expectedBy ? new Date(request.expectedBy).toLocaleDateString() : 'N/A'}</td>
                <td>{request.expenditure ? request.expenditure : 'N/A'}</td>
                <td>{request.status}</td>
                <td>{request.jobDescription}</td>
                <td>{request.actionTaken ? request.actionTaken : 'N/A'}</td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default AgencyReport;