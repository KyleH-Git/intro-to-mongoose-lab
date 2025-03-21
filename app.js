//import required packages
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Customer = require('./models/customer.js');
const prompt = require('prompt-sync')();

let userInput = 0;

// const connect = async (name, age) => {

//     //connect the mongoose obj to the database using the .env variable
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log('Connected to MongoDB');

//     await runQueries(name, age);

//     await mongoose.disconnect();
//     console.log('Disconnected from MongoDB');
// }

// //run queries
// const runQueries = async (name, age) => {
//     console.log('Queries running.');

//     const newCustomerData = {
//         name: name,
//         age: age,
//     }
//     await Customer.create(newCustomerData);
// }

const createCustomer = async (name, age) => {
    await mongoose.connect(process.env.MONGODB_URI);
    await Customer.create({
        name: name,
        age: age,
    })
    await mongoose.disconnect();
}

const getCustomers = async (id) => {
    await mongoose.connect(process.env.MONGODB_URI);
    if(id){
        const specificCustomer = await Customer.find({_id})
        await mongoose.disconnect();
        return specificCustomer;
    }
    const customerList = await Customer.find();
    await mongoose.disconnect();
    return customerList;
}

const updateCustomer = async (id) => {
    const newName = prompt('What is the customers new name?');
    const newAge = prompt('What is the customers new age?');
    await mongoose.connect(process.env.MONGODB_URI);
    const specificCustomer = await Customer.findByIdAndUpdate(id);
    specificCustomer.name = newName;
    specificCustomer.age = newAge;
    await specificCustomer.save();
    await mongoose.disconnect();
    
}
const deleteCustomer = async (id) => {
    await mongoose.connect(process.env.MONGODB_URI);
    await Customer.findByIdAndDelete(id);
    await mongoose.disconnect();
}

const mainLoop = async () => {
    while(userInput !== '5'){
        console.log('\nWelcome to the CRM\n\nWhat would you like to do?');
        console.log('1. Create a customer\n2. View all customers\n3. Update a customer\n4. Delete a customer\n5. Exit\n')
        userInput = prompt('');
        if(userInput === '1'){
            console.log('\nCreate a new customer-\n')
            const name = prompt('Enter new customers name: ');
            const age = prompt('Enter new customers age: ');
            await createCustomer(name, age);
        }else if(userInput === '2'){
            console.log('Here is a list of all customers-\n');
            const customerList = await getCustomers();
            for(customer of customerList){
                console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}\n`)
            }
        }else if(userInput === '3'){
            console.log('Copy and paste the id of the customer you would like to update here:');
            const inputId = prompt('');
            await updateCustomer(inputId);
        }else if(userInput === '4'){
            console.log('Copy and paste the id of the customer you would like to delete here:');
            const inputId = prompt('');
            await deleteCustomer(inputId);
        }else if(userInput === '5'){
            console.log('Exiting...');
            process.exit();
        }
    }
}


mainLoop();

