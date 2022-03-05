import { useState, useEffect, useRef } from "react";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import CreateNewBlog from "./components/CreateNewBlog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Showable from "./components/Showable";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setNewToken(user.token);
    }
  }, []);

  const addBlog = async (blogObj) => {
    try {
      blogFormRef.current.toggleVisibility();
      const responseData = await blogService.create(blogObj);
      setBlogs((prevBlogs) => [...prevBlogs, responseData]);
      setNotification({
        error: false,
        message: `added title: ${blogObj.title}`,
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      setNotification({ error: true, message: error.message });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  return (
    <>
      {notification && <Notification message={notification} />}
      {user === null && (
        <Login setUser={setUser} setNotification={setNotification} />
      )}
      <>
        <h2>blogs</h2>
        {user !== null && (
          <div>
            {user.name} is logged in
            <button
              onClick={() => {
                window.localStorage.clear();
                setUser(null);
              }}
            >
              logout
            </button>
          </div>
        )}
        <Showable label="create new blog" ref={blogFormRef}>
          <CreateNewBlog addBlog={addBlog} />
        </Showable>
        <Blogs blogsState={[blogs, setBlogs]} />
      </>
      )
    </>
  );
};

export default App;
