const supply = require('../models/supply');
// const suppliedItems = require('../models/supplied_items');
// const supplier = require('../models/suppliers');

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')

//create record for new supply that will go to /api/v1/supplies/new (see /routes/supplies.js)
exports.newSupplies = catchAsyncErrors (async (req, res, next) => {
    const supplies = await supply.create(req.body);

    res.status(200).json({
        success:true,
        supplies
    })
})

//Getting information of all the supplies -> /api/v1/supplies (see /routes/supplies.js)
//This will show the total number of documents, and all the documents
exports.getSupplies = catchAsyncErrors (async(req, res, next) => {

    const resPerPage = 1; //number of results to be shown on a page
    const totSupplies = await supply.countDocuments();

    const apiFeatures = new APIFeatures(supply.find(), req.query).search3().filter().pagination(resPerPage)

    // const supplies = await supply.find();

    const supplies = await apiFeatures.query;

    res.status(203).json({
        success: true,
        count: supplies.length,
        supplies
    })
})

//Getting details of a single supply -> /api/v1/supplies/:id (see /routes/suppliers.js)
exports.getSingleSupply = catchAsyncErrors (async(req, res, next) => {

    const Ssupplies = await supply.findById(req.params.id);

    if(!Ssupplies) {
        //do NOT return any value
        res.status(404).json({
            success: false,
            message: 'No supplies were found for the ID you entered'
        })
    }
    else {

        res.status(205).json({
            success: true,
            Ssupplies
        })
    }
})


//Finding a supply by its ID and updating its details -> /api/v1/supplies/:ID
exports.updateSingleSupply = catchAsyncErrors (async(req, res, next) => {
    let Usupplies = await supply.findById(req.params.id);

    if(!Usupplies) {
        //do NOT return any value
        res.status(404).json({
            success: false,
            message: 'No supplies were found for the ID you entered'
    })
    } else {

        Usupplies = await supply.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(206).json({
            success: true,
            Usupplies
        })
    }
})

//Finding a supplier by his/her ID and deleting their information -> /api/v1/suppliedItems/:ID
exports.deleteSingleSupply = catchAsyncErrors (async(req, res, next) => {
    const Dsupplies = await supply.findById(req.params.id);

    if(!Dsupplies) {
        //do NOT return any value
        return res.status(404).json({
            success: false,
            message: 'No supplies were found for the ID you entered'
    })
    }
    
    await Dsupplies.remove();

    res.status(207).json({
        success: true,
        message: 'Supply is deleted.'
    })

})