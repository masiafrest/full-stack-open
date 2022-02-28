const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const api = supertest(app);

const Blog = require("../models/blog");
const { initialBlogs } = require("./test_helpers");
const url = "/api/blogs";

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogsObjs = initialBlogs.map((e) => {
    return new Blog(e);
  });
  const promiseArray = blogsObjs.map((note) => note.save());
  await Promise.all(promiseArray);
});
test("all blogs are returned", async () => {
  const res = await api.get(url).expect(200);
  expect(res.body).toHaveLength(initialBlogs.length);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("blogs are defined", async () => {
  const res = await api.get("/api/blogs").expect(200);

  const content = res.body.map((e) => e.id);
  content.forEach((element) => {
    expect(element).toBeDefined();
  });
});

test("post a blog", async () => {
  const newBlog = {
    title: "hello wolrd",
    author: "me",
    url: "helloworld.com",
    likes: "5555",
  };
  console.log("posting");
  await api
    .post(url)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  console.log("find blogs");
  const blogs = await Blog.find({});
  expect(blogs).toHaveLength(initialBlogs.length + 1);
});

afterAll(() => {
  mongoose.connection.close();
});
