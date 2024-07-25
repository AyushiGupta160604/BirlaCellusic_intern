const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  code: { type: Number, required: true },
  block: { type: String, required: true },
  houseNum: { type: String, required: true },
  occupant: { type: String, required: true },
  colony: { type: String, required: true },
  recoverable: { type: Boolean, required: true },
});

module.exports = mongoose.model('House', houseSchema);