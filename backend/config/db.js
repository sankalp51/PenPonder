const mongoose = require('mongoose');

const connectDb = async (url) => {
    try {
        await mongoose.connect(url);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectDb;