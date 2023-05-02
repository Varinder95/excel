const { AuthenticationError } = require("apollo-server-errors");
const jwt = require("jsonwebtoken");
const config = require('../config');

module.exports = (context) => {
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split('Bearer')[1];
        if (token) {
            const secret = config.secret;
            try {
                const user = jwt.verify(token, secret);
                return user;
            } catch (err) {
                throw new AuthenticationError('Invalid/Expired Token')
            }
        }
        throw new Error('Authentication Token must be Bearer [token]')
    } 
    throw new Error('Authorization Header must be provided')
}