const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (err) {
    next(err);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    let { likes } = request.body;
    if (!likes) {
      likes = 0;
    }
    const newBlog = new Blog({ ...request.body, likes });
    const blog = await newBlog.save();
    response.status(201).json(blog);
  } catch (err) {
    next(err);
  }
});

module.exports = blogsRouter;
