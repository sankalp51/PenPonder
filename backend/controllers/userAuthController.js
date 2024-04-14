const bcrypt = require('bcrypt');
const DataValidation = require("../utils/dataValidation");
const User = require('../models/User');
const jwt = require('jsonwebtoken');

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
        if (!user) return res.status(404).json({ message: "No user found" });

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(400).json({ message: "Invalid password" });
        res.status(200).json({ message: "login success" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { signUpUser, logInUser };