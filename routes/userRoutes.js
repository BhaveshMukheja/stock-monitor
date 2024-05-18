const express = require('express')
const router = express.Router()

const {signup, login, logout, addToWishlist, removeFromWishlist} = require('../controllers/userController')
router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/add/:id').put(addToWishlist)
router.route('/remove/:id').put(removeFromWishlist)

module.exports = router;
