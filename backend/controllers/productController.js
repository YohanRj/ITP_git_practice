const Product = require('../models/product')
// const NoOfProducts = require('../data/product.json')

//create new product that will go to /api/v1/product/new
exports.newProduct = async (req, res, next) => {
    const product = await Product.create(req.body);
    // const idCount = (NoOfProducts.length) + 1;

    res.status(201).json({
        success: true,
        product
    })
}

exports.getProducts = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'This route will show all products in database.'
    })
}
