const express = require('express')
const router = express.Router();

const { newSupplies, getSupplies, getSingleSupply, updateSingleSupply, deleteSingleSupply } =
 require('../controllers/supplyController')

router.route('/supplies/new').post(newSupplies);

router.route('/supplies').get(getSupplies);

router.route('/supplies/:id').get(getSingleSupply);

router.route('/supplies/update/:id').put(updateSingleSupply);

router.route('/supplies/delete/:id').delete(deleteSingleSupply);

module.exports = router;