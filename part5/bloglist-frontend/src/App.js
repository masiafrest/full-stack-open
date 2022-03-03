import { useState, useEffect, useRef } from "react";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import CreateNewBlog from "./components/CreateNewBlog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Showable from "./components/Showable";

const App = () => {
  const [user, setUser] = useState(null);
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
          <CreateNewBlog
            setNotification={setNotification}
            blogFormRef={blogFormRef}
          />
        </Showable>
        <Blogs />
      </>
      )
    </>
  );
};

export default App;
