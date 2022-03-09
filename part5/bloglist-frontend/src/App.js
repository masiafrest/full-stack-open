import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBlog } from "./redux/blogSlice";
import { setNotification } from "./redux/notificationSlice";

import Blogs from "./components/Blogs";
import Login from "./components/Login";
import CreateNewBlog from "./components/CreateNewBlog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Showable from "./components/Showable";
import { removeUser } from "./redux/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const { blogs, notification, user } = useSelector((state) => state);

  const blogFormRef = useRef();

  useEffect(() => {
    if (user) {
      blogService.setNewToken(user.token);
    }
  }, []);

  const addBlog = async (blogObj) => {
    try {
      blogFormRef.current.toggleVisibility();
      dispatch(createBlog(blogObj));
      dispatch(setNotification(`added title: ${blogObj.title}`));
    } catch (error) {
      dispatch(setNotification(error.message, 5000, true));
    }
  };

  return (
    <>
      {notification && <Notification message={notification} />}
      {user === null && <Login />}
      <>
        <h2>blogs</h2>
        {user !== null && (
          <div>
            {user.name} is logged in
            <button
              onClick={() => {
                dispatch(removeUser());
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
