const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { response } = require("../app");

usersRouter.post("/", async (req, res, next) => {
  const { username, name, password } = req.body;
  const salt = 10;
  const passwordHash = bcrypt.hash(password, salt);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

module.exports = usersRouter;
