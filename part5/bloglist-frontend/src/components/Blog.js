import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { incrementLike } from "../redux/blogSlice";

const Blog = () => {
  const dispatch = useDispatch;
  const blogs = useSelector((state) => state.blogs);
  const blogMatch = useMatch("/blogs/:id");
  const blog = blogMatch
    ? blogs.find((blog) => {
        return blog.id === blogMatch.params.id;
      })
    : null;
  const handleLike = (blog) => {
    dispatch(incrementLike(blog.id));
  };

  return (
    <div id="blog">
      <h2>{blog.title}</h2>
      <>
        <a href={blog.url}>{blog.url}</a>
        <div id="likes">
          likes: {blog.likes}
          <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>added by {blog.author}</div>
      </>
    </div>
  );
};

export default Blog;
