const express = require('express')
const router = express.Router();

const { 
    getOffers,
    getAdminOffers, 
    newOffer, 
    getSingleOffer, 
    updateOffer, 
    deleteOffer 

} = require('../controllers/offerController')

router.route('/offers').get(getOffers);
router.route('/admin/offers').get(getAdminOffers);
router.route('/offer/:id').get(getSingleOffer);

router.route('/admin/offer/new').post(newOffer);

router.route('/admin/offer/:id')
    .put(updateOffer)
    .delete(deleteOffer);

module.exports = router;