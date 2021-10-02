const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'Please enter offer description']
    },

    endDate: {
        type: String,
        required: [true, 'Please enter offer ending date']
    },

    price: {
        type: Number,
        required:[true, 'Please enter offer price'],
        default: 0.0
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
    }
})

module.exports = mongoose.model('Offer', offerSchema)