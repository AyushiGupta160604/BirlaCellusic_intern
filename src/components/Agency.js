import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../css/agency.css';

const AgencyTable = () => {
  const [agencies, setAgencies] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentAgency, setCurrentAgency] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/agencies');
      setAgencies(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/agencies/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting agency:', error);
    }
  };

  const handleEdit = (agency) => {
    setEditMode(true);
    setCurrentAgency(agency);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/agencies/${id}`, currentAgency);
      setEditMode(false);
      fetchData();
    } catch (error) {
      console.error('Error updating agency:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentAgency({ ...currentAgency, [name]: value });
  };

  return (
    <>
    <Navbar />
    <div>
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Agency Name</th>
            <th>Contractor</th>
            <th>Contractor Name</th>
            <th>Wages</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {agencies.map((agency) => (
            <tr key={agency._id}>
              <td>{editMode && currentAgency._id === agency._id ? <input type="text" name="number" value={currentAgency.number} onChange={handleChange} /> : agency.number}</td>
              <td>{editMode && currentAgency._id === agency._id ? <input type="text" name="agencyName" value={currentAgency.agencyName} onChange={handleChange} /> : agency.agencyName}</td>
              <td>{editMode && currentAgency._id === agency._id ? <input type="text" name="contractor" value={currentAgency.contractor} onChange={handleChange} /> : agency.contractor}</td>
              <td>{editMode && currentAgency._id === agency._id ? <input type="text" name="contractorName" value={currentAgency.contractorName} onChange={handleChange} /> : agency.contractorName}</td>
              <td>{editMode && currentAgency._id === agency._id ? <input type="text" name="wages" value={currentAgency.wages} onChange={handleChange} /> : agency.wages}</td>
              <td>
                {editMode && currentAgency._id === agency._id ? (
                  <button onClick={() => handleUpdate(agency._id)}>Update</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(agency)}>Edit</button>
                    <button onClick={() => handleDelete(agency._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default AgencyTable;