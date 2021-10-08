const express = require('express')
const router = express.Router();

const { getS_Items, newS_Items, getSingleS_Items, updateSingleS_Item, deleteSingleS_Item } = require('../controllers/supldItemsController')

router.route('/suppliedItems/new').post(newS_Items);

router.route('/suppliedItems').get(getS_Items);

router.route('/suppliedItems/:id').get(getSingleS_Items);

router.route('/suppliedItems/update/:id').put(updateSingleS_Item);

router.route('/suppliedItems/delete/:id').delete(deleteSingleS_Item);

module.exports = router;