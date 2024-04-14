const userControllers = require('../controllers/userControllers');

const router = require('express').Router();
router.post("/register-user", userControllers.signUpUser);
router.post("/user-login", userControllers.logInUser)
router.patch("/update-user", userControllers.updateUser);
router.get("/:id", userControllers.getOneUser);
router.delete("/delete-user/:id", userControllers.deleteUser);

module.exports = router;