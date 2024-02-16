const express = require('express');

// controller functions
const {  signupUser, loginUser, generateQrcode, validate ,forgotPassword, passwordreset} = require('../controllers/adminController');
// const { validate } = require('../models/adminModel');

const router = express.Router()

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

router.get('/qrcode', generateQrcode);

router.post('/validate', validate);

router.post('/forgotpassword', forgotPassword);

router.post('/restpassword', passwordreset)

module.exports = router;