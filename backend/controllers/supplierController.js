const supplier = require('../models/suppliers')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')

//create record for new supplier that will go to /api/v1/suppliers/new (see /routes/suppliers.js)
exports.newSuppliers = catchAsyncErrors (async (req, res, next) => {
    const suppliers = await supplier.create(req.body);

    res.status(200).json({
        success:true,
        suppliers
    })
})

//Getting information of all the suppliers -> /api/v1/suppliers (see /routes/suppliers.js)
//This will show the total number of documents, and all the documents
exports.getSuppliers = catchAsyncErrors (async(req, res, next) => {
    
    const resPerPage = 5; //number of results to be shown on a page
    const totSuppliers = await supplier.countDocuments();//count all the documents in suppliers

    const apiFeatures = new APIFeatures(supplier.find(), req.query).search2().filter().pagination(resPerPage)

    //const suppliers = await supplier.find();

    const suppliers = await apiFeatures.query;

    res.status(203).json({
        success: true,
        // count: suppliers.length,
        totSuppliers,
        suppliers
    })
})

//Getting details of a single supplier -> /api/v1/suppliers/:id (see /routes/suppliers.js)
exports.getSingleSupplier = catchAsyncErrors (async(req, res, next) => {

    const Ssupplier = await supplier.findById(req.params.id);

    if(!Ssupplier) {
        //do NOT return any value
        res.status(404).json({
            success: false,
            message: 'No suppliers were found for the ID you entered'
        })
    }
    else {

        res.status(205).json({
            success: true,
            Ssupplier
        })
    }
})

//Finding a supplier by his/her ID and updating their details -> /api/v1/suppliers/:ID
exports.updateSingleSupplier = catchAsyncErrors (async(req, res, next) => {
    let uSupplier = await supplier.findById(req.params.id);

    if(!uSupplier) {
        //do NOT return any value
        res.status(404).json({
            success: false,
            message: 'No suppliers were found for the ID you entered'
    })
    } else {

        uSupplier = await supplier.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(206).json({
            success: true,
            uSupplier
        })
    }
})

//Finding a supplier by his/her ID and deleting their information -> /api/v1/suppliedItems/:ID
exports.deleteSingleSupplier = catchAsyncErrors (async(req, res, next) => {
    const dSupplier = await supplier.findById(req.params.id);

    if(!dSupplier) {
        //do NOT return any value
        return res.status(404).json({
            success: false,
            message: 'No suppliers were found for the ID you entered'
    })
    }
    
    await dSupplier.remove();

    res.status(207).json({
        success: true,
        message: 'Supplier is deleted.'
    })

})