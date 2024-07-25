const mongoose = require('mongoose');

const colonySchema = new mongoose.Schema({
  code: { type: Number, required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model('Colony', colonySchema);