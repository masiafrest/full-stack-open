import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { initialBlogs, delBlog } from "../redux/blogSlice";

const Blogs = ({ blogs }) => {
  const dispatch = useDispatch();
  const linkStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  useEffect(async () => {
    dispatch(initialBlogs());
  }, []);
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
        <div key={blog.id} style={linkStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          <button onClick={() => handleDel(blog)}>delete</button>
        </div>
        // <Blog
        //   key={blog.id}
        //   blog={blog}
        //   handleDel={handleDel}
        //   handleLike={handleLike}
        // />
      ))}
    </section>
  );
};

export default Blogs;
