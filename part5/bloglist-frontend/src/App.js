import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBlog } from "./redux/blogSlice";
import { setNotification } from "./redux/notificationSlice";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import CreateNewBlog from "./components/CreateNewBlog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Showable from "./components/Showable";
import Users from "./components/Users";
import User from "./components/User";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import Login from "./components/Login";

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
      <NavBar user={user} />
      <h2>blogs</h2>
      <>
        {user === null && <Login />}
        <Showable label="create new blog" ref={blogFormRef}>
          <CreateNewBlog addBlog={addBlog} />
        </Showable>
        <Routes>
          <Route path="/users/:id" element={<User />} />
          <Route path="/users" element={<Users />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/" element={<Blogs blogs={blogs} />} />
        </Routes>
      </>
    </>
  );
};

export default App;
