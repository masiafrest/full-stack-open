import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const blog = {
  title: "test-title",
  url: "test-url",
  author: "test-author",
  likes: 888,
};
test("Make a test which checks that the component displaying a blog renders the blog's title and author, but does not render its url or number of likes by default.", () => {
  render(<Blog blog={blog} />);
  const element = screen.getByText(blog.title);
  expect(element).toBeDefined;
});

test("5.14 Make a test which checks that the blogs url and number of likes are shown when the button controlling the shown details has been clicked. ", () => {
  const mockDelHandler = jest.fn();
  const mockLikeHandler = jest.fn();
  render(
    <Blog blog={blog} handleDel={mockDelHandler} handleLike={mockLikeHandler} />
  );

  const button = screen.getByText("view");
  userEvent.click(button);
  screen.getByText(blog.url);
  screen.getByText(blog.author);
});
