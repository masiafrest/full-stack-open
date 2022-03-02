const User = require("../models/user");
const bcrypt = require("bcrypt");

const Blog = require("../models/blog");

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((b) => b.toJSON());
};
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};
const delAllUser = async () => {
  await User.deleteMany({});
};
const createUser = async (username, name, password) => {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ username, name, passwordHash });
  await user.save();
};

module.exports = { blogsInDb, usersInDb, createUser, delAllUser };
