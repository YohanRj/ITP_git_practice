const mongoose = require('mongoose')

const suppliedItemsSchema = new mongoose.Schema({
    s_item_name: {
        type: String,
        required: [true, 'Enter name of the item'],
        enum: {
            values: [
                'Flour',
                'Sugar',
                'Icing sugar',
                'Eggs',
                'Margarine',
                'Chocolate Chips',
                'Fresh Fruit Topping',
                'Cashew Nuts',
                'Fondant'
            ],
            message: 'Please select valid value for item name'
        }
    },

    s_item_price: {
        type: Number,
        required: [true, 'Enter price of the item'],
        maxLength: [6, 'Item price cannot exceed 6 characters'],
        default: 0.00
    },

    s_item_description: {
        type: String,
        required: [false, 'Enter description for the item'],
        maxLength: [200, 'Item description cannot exceed 200 characters']
    },

    supplier_id: {
        type: String,
        required: [true, 'Enter Supplier ID'],
        maxLength: [5, 'Supplier ID cannot exceed 5 characters']
    },

    supply_items_id: {
        type: String,
        required: [true, 'Enter Supplied Item ID'],
        maxLength: [5, 'Supply ID cannot exceed 5 characters']
    },

    s_qty: {
        type: Number,
        required: [true, 'Enter quantity'],
        default: 0
    },

    sup_date: {
        type: Date,
        required: [true, 'Enter date'],
        default: Date.now
    }
})

module.exports = mongoose.model('supplied_items', suppliedItemsSchema);