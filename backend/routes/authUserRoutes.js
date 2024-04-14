const router = require('express').Router();
const userAuthController = require('../controllers/userAuthController');

router.post("/register-user", userAuthController.signUpUser);
router.post("/user-login", userAuthController.logInUser);

module.exports = router;