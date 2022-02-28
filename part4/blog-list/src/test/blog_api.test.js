const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");

const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("blogs are defined", async () => {
  const res = await api.get("/api/blogs").expect(200);
  console.log(res);
});

afterAll(() => {
  mongoose.connection.close();
});
