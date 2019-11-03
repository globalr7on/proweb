const mongoose = require('mongoose');
//const bodyParser = require('body-parser');

const personSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    birthday: Date,
    phonenumber: String,
    address: String,
    gender: { type: String, enum: ['Masculino', 'Femenino', 'otros'] },
    city: String,
    province: String,
    county: String,
    postalcode: String,
    emailadress: String
});

module.exports = mongoose.model('Person', personSchema);
