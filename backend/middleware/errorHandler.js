const logger = require('../utils/logger');

const errorHandler = (error, req, res, next) => {
    console.log(error.stack);
    const message = `${req.headers.origin}\t${req.method}\t${req.url}`;
    logger(message, "errLog.log");
    if (req.accepts("html")) {
        res.status(500).send(`<h1>${error.message}</h1>`);
    }
    else if (req.accepts("json")) {
        res.status(500).json({ error: error.message });
    }
    else {
        res.type("text").status(500).send(`${error.message}`);
    }
    next();
}

module.exports = errorHandler;