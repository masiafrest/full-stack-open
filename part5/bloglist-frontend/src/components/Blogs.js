import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initialBlogs, incrementLike, delBlog } from "../redux/blogSlice";
import Blog from "./Blog";

const Blogs = ({ blogs }) => {
  const dispatch = useDispatch();
  // const [blogs, setBlogs] = blogsState;

  useEffect(async () => {
    // const data = await blogService.getAll();
    // setBlogs(data);
    dispatch(initialBlogs());
  }, []);

  const handleLike = (blog) => {
    dispatch(incrementLike(blog.id));
  };
  const handleDel = (blog) => {
    const ans = window.confirm(`Remove ${blog.title} ?`);
    if (ans) {
      dispatch(delBlog(blog.id));
    }
  };
  const sortedBlogs = [...blogs].sort((a, b) => a.likes - b.likes);
  return (
    <section id="blogs">
      {sortedBlogs.map((blog) => (
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
