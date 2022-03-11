import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBlog } from "./redux/blogSlice";
import { setNotification } from "./redux/notificationSlice";
import { removeUser } from "./redux/userSlice";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Login from "./components/Login";
import CreateNewBlog from "./components/CreateNewBlog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Showable from "./components/Showable";
import Users from "./components/Users";
import User from "./components/User";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";

const UserStatus = ({ user, onClick }) =>
  user !== null && (
    <div>
      {user.name} is logged in
      <button onClick={onClick}>logout</button>
    </div>
  );

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
      <NavBar />
      <h2>blogs</h2>
      {notification && <Notification message={notification} />}
      {user === null && <Login />}
      <>
        <UserStatus
          user={user}
          onClick={() => {
            dispatch(removeUser());
          }}
        />
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
