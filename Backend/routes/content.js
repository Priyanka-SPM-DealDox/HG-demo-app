const express = require('express')

//Authentication 
const requireAuth = require('../middleware/requireAuth')

// controller functions
const {addContent, getContent, updateContent, deleteContent} = require('../controllers/contentController')

const router = express.Router()

// require auth for all routes
router.use(requireAuth)

// Content route
router.post('/add', addContent);

router.post('/get', getContent);

router.post('/update/:contentId', updateContent);

router.post('/delete/:contentId', deleteContent);

/**
 * @swagger
 * /api/content/add:
 *   post:
 *     summary: Add Content
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content_name:
 *                 type: string
 *               sales_org:
 *                 type: string
 *               catalog_number:
 *                 type: number
 *               catalog_category:
 *                 type: string
 *               locked:
 *                 type: boolean
 *               content:
 *                 type: string
 *               
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

 * /api/content/get:
 *   post:
 *     summary: Get Content
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contentId:
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
 *                 content:
 *                   type: object

 * /api/content/update/{contentId}:
 *   post:
 *     summary: Update Content
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contentId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content_name:
 *                 type: string
 *               sales_org:
 *                 type: string
 *               catalog_number:
 *                 type: number
 *               catalog_category:
 *                 type: string
 *               locked:
 *                 type: boolean
 *               content:
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
 
 * /api/content/delete/{contentId}:
 *   post:
 *     summary: Delete Content
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contentId
 *         required: true
 *         schema:
 *           type: string
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