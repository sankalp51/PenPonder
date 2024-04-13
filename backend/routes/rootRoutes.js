const router = require('express').Router();
const path = require('path');
router.route("/")
    .get((req, res) => {
       res.status(200).sendFile(path.join(__dirname,"..","views","index.html"));
    });

module.exports = router;