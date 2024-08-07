const bcrypt = require("bcrypt");
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const USER_ROLES = require("../config/user_roles");

const logIn = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ message: "username and password are required" });

        const foundUser = await User.findOne({ username }).select("-refreshToken").lean().exec();
        if (!foundUser) return res.status(404).json({ message: "No such user found" });

        const validPassword = await bcrypt.compare(password, foundUser.password);
        if (!validPassword) return res.status(401).json({ message: "Invalid password" });

        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign(
            {
                "userInfo": {
                    "username": username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1d" }
        );

        const refreshToken = jwt.sign(
            { "username": username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        );
        await User.findOneAndUpdate({ username }, { refreshToken }).lean().exec();
        res.cookie(
            "jwt",
            refreshToken,
            {
                httpOnly: true,
                sameSite: "None",
                secure: true,
                maxAge: 24 * 60 * 60 * 1000
            }
        );
        const user = foundUser.username;
        res.status(200).json({ accessToken, roles, user });



    } catch (error) {
        next(error);
    }
}

const signUp = async (req, res, next) => {
    try {
        const { firstName, lastName, username, password, role } = req.body;
        if (!username || !password || !firstName || !lastName) return res.status(400).json({ message: "Enter valid details" });
        if (password.length < 8) return res.status(400).json({ message: "length of password must be 8 or more characters" });

        const duplicates = await User.findOne({ username }).lean().exec();
        if (duplicates) return res.status(409).json({ message: "User already exists" });

        const hashPwd = await bcrypt.hash(password, 10);
        let newUser;
        if (role === USER_ROLES.Admin) {
            newUser = new User({ firstName, lastName, username, password: hashPwd, roles: { Admin: role } });
        }
        else {
            newUser = new User({ firstName, lastName, username, password: hashPwd });
        }
        await newUser.save();
        res.status(201).json({ message: "user created successfully" });

    } catch (error) {
        next(error);
    }
}

const logOut = async (req, res, next) => {
    try {
        const cookie = req.cookies;
        if (!cookie?.jwt) return res.sendStatus(204);

        const refreshToken = cookie.jwt;

        const user = await User.findOne({ refreshToken }).lean().exec();
        if (user) {
            await User.findOneAndUpdate({ username: user.username }, { refreshToken: "" }).lean().exec();
        }

        res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

module.exports = { logIn, signUp, logOut };