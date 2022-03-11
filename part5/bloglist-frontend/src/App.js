import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBlog } from "./redux/blogSlice";
import { setNotification } from "./redux/notificationSlice";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import CreateNewBlog from "./components/CreateNewBlog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Showable from "./components/Showable";
import { removeUser } from "./redux/userSlice";
import Users from "./components/Users";
import User from "./components/User";

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
      {notification && <Notification message={notification} />}
      {user === null && <Login />}
      <>
        <h2>blogs</h2>
        <UserStatus
          user={user}
          onClick={() => {
            dispatch(removeUser());
          }}
        />
        <Routes>
          <Route path="/users/:id" element={<User />} />
          <Route path="/users" element={<Users />} />
          <Route path="/blogs" element={null} />
        </Routes>

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
