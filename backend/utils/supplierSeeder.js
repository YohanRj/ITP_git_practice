const supplier = require('../models/suppliers');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const Supplier = require('../data/suppliers.json');

dotenv.config({path: 'backend/config/config.env'})

connectDatabase();

const seedSuppliers = async () => {
    try{
        await supplier.deleteMany();
        console.log('Deleted all Suppliers.');

        await supplier.insertMany(Supplier)
        console.log('Added all Suppliers.')

        process.exit();

    } catch(error) {
        console.log(error.message);
        process.exit();
    }
}

seedSuppliers()