const express = require('express');
const router = express.Router();
const Colony = require('../models/colonySchema');

// GET all colonies
router.get('/', async (req, res) => {
    try {
      const colonies = await Colony.find();
      res.json(colonies);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // POST a new colony
router.post('/', async (req, res) => {
    const colony = new Colony({
      code: req.body.code,
      name: req.body.name,
    });
  
    try {
      const newColony = await colony.save();
      res.status(201).json(newColony);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // PUT/update a colony
  router.put('/:id', async (req, res) => {
    try {
      const colony = await Colony.findById(req.params.id);
      if (colony == null) {
        return res.status(404).json({ message: 'Colony not found' });
      }
  
      colony.code = req.body.code;
      colony.name = req.body.name;
  
      const updatedColony = await colony.save();
      res.json(updatedColony);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // DELETE a colony
  router.delete('/:id', async (req, res) => {
    try {
      const deletedColony = await Colony.findByIdAndDelete(req.params.id);
      if (!deletedColony) {
        return res.status(404).json({ message: 'Colony not found' });
      }
      res.json({ message: 'Colony deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  
  module.exports = router;