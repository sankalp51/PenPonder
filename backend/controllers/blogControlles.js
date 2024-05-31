const Blog = require('../models/Blog');
const storage = require('../config/multerConfig');
const multer = require('multer');

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
        const { title, content, picture, author } = req.body;
        if (!title || !content || !author) {
            return res.status(400).json({ message: "Invalid blog data" });
        }



    } catch (error) {
        next(error);
    }
}


module.exports = { getAllBlogs, getOneBlog, createBlog }