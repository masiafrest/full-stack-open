import { useState } from "react";

const Blog = ({ blog, handleLike, handleDel }) => {
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

  const btnLabel = visible ? "hide" : "view";
  return (
    <div style={blogStyle} id="blog">
      <div className="title">
        title: {blog.title} <button onClick={handleVisible}>{btnLabel}</button>
      </div>
      {visible && (
        <>
          <div>url: {blog.url}</div>
          <div id="likes">
            likes: {blog.likes}
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          <div>author: {blog.author}</div>
          <button onClick={() => handleDel(blog)}>delete</button>
        </>
      )}
    </div>
  );
};

export default Blog;
