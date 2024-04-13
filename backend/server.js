const express = require('express');
const cors = require('cors');
const path = require('path');
const rootRoutes = require('./routes/rootRoutes');
const corsOptions = require("./config/corsConfig");
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');
const connectDb = require("./config/db");
require('dotenv').config();

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
connectDb(process.env.DATABASE_URL);

app.use("^/$|/index(.html)?", rootRoutes);
app.all("*", (req, res) => {
    if (req.accepts("html")) {
        res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
    }
    else if (req.accepts("json")) {
        res.status(404).json({ message: "404 Not found" });
    }
    else {
        res.type("text").status(404).send("404 Not found");
    }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
    app.listen(3000, () => {
        console.log('server started on port 3000');
    });
});

mongoose.connection.on("error", (err) => {
    console.log(err.message)
});