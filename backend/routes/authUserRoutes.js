const router = require('express').Router();
const userAuthController = require('../controllers/userAuthController');

router.post("/register-user", userAuthController.signUpUser);
router.post("/user-login", userAuthController.logInUser);
router.get("/user-logout", userAuthController.logOutUser);

module.exports = router;