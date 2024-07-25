const express = require('express');
const router = express.Router();
const Agency = require('../models/agencySchema');

// GET all agencies
router.get('/', async (req, res) => {
  try {
    const agencies = await Agency.find();
    res.json(agencies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new agency
router.post('/', async (req, res) => {
  const agency = new Agency({
    number: req.body.number,
    agencyName: req.body.agencyName,
    contractor: req.body.contractor,
    contractorName: req.body.contractorName,
    wages: req.body.wages
  });

  try {
    const newAgency = await agency.save();
    res.status(201).json(newAgency);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT/update an agency
router.put('/:id', async (req, res) => {
  try {
    const agency = await Agency.findById(req.params.id);
    if (agency == null) {
      return res.status(404).json({ message: 'Agency not found' });
    }

    agency.number = req.body.number;
    agency.agencyName = req.body.agencyName;
    agency.contractor = req.body.contractor;
    agency.contractorName = req.body.contractorName;
    agency.wages = req.body.wages;

    const updatedAgency = await agency.save();
    res.json(updatedAgency);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an agency
router.delete('/:id', async (req, res) => {
  try {
    const deletedAgency = await Agency.findByIdAndDelete(req.params.id);
    if (!deletedAgency) {
      return res.status(404).json({ message: 'Agency not found' });
    }
    res.json({ message: 'Agency deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;