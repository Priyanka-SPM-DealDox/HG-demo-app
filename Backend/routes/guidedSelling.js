const express = require('express');

//Authhentication
const requireAuth = require('../middleware/requireAuth');

//controller fuction
const { addGuidedSellingQuestions,  } = require('../controllers/guidedSellingController')
const {calculation} = require('../controllers/bid_estimation')

const router = express.Router()

//require auth for all routes
router.use(requireAuth)

//guidedSelling routes
router.post('/addGuidedSellingQuestions', addGuidedSellingQuestions);
router.post('/calculation', calculation);


module.exports = router;