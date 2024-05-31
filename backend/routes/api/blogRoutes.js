const router = require('express').Router();
const upload = require('../../config/multerConfig');
const blogControllers = require('../../controllers/blogControllers');

router.get("/all-posts", blogControllers.getAllBlogs);
router.get("/:id", blogControllers.getOneBlog);
router.post("/create-post", upload.single('picture'), blogControllers.createBlog);
router.patch("/update-post/:id");
router.delete("/delete-post");

module.exports = router;