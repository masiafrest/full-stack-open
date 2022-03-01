const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const api = supertest(app);

const Blog = require("../models/blog");
const { initialBlogs, oneBlog } = require("./test_helpers");
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
  await api
    .post(url)
    .send(oneBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await Blog.find({});
  expect(blogs).toHaveLength(initialBlogs.length + 1);
});

test("post blogs without likes", async () => {
  const newBlog = { ...oneBlog };
  delete newBlog.likes;
  const res = await api
    .post(url)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  expect(res.body.likes).toBe(0);
});

test("post blogs without title and url", async () => {
  const newBlog = { ...oneBlog };
  delete newBlog.title;
  delete newBlog.url;
  const res = await api
    .post(url)
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);
  expect(res.body.error).toContain("validation failed");
});

test("delete blog", async () => {
  const res = await api.post(url).send(oneBlog);
  const id = res.body.id;
  await api.delete(`${url}/${id}`).expect(204);
});

test("update blog", async () => {
  const res = await api.post(url).send(oneBlog);
  const id = res.body.id;
  const title = "im updated";
  const updatedBlog = { title };
  const updResult = await api.put(`${url}/${id}`).send(updatedBlog).expect(200);
  expect(updResult.body.title).toContain(title);
});

afterAll(() => {
  mongoose.connection.close();
});
