const mongoose = require('mongoose');

const connectDb = async (url) => {
    console.log("successfully connected to the database");
    try {
        await mongoose.connect(url);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectDb;