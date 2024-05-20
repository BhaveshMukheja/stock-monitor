const jwt = require('jsonwebtoken');

// Function to generate JWT token
const getJwtToken = (userId) => {
    return jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: '1 day' });
};

module.exports = getJwtToken;
