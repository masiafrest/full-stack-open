const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { response } = require("../app");

usersRouter.get("/", async (req, res, next) => {
  const users = await User.find({});
  res.json(users);
});

usersRouter.post("/", async (req, res, next) => {
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
});

module.exports = usersRouter;
