const express = require('express');

// const suppliedItemsMod = require('./models/supplied_items');
// const suppliersMod = require('./models/suppliers');
// const supplyMod = require('./models/supply');

const app = express();

const errorMiddleware = require('./middlewares/errors');

app.use(express.json());

//importing routes for each collection
const products = require('./routes/product');
const supliedItems = require('./routes/supplied_items');
const suppliers = require('./routes/suppliers');
const supplies = require('./routes/supplies');

app.use('/api/v1', products)
app.use('/api/v1', supliedItems)
app.use('/api/v1/', suppliers)
app.use('/api/v1/', supplies)

//Middleware to handle errors
app.use(errorMiddleware);

module.exports = app