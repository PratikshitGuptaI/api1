// const jwt = require('jsonwebtoken');
// const { promisify } = require('util');
// const sequelize = require('../config/db.js');
// const Sequelize = require('sequelize');
// const User = require('../models/user.js')
// (sequelize, Sequelize.DataTypes,
//   Sequelize.Model);
const jwt = require('jsonwebtoken');

function adminAuthMiddleware(req, res, next) {
    // Get the token from the request (e.g., from headers or cookies)
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Verify and decode the token
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' + err });
        }

        // Check if the token has expired
        const currentTimestamp = Math.floor(Date.now() / 1000); // Current Unix timestamp
        if (decoded.exp <= currentTimestamp) {
            console.log('Now Jwt is expired');
            return res.status(401).json({ message: 'Token has expired' });
        }

        // Token is valid; store user information in the request object
        req.user = decoded;
        next();
    });
}

module.exports = adminAuthMiddleware;
