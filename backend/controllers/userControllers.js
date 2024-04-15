const mongoose = require('mongoose');
const User = require('../models/User');


const updateUser = (req, res) => {
    try {
        res.send('user was updated')
    } catch (error) {
        res.status(400).json({ message: "bad request" });
    }
}
const getOneUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) return res.status(400).json({ message: "valid id is required" });
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "valid id is required" });

        const user = await User.findById(id).select("-refreshToken").lean().exec();
        if (!user) return res.status(404).json({ message: "No such user found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: "bad request" });
    }
}
const deleteUser = (req, res) => {
    try {
        res.send('user deleted')
    } catch (error) {
        res.status(400).json({ message: "bad request" });
    }
}

module.exports = { getOneUser, updateUser, deleteUser };