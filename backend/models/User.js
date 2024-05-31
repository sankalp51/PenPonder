const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    refreshToken: String,
    roles: {
        User: {
            type: Number,
            default: 2124
        },
        Admin: Number
    },
    profilePicture: String,
    about: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    ]
});

const User = mongoose.model("User", userSchema);
module.exports = User;