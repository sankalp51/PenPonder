const mongoose = require('mongoose');

const connectDb = async (url) => {
    try {
        await mongoose.connect(url);
        console.log("successfully connected to the database");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectDb;