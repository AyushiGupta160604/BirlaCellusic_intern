const express = require('express');
const router = express.Router();
const House = require('../models/houseSchema');

// GET all houses
router.get('/', async (req, res) => {
    try {
      const houses = await House.find();
      res.json(houses);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // POST a new house
router.post('/', async (req, res) => {
    const house = new House({
      code: req.body.code,
      block: req.body.block,
      houseNum: req.body.houseNum,
      occupant: req.body.occupant,
      colony: req.body.colony,
      recoverable: req.body.recoverable
    });
  
    try {
      const newHouse = await house.save();
      res.status(201).json(newHouse);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // PUT/update a house
  router.put('/:id', async (req, res) => {
    try {
      const house = await House.findById(req.params.id);
      if (house == null) {
        return res.status(404).json({ message: 'House not found' });
      }
  
      house.code = req.body.code;
      house.block = req.body.block;
      house.houseNum = req.body.houseNum;
      house.occupant = req.body.occupant;
      house.colony = req.body.colony;
      house.recoverable = req.body.recoverable;
  
      const updatedHouse = await house.save();
      res.json(updatedHouse);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // DELETE a house
  router.delete('/:id', async (req, res) => {
    try {
      const deletedHouse = await House.findByIdAndDelete(req.params.id);
      if (!deletedHouse) {
        return res.status(404).json({ message: 'House not found' });
      }
      res.json({ message: 'House deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  
  module.exports = router;