const suppliedItem = require('../models/supplied_items')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')

//create new product that will go to /api/v1/supplied_items/new (see /routes/supplied_items.js)
exports.newS_Items = catchAsyncErrors( async (req, res, next) => {
    const supplied_items = await suppliedItem.create(req.body);
    
    res.status(202).json({
        success:true,
        supplied_items
    })
})


//Getting all the supplied items -> /api/v1/suppliedItems (see /routes/supplied_items.js)
//This will show the total number of documents, and all the documents
exports.getS_Items = catchAsyncErrors( async(req, res, next) => {

    const resPerPage = 2; //number of results to be shown on a page
    const totItemCount = await suppliedItem.countDocuments(); //count all the documents in suppliedItem

    const apiFeatures = new APIFeatures(suppliedItem.find(), req.query).search().filter().pagination(resPerPage)

    // const supplied_item = await suppliedItem.find();
    const supplied_item = await apiFeatures.query;

    res.status(200).json({
        success: true,
        
        totItemCount,
        supplied_item
    })
})



//Getting details of a single supplied item -> /api/v1/suppliedItems/:id (see /routes/supplied_items.js)
exports.getSingleS_Items = catchAsyncErrors( async(req, res, next) => {

    const Ssupplied_item = await suppliedItem.findById(req.params.id);

    if(!Ssupplied_item) {
        // //do NOT return any value
        // res.status(404).json({
        //     success: false,
        //     message: 'No supplied items were found for the ID you entered'
    // })
        return next(new ErrorHandler('Supplied item not found', 404));
    }
    else {

        res.status(205).json({
            success: true,
            Ssupplied_item
        })
    }
})



//Finding a supplied item by its ID and updating details of it -> /api/v1/suppliedItems/:ID
exports.updateSingleS_Item = catchAsyncErrors( async(req, res, next) => {
    let uSuppliedItem = await suppliedItem.findById(req.params.id);

    if(!uSuppliedItem) {
        //do NOT return any value
    //     res.status(404).json({
    //         success: false,
    //         message: 'No supplied items were found for the ID you entered'
    // })
        return next(new ErrorHandler('Supplied item not found', 404));
    }

    uSuppliedItem = await suppliedItem.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(206).json({
        success: true,
        uSuppliedItem
    })
    
})



//Finding a supplied item by its ID and deleting it -> /api/v1/suppliedItems/:ID
exports.deleteSingleS_Item = catchAsyncErrors( async(req, res, next) => {
    const dSuppliedItem = await suppliedItem.findById(req.params.id);

    if(!dSuppliedItem) {
        //do NOT return any value
    //     return res.status(404).json({
    //         success: false,
    //         message: 'No supplied items were found for the ID you entered'
    // })
        return next(new ErrorHandler('Supplied item not found', 404));
    }
    
    await dSuppliedItem.remove();

    res.status(207).json({
        success: true,
        message: 'Supplied Item is deleted.'
    })

})