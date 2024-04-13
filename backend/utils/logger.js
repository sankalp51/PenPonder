const fsPromisses = require('fs/promises');
const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const logger = async (message, fileName) => {
    const dateTime = format(new Date(), "dd-MM-yyyy\tHH:mm:ss");
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    try {
        if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
            await fsPromisses.mkdir(path.join(__dirname, "..", "logs"));
        }
        fsPromisses.appendFile(path.join(__dirname, "..", "logs", fileName), logItem);

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = logger;