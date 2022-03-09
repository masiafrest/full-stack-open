import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setNotificationError,
  removeNotification,
} from "../redux/notificationSlice";
import blogService from "../services/blogs";
import loginService from "../services/login";

const Login = ({ setUser }) => {
  const dispatch = useDispatch();
  const initialState = { username: "", password: "" };
  const [form, setForm] = useState(initialState);

  const handleChange = ({ target }) => {
    setForm((prevForm) => ({ ...prevForm, [target.name]: target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login(form);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setNewToken(user.token);
      setUser(user);
      setForm(initialState);
    } catch (error) {
      dispatch(setNotificationError("Wrong credentials"));
      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);
    }
  };
  return (
    <>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username <input name="username" onChange={handleChange} />
        </div>
        <div>
          password{" "}
          <input name="password" type="password" onChange={handleChange} />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default Login;
