import { useState, useEffect } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
);

const Blogs = ({ blog }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(async () => {
    const data = await blogService.getAll();
    setBlogs(data);
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
