const express = require('express');
const {addShop} = require('../controllers/shopController'); 

const router = express.Router();

router.post('shop/add', addShop);

module.exports = router;
