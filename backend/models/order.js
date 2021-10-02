const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({

   //user info
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    customerName:{
        type: mongoose.Schema.Types.String,
        required: true,
        ref: 'User'
    },
    phone_no:{
        type: mongoose.Schema.Types.String,
        required: true,
        ref: 'User'
    },
   
    //order items info since this is an array unique id will genarate
    orderItems:[{
        product_name: {
            type: String,
            required: true
        },

        qty:{
            type: Number,
            required: true
        },

        size: {
            type: String,
            required: true,
            enum: {
                values:[
                    '500g',
                    '1Kg',
                    '2Kg'
                ],
                message: 'Please select a Valid size. '
            }
        },

        topping: [{
            type: String,
            required: true,
            enum: {
                values:[
                    'Chocalate and Nuts',
                    'Fresh Fruits',
                    'Frosting Decoration with Sprinkles'
                ],
                message: 'Please select a Topping from given Toppings. '
            }
        }],

        product: {
            type: mongoose.Schema.Types.ObjectId,
            // required: true,
            ref: 'Product'
        },

        itemPrice: {       //(toppoing prize + size prize)*qty
            type: Number,
            required: true,
            default: 0.0
        },

    }],
 
    //payment info
    paymentInfo: {
        id: {
            type: String
        },
        paymentStatus: {
            type: String,
            required: true,
            default: 'Pending'
        }
    },

    deliveryInfo:{
        id: {
            type: String
        },

        deliveryAddress: {
            type: String,
            required: true
        },

        deliveryStatus: {
            type: String,
            default: 'Pending'
        }
    },

    
    //prices
    

    deliveryPrice: {
        type: Number,
        required: true,
        default: 100.0
    },

    totPrice: {
        type: Number,
        required: true,
        default: 0.0
    },

    //ordered date
    createdAt: {
        type: Date,
        default: Date.now
    },

    orderStatus:{
        type: String,
        required: true,
        default: 'Pending'
    }


})

module.exports = mongoose.model('Order', orderSchema)


   