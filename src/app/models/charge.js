const mongoose = require('mongoose');

const chargeSchema = new mongoose.Schema({
   description: String,
});

module.exports = mongoose.model('Charge', chargeSchema);