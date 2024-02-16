const express = require('express');

// Authentication
const requireAuth = require('../middleware/requireAuth');

// Controller Function
const { addCompany, getCompany, updateCompany } = require('../controllers/companyController');

const router = express.Router();

// Require auth for all routes
router.use(requireAuth);

// Company route
router.post('/add', addCompany);
router.post('/get', getCompany);
router.post('/update/:companyId', updateCompany);


/**
 * @swagger
 * /api/company/add:
 *   post:
 *     summary: Add company
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyLogo:
 *                 type: string
 *               companyName:
 *                 type: string
 *               searchValue:
 *                 type: string
 *               userAuthorizationDomain:
 *                 type: string
 *               companyDomain:
 *                 type: string
 *               contactPersonFirstName:
 *                 type: string
 *               contactPersonLastName:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 * /api/company/get:
 *   post:
 *     summary: Get company
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 
 * /api/company/update/{companyId}:
 *   post:
 *     summary: Update company
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyLogo:
 *                 type: string
 *               companyName:
 *                 type: string
 *               searchValue:
 *                 type: string
 *               userAuthorizationDomain:
 *                 type: string
 *               companyDomain:
 *                 type: string
 *               contactPersonFirstName:
 *                 type: string
 *               contactPersonLastName:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

module.exports = router;
