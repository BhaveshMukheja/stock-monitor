const express = require('express');
const router = express.Router();

const {
  signup, 
  signin, 
  logout, 
  addToWishlist, 
  removeFromWishlist, 
  fetchUser
} = require('../controllers/userController');

const isLoggedIn = require('../middlewares/isLoggedIn');

// Route for user signup
router.route('/signup').post(signup);

// Route for user signin
router.route('/signin').post(signin);

// Route for user logout
router.route('/logout').get(logout);

// Route to add a stock to the user's wishlist, requires user to be logged in
router.route('/add/:id').put(isLoggedIn, addToWishlist);

// Route to remove a stock from the user's wishlist, requires user to be logged in
router.route('/remove/:id').put(isLoggedIn, removeFromWishlist);

// Route to fetch user data, requires user to be logged in
router.route('/user/:id').post(isLoggedIn, fetchUser);

module.exports = router;
