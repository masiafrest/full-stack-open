const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const api = supertest(app);

const Blog = require("../models/blog");
const { initialBlogs, oneBlog } = require("./mock_blogs");
const { createUser, blogsInDb, delAllUser } = require("./test_helpers");
const url = "/api/blogs";
let token = "Bearer ";
beforeAll(async () => {
  await delAllUser();
  await createUser("root", "root", "sekret");
  const result = await api
    .post("/api/login")
    .send({ username: "root", password: "sekret" });

  token += result.body.token;
});

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogsObjs = initialBlogs.map((e) => {
    return new Blog(e);
  });
  const promiseArray = blogsObjs.map((note) => note.save());
  await Promise.all(promiseArray);
});

describe("when there is some blogs", () => {
  test("all blogs are returned", async () => {
    const res = await api.get(url).set("Authorization", token).expect(200);
    expect(res.body).toHaveLength(initialBlogs.length);
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .set("Authorization", token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("blogs are defined", async () => {
    const res = await api
      .get("/api/blogs")
      .set("Authorization", token)
      .expect(200);

    const content = res.body.map((e) => e.id);
    content.forEach((element) => {
      expect(element).toBeDefined();
    });
  });
});

describe("addition of a new blog", () => {
  test("post a blog", async () => {
    const blogsAtStart = await blogsInDb();
    await api.post(url).set("Authorization", token).expect(201).send(oneBlog);
    const blogsAtEnd = await blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1);
  });

  test("post blogs without likes", async () => {
    const newBlog = { ...oneBlog };
    delete newBlog.likes;
    const res = await api
      .post(url)
      .set("Authorization", token)
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
      .set("Authorization", token)
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    expect(res.body.error).toContain("validation failed");
  });
});

describe("update of a blog", () => {
  test("update blog", async () => {
    const res = await api.post(url).set("Authorization", token).send(oneBlog);
    const id = res.body.id;
    const title = "im updated";
    const updatedBlog = { title };
    const updResult = await api
      .put(`${url}/${id}`)
      .set("Authorization", token)
      .send(updatedBlog)
      .expect(200);
    expect(updResult.body.title).toContain(title);
  });
});

describe("delete of a blog", () => {
  test("delete blog", async () => {
    const res = await api.post(url).set("Authorization", token).send(oneBlog);
    const id = res.body.id;
    await api.delete(`${url}/${id}`).set("Authorization", token).expect(204);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
