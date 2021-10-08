const express = require('express')
const router = express.Router();

const { newSuppliers, getSuppliers, getSingleSupplier, updateSingleSupplier, deleteSingleSupplier } =
 require('../controllers/supplierController')

router.route('/suppliers/new').post(newSuppliers);

router.route('/suppliers').get(getSuppliers);

router.route('/suppliers/:id').get(getSingleSupplier);

router.route('/suppliers/update/:id').put(updateSingleSupplier);

router.route('/suppliers/delete/:id').delete(deleteSingleSupplier);

module.exports = router;