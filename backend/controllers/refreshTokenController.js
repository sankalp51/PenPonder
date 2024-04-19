const jwt = require('jsonwebtoken');
const User = require('../models/User');

const refreshTokenController = async (req, res) => {
    try {
        const cookie = req.cookies;
        if (!cookie?.jwt) return res.status(401).json({ message: "unauthorized" });

        const refreshToken = cookie.jwt;

        const user = await User.findOne({ refreshToken }).select("username").lean().exec();
        if (!user) return res.status(401).json({ message: "unauthorized" });

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || decoded.username !== user.username) {
                    return res.status(403).json({ message: "forbidden" });
                }
                const accessToken = jwt.sign(
                    { "username": decoded.username },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "40s" }
                );
                res.status(200).json({ accessToken });
            }

        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = refreshTokenController;