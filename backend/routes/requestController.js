const express = require('express');
const router = express.Router();
const Request = require('../models/requestSchema');

// requestController.js
const sendEmail = require('./emailService');

const updateRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const updatedRequest = await Request.findByIdAndUpdate(requestId, req.body, { new: true });

    // Send email to the user
    const user = await User.findById(updatedRequest.userId); // Assuming userId is stored in request
    const emailText = `Your request has been updated:\n\n
                       Request ID: ${updatedRequest._id}\n
                       Details: ${updatedRequest.details}\n
                       ...other details...\n\n
                       Please provide your feedback: [Feedback Link]`;

    sendEmail(user.email, 'Request Update Notification', emailText);

    res.json(updatedRequest);
  } catch (error) {
    console.error('Error updating request:', error);
    res.status(500).send('Server error');
  }
};


// GET all requests
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single request by ID
router.get('/:requestId', async (req, res) => {
  const requestId = req.params.requestId;
  try {
    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }
    res.json(request);
  } catch (error) {
    console.error('Error fetching request details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST a new request
router.post('/', async (req, res) => {
  const request = new Request({
    requestDate: req.body.requestDate,
    houseNo: req.body.houseNo,
    raisedBy: req.body.raisedBy,
    agency: req.body.agency,
    contactNumber: req.body.contactNumber,
    jobDescription: req.body.jobDescription,
    status: req.body.status,
    expectedBy: req.body.expectedBy,
    expenditure: req.body.expenditure,
    actionTaken: req.body.actionTaken,
    recoverable: req.body.recoverable,
    serviceObservation: req.body.serviceObservation
  });

  try {
    const newRequest = await request.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT/update a request
router.put('/:id', async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (request == null) {
      return res.status(404).json({ message: 'Request not found' });
    }

    request.requestDate = req.body.requestDate;
    request.houseNo = req.body.houseNo;
    request.raisedBy = req.body.raisedBy;
    request.agency = req.body.agency;
    request.contactNumber = req.body.contactNumber;
    request.jobDescription = req.body.jobDescription;
    request.status = req.body.status;
    request.expectedBy = req.body.expectedBy;
    request.expenditure = req.body.expenditure;
    request.actionTaken = req.body.actionTaken;
    request.recoverable =  req.body.recoverable;
    request.serviceObservation = req.body.serviceObservation;

    const updatedRequest = await request.save();
    res.json(updatedRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an request
router.delete('/:id', async (req, res) => {
  try {
    const deletedRequest = await Request.findByIdAndDelete(req.params.id);
    if (!deletedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.json({ message: 'Request deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;