const listHelper = require("../utils/list_helper");
const { blogs } = require("./test_helpers");

test("dummy return one", () => {
  const blog = [];

  const result = listHelper.dummy(blog);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
});

describe("favorite blog", () => {
  test("blog with more like", () => {
    const res = listHelper.favoriteBlog(blogs);
    expect(res).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});

describe("most blog", () => {
  test("author with more blogs", () => {
    const res = listHelper.mostBlogs(blogs);
    expect(res).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("most likes", () => {
  test("author with more likes", () => {
    const res = listHelper.mostLikes(blogs);
    expect(res).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
