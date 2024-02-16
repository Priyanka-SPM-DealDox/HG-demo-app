const express = require('express')

//Authentication 
const requireAuth = require('../middleware/requireAuth')

// controller functions
const { addLookups, getLookups, updateLookups, getLookupsClassName } = require('../controllers/lookupsController')

const router = express.Router()

// require auth for all routes
router.use(requireAuth)

// Accounts route
router.post('/add', addLookups)
router.post('/updateLookupName', updateLookups)
router.post('/get', getLookups)
router.post('/getClassName', getLookupsClassName);

/**
 * @swagger
 * /api/lookups/add:
 *   post:
 *     summary: Add Lookups
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               class_name:
 *                 type: string
 *               parent_lookup:
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
 * /api/lookups/get:
 *   post:
 *     summary: Get Lookups
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       class_name:
 *                         type: string
 *                       parent_lookup:
 *                         type: string
 *                 message:
 *                   type: string
 * /api/lookups/updateLookupName:
 *   post:
 *     summary: Update Lookups
 *     security:
 *       - bearerAuth: []
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lookup_accesskey:
 *                 type: string
 *               class_name:
 *                 type: string
 *               parent_lookup:
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
 * /api/lookups/getClassName:
 *   post:
 *     summary: Get Lookups by name
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               class_name:
 *                 type: string
 *             required:
 *               - class_name
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       class_name:
 *                         type: string
 *                       parent_lookup:
 *                         type: string
 *                 message:
 *                   type: string
 *       204:
 *         description: No data found
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */

module.exports = router;

