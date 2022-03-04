import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import Blog from "./Blog";

const Blogs = ({ blog }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(async () => {
    const data = await blogService.getAll();
    setBlogs(data);
  }, []);

  const handleLike = (blog) => {
    const newObj = { likes: blog.likes + 1 };
    blogService.put(blog.id, newObj);
  };
  const handleDel = (blog) => {
    const ans = window.confirm(`Remove ${blog.title} ?`);
    if (ans) {
      blogService.deleteBlog(blog.id);
    }
  };
  return (
    <div>
      {blogs
        .sort((a, b) => a.likes - b.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleDel={handleDel}
            handleLike={handleLike}
          />
        ))}
    </div>
  );
};

export default Blogs;
