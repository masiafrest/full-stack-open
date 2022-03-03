import { useState, useEffect } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleVisible = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    const newObj = { likes: blog.likes + 1 };
    const res = blogService.put(blog.id, newObj);
    console.log(res);
  };
  const handleDel = () => {
    const ans = window.confirm(`Remove ${blog.title} ?`);
    if (ans) {
      blogService.deleteBlog(blog.id);
    }
  };
  const btnLabel = visible ? "hide" : "view";
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} <button onClick={handleVisible}>{btnLabel}</button>
      </div>
      {visible && (
        <>
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes}
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.author}</div>
          <button onClick={handleDel}>delete</button>
        </>
      )}
    </div>
  );
};

const Blogs = ({ blog }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(async () => {
    const data = await blogService.getAll();
    setBlogs(data);
  }, []);

  return (
    <div>
      {blogs
        .sort((a, b) => a.likes - b.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default Blogs;
