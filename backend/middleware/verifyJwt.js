const jwt = require('jsonwebtoken');

const verifyJwt = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization?.startsWith("Bearer ")) {
        return res.status(401).json({ message:"No token provided" });
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
                return res.status(403).json({ message: "Invalid token" });
            }
            req.user = decoded.userInfo.username;
            req.roles = decoded.userInfo.roles;
            next();
        }
    );
};

module.exports = verifyJwt;
