const router = require('express').Router();
const refreshTokenController = require("../controllers/refreshTokenController");
router.get("/refresh", refreshTokenController);

module.exports = router;