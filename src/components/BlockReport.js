import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const BlockReport = () => {
  const [houseData, setHouseData] = useState([]);
  const [requestData, setRequestData] = useState([]);
  const [houseMap, setHouseMap] = useState({});

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [houseResponse, requestResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/houses'),
          axios.get('http://localhost:5000/api/requests')
        ]);
        setHouseData(houseResponse.data);
        setRequestData(requestResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    fetchHouseMap();
  }, []);

  const groupByBlock = (data) => {
    return data.reduce((acc, item) => {
      const block = item.block;
      if (!acc[block]) {
        acc[block] = [];
      }
      acc[block].push(item);
      return acc;
    }, {});
  };

  const groupedData = groupByBlock(houseData);
  console.log('Grouped Data:', groupedData);
  console.log('House Data:', houseData);
console.log('Request Data:', requestData);
console.log('Grouped Data:', groupedData);


  return (
    <>
      <Navbar />
      <div>
        <h1>Block Wise Report</h1>
        {Object.keys(groupedData).map(block => (
          <div key={block}>
            <h2>{block} Block</h2>
            {groupedData[block].map(house => {
              const houseRequests = requestData.filter(request => houseMap[request.houseNo] == house.houseNum);
              return (
                <div key={house._id}>
                  <h3>House No. {house.houseNum}</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Expected By</th>
                        <th>Expenditure</th>
                        <th>Status</th>
                        <th>Job Description</th>
                        <th>Action Taken</th>
                      </tr>
                    </thead>
                    <tbody>
                      {houseRequests.map(request => (
                        <tr key={request._id}>
                          <td>{request._id}</td>
                          <td>{new Date(request.requestDate).toLocaleDateString()}</td>
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
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};


export default BlockReport;