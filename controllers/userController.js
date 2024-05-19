const prisma = require("../prisma/index");
const { body, validationResult } = require("express-validator");
const cookieToken = require("../utils/cookieToken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// user signup

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password)
    //check

    if (!name || !email || !password) {
      throw new Error("Please enter the valid inputs");
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: secPass,
      },
    });

    //send user a token
    cookieToken(user, res);
    
  } catch (error) {
    throw new Error(error);
  }
};

//user login

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please provide email and passowrd");
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("user not found");
    }

    const match = await bcrypt.compare(password, user.password);
    // console.log(password, user.password);

    if (!match) {
      throw new Error("password is incorrect");
    }

    cookieToken(user, res);
  } catch (error) {
    throw new Error(error);
  }
};

//logout

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.json({
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
};

//add to wishlist

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
    res.json({ error: `The user with the id: ${id} does not exist` });
    throw new Error(error);
  }
};

// remove a stock from the wishlist 

exports.removeFromWishlist = async (req, res, next) => {
  const { id } = req.params;
  const stockQuote = req.body;
  const symbol = stockQuote["Global Quote"]["01. symbol"];
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    const wishlist = user.wishlist;
    if (wishlist.length == 0) {
      res.json({
        error:
          "No Stocks has been added to the wishlist yet. Add stocks to the wishlist first.",
      });
    } else {
      for (let i = 0; i < wishlist.length; i++) {
        if (wishlist[i] === symbol) {
          let spliced = wishlist.splice(i, 1);
          console.log("Removed Stock:" + spliced);
          console.log("Updated wishlist " + wishlist);
        }
        if (i == wishlist.length) {
          res.json({ error: `You haven't add ${symbol} to your wishlist yet` });
        }
      }

      
      const result = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          wishlist: wishlist,
        },
      });

      res.json(result);
    }
  } catch (error) {
    res.json({ error: `The user with the id: ${id} does not exist` });
    throw new Error(error);
  }
};
