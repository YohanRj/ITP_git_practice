const mongoose = require('mongoose')

const suppliersSchema = new mongoose.Schema({
    supplier_name: {
        type: String,
        required: [true, 'Enter name of the supplier'],
        maxLength: [25, 'Supplier name cannot exceed 25 characters']
    },
    supp_nic: {
        type: String,
        required: [true, 'Enter NIC number of the supplier'],
        minLength: [10, 'Supplier NIC number must consist of at least 10 characters'],
        maxLength: [11, 'Supplier NIC number cannot exceed 11 characters']
    },
    supp_contact_no: {
        type: String,
        required: [true, 'Enter supplier\'s contact number'],
        minLength: 10,
        maxLength: 10
    },
    supp_email: {
        type: String
    },
    supp_gender: {
        type: String,
        required: [true, 'Enter gender of the supplier'],
        enum: {
            values: [
                'Male',
                'Female'
            ],
            message: 'Please select valid value for supplier\'s gender'
        }
    },
    acct_no: {
        type: String,
        required: [true, 'Enter the bank account number that the payments will be done to'],
        minLength: [8, 'Supplier bank account number should consist of at least 8 characters']
    }
})

    
module.exports = mongoose.model('supplier', suppliersSchema);