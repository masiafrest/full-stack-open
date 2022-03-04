import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("render content", () => {
  const blog = {
    title: "test-title",
    url: "test-url",
    author: "test-author",
    likes: 888,
  };

  const container = render(<Blog blog={blog} />);
  screen.debug();
  const element = screen.getByText(blog.title);
  expect(element).toBeDefined;
});
