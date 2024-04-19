const logger = require('../utils/logger');

const errorHandling = (error, req, res, next) => {
    logger(`origin: ${req.headers.origin}\tmethod: ${req.method}\terror: ${error.message}\n`,"errorLog.log");
    console.log(error.stack);
    if (req.accepts("html")) {
        res.status(500).send(`<h1>${error.message}</h1>`);
    }
    else if (req.accepts("json")) {
        res.status(404).json({ message: `${error.message}` });
    }
    else {
        res.type("text").status(404).send(`${error.message}`);
    }
}

module.exports = errorHandling;
