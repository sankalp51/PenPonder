const bcrypt = require('bcrypt');
const DataValidation = require("../utils/dataValidation");
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signUpUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const validation = new DataValidation(email, password);

        if (!firstName || !lastName) return res.status(400).json({ message: "First and last name is required" });
        if (!validation.isValidEmail()) return res.status(400).json({ message: "Valid email is required" });
        if (!validation.isValidPassword()) return res.status(400).json({ message: "valid password with length greater than 8 characters is required" });

        const duplicateUser = await User.findOne({ email }).select("-password").lean().exec();
        if (duplicateUser) return res.status(409).json({ message: `User with email ${email} already exists` });

        const hashPwd = await bcrypt.hash(password, 10);
        const user = new User({ firstName, lastName, email, password: hashPwd });
        await user.save();
        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const logInUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const validation = new DataValidation(email, password);

        if (!validation.isValidEmail()) return res.status(400).json({ message: "Valid email is required" });
        if (!validation.isValidPassword()) return res.status(400).json({ message: "Valid password of length greater than 8 characters required" });

        const user = await User.findOne({ email }).lean().exec();
        if (!user) return res.status(401).json({ message: "No user found" });

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(400).json({ message: "Invalid password" });

        const accessToken = jwt.sign(
            { "email": user.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30s" }
        );
        const refreshToken = jwt.sign(
            { "email": user.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        );

        await User.findOneAndUpdate({ email }, { refreshToken });
        res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 69 * 69 * 1000 });
        res.status(200).json({ accessToken });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const logOutUser = async (req, res) => {
    try {
        //on client also delete thee access token
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(204);

        const refreshToken = cookies.jwt;

        //is refreshToken in db
        const user = await User.findOne({ refreshToken }).select("-password").lean().exec();
        if (!user) {
            res.clearCookie("jwt", { httpOnly: true });
            return res.sendStatus(204);
        }

        //delete the refreshToken in the database
        await User.findOneAndUpdate({ email: user.email }, { refreshToken: "" });
        res.clearCookie("jwt", { httpOnly: true })  //secure:true during production -only servs https
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { signUpUser, logInUser, logOutUser };