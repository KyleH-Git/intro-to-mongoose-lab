//import required packages
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Customer = require('./models/customer.js');
const prompt = require('prompt-sync')();



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


const mainLoop = async () => {
    let userInput = 0;
    await mongoose.connect(process.env.MONGODB_URI);
    while(userInput !== '5'){
        console.log('\nWelcome to the CRM\n\nWhat would you like to do?');
        console.log('1. Create a customer\n2. View all customers\n3. Update a customer\n4. Delete a customer\n5. Exit\n')
        userInput = prompt('');
        if(userInput === '1'){
            console.log('\nCreate a new customer-\n')
            const name = prompt('Enter new customers name: ');
            const age = prompt('Enter new customers age: ');
            await Customer.create({
                name: name,
                age: age,
            })
        }else if(userInput === '2'){
            console.log('Here is a list of all customers-\n');
            const customerList = await Customer.find();
            for(customer of customerList){
                console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}\n`)
            }
        }else if(userInput === '3'){
            console.log('Copy and paste the id of the customer you would like to update here:');
            const inputId = prompt('');
            const specificCustomer = await Customer.findById(inputId);
            specificCustomer.name = prompt('What is the customers new name?');
            specificCustomer.age = prompt('What is the customers new age?');
            await specificCustomer.save();
        }else if(userInput === '4'){
            console.log('Copy and paste the id of the customer you would like to delete here:');
            const inputId = prompt('');
            await Customer.findByIdAndDelete(inputId);
           
        }
    }
    console.log('Exiting...');
    await mongoose.disconnect();
    process.exit();
}

mainLoop();
