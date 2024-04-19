const router = require("express").Router();
const userAuthControllers = require('../../controllers/authControllers');

router.post("/login", userAuthControllers.logIn);
router.post("/signup", userAuthControllers.signUp);
router.get("/logout", userAuthControllers.logOut);

module.exports = router;