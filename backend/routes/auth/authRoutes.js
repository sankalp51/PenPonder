const router = require("express").Router();
const userAuthControllers = require('../../controllers/authControllers');

router.post("/log-in", userAuthControllers.logIn);
router.post("/sign-up", userAuthControllers.signUp);
router.get("/log-out", userAuthControllers.logOut);

module.exports = router;