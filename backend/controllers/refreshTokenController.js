const jwt = require('jsonwebtoken');
const User = require("../models/User");
require('dotenv').config();

const refreshTokenController = async (req, res) => {
    try {
        const cookie = req.cookies;
        if (!cookie?.jwt) return res.sendStatus(401);
        const refreshToken = cookie.jwt;
        const user = await User.findOne({ refreshToken }).select("email").lean().exec();
        if (!user) return res.sendStatus(403);

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || decoded.email !== user.email) return res.sendStatus(401);
                const accessToken = jwt.sign(
                    { "email": decoded.email },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "30s" }
                );
                res.json({ accessToken });

            }
        )
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

module.exports = refreshTokenController;