const cookieParser = require('cookie-parser');
const getJwtToken = require('../helpers/getJwtToken');

/**
 * Generates a JWT token and sends it as a cookie in the response.
 * 
 * @param {Object} user - The user object containing user details.
 * @param {Object} res - The response object.
 */

const cookieToken = (user, res) => {
    // Generate a JWT token using the user's id
    const token = getJwtToken(user.id);

    // Define cookie options with expiration and httpOnly flag
    const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Expires in 3 days
        httpOnly: true // Cookie is accessible only by the web server
    };

    // Remove the password from the user object before sending the response
    user.password = undefined;

    // Send the token as a cookie and return the user object in the response
    res.status(200).cookie('token', token, options).json({
        success: true,
        token,
        user
    });
};

module.exports = cookieToken;
