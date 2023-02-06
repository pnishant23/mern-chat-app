const express = require('express')
const {registerUser, authUser, allUsers} = require('../controllers/UserController')
const protect = require('../middleware/authMiddleWare')

const router = express.Router()

//route for user register and to get all users
router.route('/').post(registerUser).get(protect, allUsers)

//route for login the user
router.route('/login').post(authUser)

module.exports = router