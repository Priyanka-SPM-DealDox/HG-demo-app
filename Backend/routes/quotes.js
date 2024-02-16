const express = require('express');

//Authhentication
const requireAuth = require('../middleware/requireAuth');

//controller fuction
const { addQuotes, getQuotes, updateQuotes } = require('../controllers/quotesController')

const router = express.Router()

//require auth for all routes
router.use(requireAuth)

//guidedSelling routes
router.post('/add', addQuotes);
router.post('/get', getQuotes);
router.post('/updateQuotes', updateQuotes);


module.exports = router;