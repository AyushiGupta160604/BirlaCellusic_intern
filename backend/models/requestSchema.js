const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    requestDate: { type: Date, required: true },
    houseNo: { type: String, required: true },
    raisedBy: { type: String, required: true },
    agency: { type: String, required: true },
    contactNumber: { type: String, required: true },
    jobDescription: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    expectedBy: { type: Date },
    expenditure: { type: Number },
    actionTaken: { type: String },
    recoverable: { type: Boolean},
    serviceObservation: { type: String }
});

module.exports = mongoose.model('Request', requestSchema);