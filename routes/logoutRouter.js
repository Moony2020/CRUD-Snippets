/**
 * Logout Router Handler
 *
 */

const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController')

router.get('/', controller.logout)

module.exports = router
