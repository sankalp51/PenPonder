const fsPromisses = require("fs/promises");
const fs = require('fs');
const { format } = require("date-fns");
const path = require('path');
const { v4: uuid } = require("uuid");

const logger = async (message, fileName) => {
    try {
        const dateTime = format(new Date(), "dd-MM-yyyy  HH:mm:ss");
        const appendItem = `${dateTime}\t ${uuid()}\t ${message}`;
        if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
            await fsPromisses.mkdir(path.join(__dirname, "..", "logs"));
        }
        await fsPromisses.appendFile(path.join(__dirname, "..", "logs", fileName), appendItem);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = logger;