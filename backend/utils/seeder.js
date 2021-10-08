const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const products = require('../data/product.json');
//product.json does not work as well

dotenv.config({path: 'backend/config/config.env'})

connectDatabase();

const seedProducts = async () => {
    try{
        await Product.deleteMany();
        console.log('Deleted products');

        await Product.insertMany(products)
        console.log('Added all products.')

        process.exit();

    } catch(error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts()