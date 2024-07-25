import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../css/agency.css';

const ColonyTable = () => {
  const [colonies, setColonies] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentColony, setCurrentColony] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/colonies');
      setColonies(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/colonies/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting colony:', error);
    }
  };

  const handleEdit = (colony) => {
    setEditMode(true);
    setCurrentColony(colony);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/colonies/${id}`, currentColony);
      setEditMode(false);
      fetchData();
    } catch (error) {
      console.error('Error updating colony:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentColony({ ...currentColony, [name]: value });
  };

  return (
    <>
    <Navbar />
    <div>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Colony Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {colonies.map((colony) => (
            <tr key={colony._id}>
              <td>{editMode && currentColony._id === colony._id ? <input type="text" name="code" value={currentColony.code} onChange={handleChange} /> : colony.code}</td>
              <td>{editMode && currentColony._id === colony._id ? <input type="text" name="name" value={currentColony.name} onChange={handleChange} /> : colony.name}</td>
              <td>
                {editMode && currentColony._id === colony._id ? (
                  <button onClick={() => handleUpdate(colony._id)}>Update</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(colony)}>Edit</button>
                    <button onClick={() => handleDelete(colony._id)}>Delete</button>
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

export default ColonyTable;