const router = require('express').Router();
const upload = require('../../config/multerConfig');
const blogControllers = require('../../controllers/blogControllers');

router.get("/all-posts", blogControllers.getAllBlogs);
router.get("/:id", blogControllers.getOneBlog);
router.post("/create-post", upload.single('picture'), blogControllers.createBlog);
router.post("/add-comment/:id", blogControllers.addComment);
router.post("/add-like/:id", blogControllers.addLike);
router.patch("/update-post/:id", blogControllers.updateBlog);
router.delete("/delete-post", blogControllers.deleteBlog);

module.exports = router;