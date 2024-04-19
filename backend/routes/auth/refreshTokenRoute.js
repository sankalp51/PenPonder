const router = require('express').Router();
const refreshTokenController = require('../../controllers/refreshTokenController');
router.get("/", refreshTokenController);

module.exports = router;