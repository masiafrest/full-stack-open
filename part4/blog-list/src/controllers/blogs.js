const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    response.json(blogs);
  } catch (err) {
    next(err);
  }
});

blogsRouter.get("/:id", async (request, response, next) => {
  try {
    const blogs = await Blog.findById(request.params.id);
    if (blogs) {
      response.json(blogs);
    } else {
      response.status(404).end();
    }
  } catch (err) {
    next(err);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    const user = await User.findById(request.user.id);

    let { likes } = request.body;
    if (!likes) {
      likes = 0;
    }

    const newBlog = new Blog({ ...request.body, likes, user: user._id });
    const blog = await newBlog.save();

    user.blogs = user.blogs.concat(blog);
    await user.save();

    response.status(201).json(blog);
  } catch (err) {
    next(err);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const user = request.user;
    const id = request.params.id;
    const blog = await Blog.findById(id);
    if (blog.user.toString() === user.id) {
      await Blog.findByIdAndRemove(id);
      return response.status(204).end();
    }
    response.status(403).json({ error: "wrong user" });
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.json(updatedBlog);
  } catch (error) {}
});

module.exports = blogsRouter;