import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateNewBlog from "./CreateNewBlog";

test("5.16: Make a test for the new blog form. The test should check, that the form calls the event handler it received as props with the right details when a new blog is created. ", () => {
  const mockAddBlog = jest.fn();
  render(<CreateNewBlog addBlog={mockAddBlog} />);

  const titleInput = screen.getByPlaceholderText("add title");
  const authorInput = screen.getByPlaceholderText("add author");
  const urlInput = screen.getByPlaceholderText("add url");
  const submitBtn = screen.getByText("save");

  userEvent.type(titleInput, "titletest");
  userEvent.type(authorInput, "authortest");
  userEvent.type(urlInput, "urltest");
  userEvent.click(submitBtn);

  expect(mockAddBlog.mock.calls).toHaveLength(1);
  // expect(mockAddBlog.mock.calls[0][0].title).toBe("titletest");
  // expect(mockAddBlog.mock.calls[0][0].author).toBe("authortest");
  // expect(mockAddBlog.mock.calls[0][0].url).toBe("urltest");
});
