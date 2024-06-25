const { default: mongoose } = require('mongoose');
const Blog = require('../models/Blog');
const Comment = require('../models/Comment');

const getAllBlogs = async (req, res, next) => {
    try {
        const allBlogs = await Blog.find()
            .populate('author')
            .populate({
                path: 'comments',
                populate: { path: 'author' }
            })
            .populate('likes')
            .lean();

        if (!allBlogs?.length) {
            return res.status(404).json({ message: "No blog items available" });
        }

        res.status(200).json(allBlogs);
    } catch (error) {
        next(error);
    }
};



const getOneBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id)
            .populate('author')
            .populate({
                path: 'comments',
                populate: { path: 'author' }
            })
            .populate('likes')
            .lean();

        if (!blog) {
            return res.status(404).json({ message: "Blog item not found" });
        }

        res.status(200).json(blog);
    } catch (error) {
        next(error);
    }
};

const createBlog = async (req, res, next) => {
    try {
        const { title, content, author } = req.body;
        const picture = req.file ? req.file.path : null;

        if (!title || !content || !author) {
            return res.status(400).json({ message: "Invalid blog data" });
        }

        const newBlog = new Blog({
            title,
            content,
            author,
            picture
        });

        await newBlog.save();
        res.status(201).json(newBlog);

    } catch (error) {
        next(error);
    }
}

const updateBlog = async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
}

const deleteBlog = async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
}

const addComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { content, author } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "valid post ID is required" });
        if (!content) return res.status(400).json({ message: "comment content cannot be empty" });
        if (!mongoose.Types.ObjectId.isValid(author)) return res.status(400).json({ message: "Invalid user ID" });

        const blogPost = await Blog.findById(id);
        if (!blogPost) return res.status(404).json({ message: "No such blog post found" });

        const newComment = new Comment({
            content,
            author,
            post: id
        });

        await newComment.save();

        blogPost.comments.push(newComment._id);
        await blogPost.save();

        res.status(201).json({ message: "comment added!" });

    } catch (error) {
        next(error);
    }
}

const addLike = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { user } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "valid post ID is requred" });
        if (!mongoose.Types.ObjectId.isValid(user)) return res.status(400).json({ message: "valid user ID is required" });

        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ message: "Blog item not found" });

        // Check if the user already liked the post
        const likeIndex = blog.likes.indexOf(user);
        if (likeIndex === -1) {
            // Add the like if not already liked
            blog.likes.push(user);
        } else {
            // Remove the like if already liked
            blog.likes.splice(likeIndex, 1);
        }

        await blog.save();
        return res.status(204);
    } catch (error) {
        next(error);
    }
}


module.exports = { getAllBlogs, getOneBlog, createBlog, updateBlog, deleteBlog, addComment, addLike };