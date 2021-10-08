const supldItems = require('../models/supplied_items');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const suppliedItems = require('../data/product.json');

dotenv.config({path: 'backend/config/config.env'})

connectDatabase();

const seedSuppliedItems = async () => {
    try{
        await supldItems.deleteMany();
        console.log('Deleted Supplied Items.');

        await supldItems.insertMany(suppliedItems)
        console.log('Added all Supplied Items.')

        process.exit();

    } catch(error) {
        console.log(error.message);
        process.exit();
    }
}

seedSuppliedItems()