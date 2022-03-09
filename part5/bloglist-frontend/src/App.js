import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBlog } from "./redux/blogSlice";
import {
  setNotificationError,
  setNotificationSuccess,
  removeNotification,
} from "./redux/notificationSlice";

import Blogs from "./components/Blogs";
import Login from "./components/Login";
import CreateNewBlog from "./components/CreateNewBlog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Showable from "./components/Showable";

const App = () => {
  const dispatch = useDispatch();
  const { blogs, notification } = useSelector((state) => state);

  const [user, setUser] = useState(null);
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
      dispatch(createBlog(blogObj));
      dispatch(setNotificationSuccess(`added title: ${blogObj.title}`));
      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);
    } catch (error) {
      setNotificationError(error.message);
      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);
    }
  };

  return (
    <>
      {notification && <Notification message={notification} />}
      {user === null && <Login setUser={setUser} />}
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
        <Blogs blogs={blogs} />
      </>
      )
    </>
  );
};

export default App;
