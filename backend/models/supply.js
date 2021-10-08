const mongoose = require('mongoose')

const supplySchema = new mongoose.Schema({
    supplier_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Enter supplier\'s ID'],
        // ref: 'supplier'
    },
    supply_item_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Enter supplied item\'s ID'],
        // ref: 'supplied_items'
    }
})

module.exports = mongoose.model('supply', supplySchema);