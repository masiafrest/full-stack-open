const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { tokenExtractor, userExtractor } = require("../utils/middleware");
const populateBlogs = {
  title: 1,
  author: 1,
  likes: 1,
  url: 1,
};

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.find({}).populate("blogs", populateBlogs);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.post(
  "/",
  //  tokenExtractor, userExtractor,
  async (req, res, next) => {
    try {
      const { username, name, password } = req.body;

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({
          error: "username must be unique",
        });
      }

      const salt = 10;
      const passwordHash = await bcrypt.hash(password, salt);

      const user = new User({
        username,
        name,
        passwordHash,
      });

      const savedUser = await user.save();

      res.status(201).json(savedUser);
    } catch (error) {
      next(error);
    }
  }
);

usersRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).populate("blogs", populateBlogs);
    console.log(user);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
