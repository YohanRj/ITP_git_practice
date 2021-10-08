const supply = require('../models/supply');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const Supply = require('../data/supplies.json');

dotenv.config({path: 'backend/config/config.env'})

connectDatabase();

const seedSupplies = async () => {
    try{
        await supply.deleteMany();
        console.log('Deleted all Supplies.');

        await supply.insertMany(Supply)
        console.log('Added all Supplies.')

        process.exit();

    } catch(error) {
        console.log(error.message);
        process.exit();
    }
}

seedSupplies()