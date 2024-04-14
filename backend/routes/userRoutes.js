const userControllers = require('../controllers/userControllers');

const router = require('express').Router();
router.patch("/update-user", userControllers.updateUser);
router.get("/:id", userControllers.getOneUser);
router.delete("/delete-user/:id", userControllers.deleteUser);

module.exports = router;