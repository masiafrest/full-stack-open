const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");
const { tokenExtractor, userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
      .populate("user", {
        username: 1,
        name: 1,
      })
      .populate("comments");
    response.json(blogs);
  } catch (err) {
    next(err);
  }
});

blogsRouter.get("/blog-count/", async (req, res, next) => {
  try {
    const data = await User.find({}).populate("blogsCount");
    res.json(data);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get("/:id", async (request, response, next) => {
  try {
    const blogs = await Blog.findById(request.params.id).populate("comments");
    console.log(blogs);
    if (blogs) {
      response.json(blogs);
    } else {
      response.status(404).end();
    }
  } catch (err) {
    next(err);
  }
});

blogsRouter.post(
  "/:id/comments",
  tokenExtractor,
  userExtractor,
  async (req, res, next) => {
    try {
      const blog = await Blog.findById(req.params.id);
      const newComment = new Comment({ ...req.body, blog: blog._id });
      console.log(newComment);
      const comment = await newComment.save();

      blog.comments = blog.comments.concat(comment);
      await blog.save();

      res.status(201).json(comment);
    } catch (err) {
      next(err);
    }
  }
);

blogsRouter.post(
  "/",
  tokenExtractor,
  userExtractor,
  async (request, response, next) => {
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
  }
);

blogsRouter.get(
  "/like/:id",
  tokenExtractor,
  userExtractor,
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const blog = await Blog.findByIdAndUpdate(
        id,
        { $inc: { likes: 1 } },
        { new: true }
      );

      res.json(blog);
    } catch (error) {
      next(error);
    }
  }
);

blogsRouter.delete(
  "/:id",
  tokenExtractor,
  userExtractor,
  async (request, response, next) => {
    try {
      const id = request.params.id;
      const blog = await Blog.findById(id);
      if (blog._id.toString() === id) {
        await Blog.findByIdAndRemove(id);
        return response.status(204).end();
      }
      response.status(403).json({ error: "blog dont exist " });
    } catch (error) {
      next(error);
    }
  }
);

blogsRouter.put(
  "/:id",
  tokenExtractor,
  userExtractor,
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
      );
      res.json(updatedBlog);
    } catch (error) {}
  }
);

module.exports = blogsRouter;
