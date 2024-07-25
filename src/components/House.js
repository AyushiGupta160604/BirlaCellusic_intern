import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../css/agency.css';

const HouseTable = () => {
  const [houses, setHouses] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentHouse, setCurrentHouse] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/houses');
      setHouses(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/houses/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting house:', error);
    }
  };

  const handleEdit = (house) => {
    setEditMode(true);
    setCurrentHouse(house);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/houses/${id}`, currentHouse);
      setEditMode(false);
      fetchData();
    } catch (error) {
      console.error('Error updating house:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentHouse({ ...currentHouse, [name]: value });
  };

  return (
    <>
    <Navbar />
    <div>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>House Number</th>
            <th>Occupant</th>
            <th>Colony</th>
            <th>Recoverable</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {houses.map((house) => (
            <tr key={house._id}>
              <td>{editMode && currentHouse._id === house._id ? <input type="text" name="code" value={currentHouse.code} onChange={handleChange} /> : house.code}</td>
              <td>{editMode && currentHouse._id === house._id ? <input type="text" name="houseNum" value={currentHouse.houseNum} onChange={handleChange} /> : house.houseNum}</td>
              <td>{editMode && currentHouse._id === house._id ? <input type="text" name="occupant" value={currentHouse.occupant} onChange={handleChange} /> : house.occupant}</td>
              <td>{editMode && currentHouse._id === house._id ? <input type="text" name="colony" value={currentHouse.colony} onChange={handleChange} /> : house.colony}</td>
              <td>
                  {editMode && currentHouse._id === house._id ? (
                    <select name="recoverable" value={currentHouse.recoverable} onChange={handleChange}>
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  ) : (
                    house.recoverable.toString()
                  )}
                </td>
              <td>
                {editMode && currentHouse._id === house._id ? (
                  <button onClick={() => handleUpdate(house._id)}>Update</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(house)}>Edit</button>
                    <button onClick={() => handleDelete(house._id)}>Delete</button>
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

export default HouseTable;