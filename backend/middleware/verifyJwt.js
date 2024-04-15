const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJwt = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) return res.status(401).json({ message: "Unauthorized" });
        console.log(authHeader);

        const token = authHeader.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Token not provided" });

        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.status(403).json({ message: "Forbidden" });
                req.user = decoded.email;
                next();
            }
        )
    } catch (error) {
        res.status(403).json({ message: "Forbidden" });
    }
}

module.exports = verifyJwt;
