//import required packages
const doteenv = require('dotenv');
doteenv.config();
const mongoose = require('mongoose');
const Customer = require('./models/customer.js');



const connect = async () => {

    //connect the mongoose obj to the database using the .env variable
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await runQueries();

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
}


//run queries
const runQueries = async () => {
    console.log('Queries running.');

    const newCustomerData = {
        name: 'Timmy',
        age: 25
    }

    await Customer.create(newCustomerData);

    const customers = await Customer.find();
    console.log(customers);
}

connect();