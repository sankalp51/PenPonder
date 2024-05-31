const router = require('express').Router();

router.get("/all-posts");
router.get("/:id");
router.post("/create-post");
router.patch("/update-post/:id");
router.delete("/delete-post");

module.exports = router;