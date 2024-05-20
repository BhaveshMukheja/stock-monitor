const prisma = require("../prisma/index");
const { body, validationResult } = require("express-validator");
const cookieToken = require("../utils/cookieToken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// user signup

exports.signup = [
  // Validation
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

  async (req, res, next) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;
      console.log(name, email, password);

      const salt = await bcrypt.genSalt(saltRounds);
      const secPass = await bcrypt.hash(password, salt);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: secPass,
        },
      });

      // Send user a token
      cookieToken(user, res);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
];

// user login

exports.signin = [
  // Validation
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),

  async (req, res, next) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ error: 'Incorrect password' });
      }

      cookieToken(user, res);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
];

// logout

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// add to wishlist

exports.addToWishlist = async (req, res, next) => {
  const { id } = req.params;
  const stockQuote = req.body;
  const symbol = stockQuote["Global Quote"]["01. symbol"];
  try {
    const result = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        wishlist: {
          push: symbol,
        },
      },
    });
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: `User with ID: ${id} does not exist` });
  }
};

// remove a stock from the wishlist 

exports.removeFromWishlist = async (req, res, next) => {
  const { id } = req.params;
  const stockQuote = req.body;
  const symbol = stockQuote["Global Quote"]["01. symbol"];
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ error: `User with ID: ${id} does not exist` });
    }

    const wishlist = user.wishlist;
    if (wishlist.length === 0) {
      return res.status(400).json({ error: 'No stocks in the wishlist. Add stocks first.' });
    }

    const index = wishlist.indexOf(symbol);
    if (index === -1) {
      return res.status(400).json({ error: `Stock symbol ${symbol} not found in the wishlist` });
    }

    wishlist.splice(index, 1);

    const result = await prisma.user.update({
      where: { id },
      data: { wishlist },
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// fetch user

exports.fetchUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ error: `User with ID: ${id} does not exist` });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
