import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import CreateNewBlog from "./components/CreateNewBlog";
import blogService from "./services/blogs";

const App = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
      {errorMessage && <div>{errorMessage}</div>}
      {user === null ? (
        <Login setUser={setUser} setErrorMessage={setErrorMessage} />
      ) : (
        <>
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
          <CreateNewBlog />
          <Blogs />
        </>
      )}
    </>
  );
};

export default App;
