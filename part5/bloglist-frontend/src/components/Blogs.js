import { useEffect } from "react";
import blogService from "../services/blogs";
import Blog from "./Blog";

const Blogs = ({ blogsState }) => {
  const [blogs, setBlogs] = blogsState;

  useEffect(async () => {
    const data = await blogService.getAll();
    setBlogs(data);
  }, []);

  const handleLike = (blog) => {
    const newObj = { likes: blog.likes + 1 };
    blogService.put(blog.id, newObj);
    setBlogs((prevBlogs) =>
      prevBlogs.map((pblog) => {
        if (pblog.id === blog.id) {
          return {
            ...pblog,
            ...newObj,
          };
        }
        return pblog;
      })
    );
  };
  const handleDel = (blog) => {
    const ans = window.confirm(`Remove ${blog.title} ?`);
    if (ans) {
      blogService.deleteBlog(blog.id);
      setBlogs((prevBlogs) =>
        prevBlogs.filter((pBlog) => pBlog.id !== blog.id)
      );
    }
  };
  return (
    <section id="blogs">
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
    </section>
  );
};

export default Blogs;
