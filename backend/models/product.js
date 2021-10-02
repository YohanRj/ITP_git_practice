const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [200, 'Prodict name cannot exceed 100 characters']
    },

    smallPrice: {
        type: Number,
        default: 0.0
    },

    mediumPrice: {
        type: Number,
        default: 0.0
    },

    largePrice: {
        type: Number,
        default: 0.0
    },

    freshFruitToppingPrice: {
        type: Number,
        default: 0.0
    },

    chocolateCandiesAndCashewNutToppingPrice: {
        type: Number,
        default: 0.0
    },

    moldableFondanToppingPrice: {
        type: Number,
        default: 0.0
    },

    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },

    menu: {
        type: String,
        required: [true, 'Please select menu for this product'],
        enum: {
            values: [
                'Chocolate',
                'Fruit',
                'Cupcakes',
                'Cheese',
                'Coffee'
            ],
            message: 'Please select correct menu for the product'
        }
    },

    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Product', productSchema)