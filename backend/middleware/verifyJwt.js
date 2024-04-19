const jwt = require('jsonwebtoken');

const verifyJwt = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    
    const token = authorization.split(" ")[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: "Unauthorized: Token expired" });
                }
                return res.status(403).json({ message: "Forbidden: Invalid token" });
            }
            req.user = decoded.username;
            next();
        }
    );
};

module.exports = verifyJwt;
