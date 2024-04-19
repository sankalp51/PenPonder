const router = require('express').Router();
const path = require('path');
router.route("/")
    .get((req, res) => {
        if (req.accepts("html")) {
            res.status(200).sendFile(path.join(__dirname,"..", "views", "index.html"));
        }
        else if (req.accepts("json")) {
            res.status(200).json({ message: "Welcome to the blogs API" });
        }
        else {
            res.type("text").status(200).send("Welcome to the blogs API");
        }
    });

module.exports = router;