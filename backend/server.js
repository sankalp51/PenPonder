const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const errorHandler = require('./middleware/errorHandler');
const rootRoutes = require('./routes/rootRoutes');
const userAuthRoutes = require('./routes/auth/authRoutes');
const verifyJwt = require('./middleware/verifyJwt');
const refreshTokenRoute = require("./routes/auth/refreshTokenRoute");
const connectDb = require('./config/db');
const path = require('path');
const { default: mongoose } = require('mongoose');
const verifyRoles = require('./middleware/verifyRoles');
const USER_ROLES = require('./config/user_roles');
require('dotenv').config();

const app = express();

//database connection
connectDb(process.env.DATABASE_URL);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static(path.join(__dirname, "/uploads")))
app.use(credentials);
app.use(cors(require("./config/corsConfig")));
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

//root
app.use("^/$|^index(.html)?", rootRoutes);

//refresh token route
app.use("/refresh", refreshTokenRoute);

//user auth routes
app.use("/users/auth", userAuthRoutes);

//error handler
app.use(errorHandler);

//404 handling
app.all("*", (req, res) => {
    if (req.accepts("html")) {
        res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
    }
    else if (req.accepts("json")) {
        res.status(404).json({ message: "404 Not found" });
    }
    else {
        res.type("text").status(404).send("404 not found");
    }
});


mongoose.connection.once("open", () => {
    console.log("successfully connected to database");
    app.listen(PORT, () => {
        console.log(`server started on port ${PORT}`)
    });
})