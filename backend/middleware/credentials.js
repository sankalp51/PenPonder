const allowedOrigins = require('../config/allowedOrigins');

const credentials = (req, res, next) => {
    const { origin } = req.headers;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Credentials", true);
    }
    next();
}

module.exports = credentials;