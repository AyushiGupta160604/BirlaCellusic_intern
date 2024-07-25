const mongoose = require('mongoose');

const agencySchema = new mongoose.Schema({
  number: { type: Number, required: true },
  agencyName: { type: String, required: true },
  contractor: { type: String, required: true },
  contractorName: { type: String, required: true },
  wages: { type: Number, required: true }
});

module.exports = mongoose.model('Agency', agencySchema);