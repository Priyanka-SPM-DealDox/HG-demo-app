const express = require('express')
//Authentication 
const requireAuth = require('../middleware/requireAuth')
// controller functions
const { addAccount, getAccount, updateAccount, deleteAccount } = require('../controllers/accountController')

const router = express.Router()

// require auth for all routes
router.use(requireAuth)

// Accounts route
router.post('/add', addAccount);

router.get('/get', getAccount);

router.post('/update/:accountId', updateAccount);

router.post('/delete/:accountId', deleteAccount);

// router.get('/getuserdata', getUsersData);

/**
 * @swagger
 * /api/accounts/add:
 *   post:
 *     summary: Add Account
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accounts:
 *                 type: string
 *               owner:
 *                 type: string
 *               parent_account:
 *                 type: string
 *               description:
 *                 type: string
 *               region:
 *                 type: string
 *               industry:
 *                 type: string
 *               vertical:
 *                 type: string
 *               type:
 *                 type: string
 *               billing_street1:
 *                 type: string
 *               billing_street2:
 *                 type: string
 *               billing_city:
 *                 type: string
 *               billing_state:
 *                 type: string
 *               billing_zip:
 *                 type: number
 *               billing_country:
 *                 type: string
 *               billing_phone:
 *                 type: number
 *               shipping_street1:
 *                 type: string
 *               shipping_street2:
 *                 type: string
 *               shipping_city:
 *                 type: string
 *               shipping_state:
 *                 type: string
 *               shipping_zip:
 *                 type: number
 *               shipping_country:
 *                 type: string
 *               shipping_phone:
 *                 type: number
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
 * /api/accounts/get:
 *   get:
 *     summary: Get Account Data
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
 *                       accounts:
 *                         type: string
 *                       owner:
 *                         type: string
 *                       parent_account:
 *                         type: string
 *                       description:
 *                         type: string
 *                       region:
 *                         type: string
 *                       industry:
 *                         type: string
 *                       vertical:
 *                         type: string
 *                       type:
 *                         type: string
 *                       billing_street1:
 *                         type: string
 *                       billing_street2:
 *                         type: string
 *                       billing_city:
 *                         type: string
 *                       billing_state:
 *                         type: string
 *                       billing_zip:
 *                         type: number
 *                       billing_country:
 *                         type: string
 *                       billing_phone:
 *                         type: number
 *                       shipping_street1:
 *                         type: string
 *                       shipping_street2:
 *                         type: string
 *                       shipping_city:
 *                         type: string
 *                       shipping_state:
 *                         type: string
 *                       shipping_zip:
 *                         type: number
 *                       shipping_country:
 *                         type: string
 *                       shipping_phone:
 *                         type: number
 *                 message:
 *                   type: string
 * /api/accounts/update/{accountId}:
 *   post:
 *     summary: Update Account
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         description: ID of the account to be updated
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accounts:
 *                 type: string
 *               owner:
 *                 type: string
 *               parent_account:
 *                 type: string
 *               description:
 *                 type: string
 *               region:
 *                 type: string
 *               industry:
 *                 type: string
 *               vertical:
 *                 type: string
 *               type:
 *                 type: string
 *               billing_street1:
 *                 type: string
 *               billing_street2:
 *                 type: string
 *               billing_city:
 *                 type: string
 *               billing_state:
 *                 type: string
 *               billing_zip:
 *                 type: number
 *               billing_country:
 *                 type: string
 *               billing_phone:
 *                 type: number
 *               shipping_street1:
 *                 type: string
 *               shipping_street2:
 *                 type: string
 *               shipping_city:
 *                 type: string
 *               shipping_state:
 *                 type: string
 *               shipping_zip:
 *                 type: number
 *               shipping_country:
 *                 type: string
 *               shipping_phone:
 *                 type: number
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
 * /api/accounts/delete/{accountId}:
 *   post:
 *     summary: Delete Account
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         description: ID of the account to be deleted
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
 *  securitySchemes:
 *    bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */

module.exports = router;