const express = require('express')
const router = express.Router()

const {signup, signin, logout, addToWishlist, removeFromWishlist} = require('../controllers/userController')
router.route('/signup').post(signup)
router.route('/signin').post(signin)
router.route('/logout').get(logout)
router.route('/add/:id').put(addToWishlist)
router.route('/remove/:id').put(removeFromWishlist)

module.exports = router;
