const Offer = require('../models/offer')

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')

// Create new offer =>  /api/v1/admin/offer/new
exports.newOffer = catchAsyncErrors(async (req, res, next) => {

    let images = []
    if(typeof req.body.images === 'string'){
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imagesLinks = [];

    for(let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'offers'
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks

    const offer = await Offer.create(req.body);

    res.status(201).json({
        success: true,
        offer
    })
})

// Get all offers =>    /api/v1/offers
exports.getOffers = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 4;
    const offersCount = await Offer.countDocuments();

    const apiFeatures = new APIFeatures(Offer.find(), req.query)
        .searchOffer()
        .filter()
        .pagination(resPerPage)

    const offers = await apiFeatures.query;

        res.status(200).json({
            success: true,
            offersCount,
            offers
        })
   
})


// Get all offers (Admin) => /api/v1/admin/offers
exports.getAdminOffers = catchAsyncErrors ( async (req, res, next) => {

    const offers = await Offer.find();

    res.status(200).json({
        success: true,
        offers
    })

})

// Get single offer datails =>  /api/v1/offer/:id
exports.getSingleOffer = catchAsyncErrors(async (req, res, next) => {

    const offer = await Offer.findById(req.params.id);

    if(!offer) {
        return next(new ErrorHandler('Offer not found', 404));
    }

    res.status(200).json({
        success: true,
        offer
    })
})


// Update Offer =>  /api/v1/admin/offer/:id
exports.updateOffer = catchAsyncErrors(async (req, res, next) => {
    let offer = await Offer.findById(req.params.id);

    if(!offer) {
        return next(new ErrorHandler('Offer not found', 404));
    }

    let images = []
    if(typeof req.body.images === 'string'){
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if(images !== undefined) {

        // Deleting images associated with the offer
        for(let i = 0; i < offer.images.length; i++ ){
        const result = await cloudinary.v2.uploader.destroy(offer.images[i].public_id)
    }

    let imagesLinks = [];

    for(let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'offers'
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks

    }



    offer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        offer
    })

})


// Delete Offer   =>  /api/v1/admin/offer/:id
exports.deleteOffer = catchAsyncErrors(async (req, res, next) => {

    const offer = await Offer.findById(req.params.id);

    if(!offer) {
        return next(new ErrorHandler('Offer not found', 404));
    }

    // Deleting images associated with the offer
    for(let i = 0; i < offer.images.length; i++ ){
        const result = await cloudinary.v2.uploader.destroy(offer.images[i].public_id)
    }

    await offer.remove();

    res.status(200).json({
        success: true,
        message: 'Offer is deleted.'
    })
})