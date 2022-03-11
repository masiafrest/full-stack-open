import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { incrementLike, createComment } from "../redux/blogSlice";

const Blog = () => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
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

  const onChange = (e) => {
    setComment(e.target.value);
  };

  const addComment = (e) => {
    e.preventDefault();
    dispatch(createComment(blog.id, comment));
  };

  if (!blog) return <div>no blog</div>;
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
        <h2>comments</h2>
        <form onSubmit={addComment}>
          <input name="add-comment" onChange={onChange} />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments.map((e) => (
            <li key={e.id}>{e.comment}</li>
          ))}
        </ul>
      </>
    </div>
  );
};

export default Blog;
