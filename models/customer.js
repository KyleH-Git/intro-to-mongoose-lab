//import required modules
const mongoose = require('mongoose');

//define the schema properties
const customerSchema = new mongoose.Schema({
    name: String,
    age: Number,
})

//create a new schema const

const Customer = mongoose.model('Customer', customerSchema);

//export the schema
module.exports = Customer;
