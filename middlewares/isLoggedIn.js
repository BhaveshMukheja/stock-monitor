const prisma = require('../prisma/index');
const jwt = require('jsonwebtoken');

// Middleware to check if the user is logged in
const isLoggedIn = async (req, res, next) => {
    try {
        // retrieving token fro the stored cookies 
        const token = req.cookies.token;
        if (!token) {
            res.send('Please Login');
            throw new Error('You are not logged in');
        }

        // Verfitying and decoding the fetched token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await prisma.user.findUnique({
            where: {
                id: decoded.userId,
            },
        });
        next();
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = isLoggedIn;
