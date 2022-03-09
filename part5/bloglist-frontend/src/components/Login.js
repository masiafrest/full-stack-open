import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const initialState = { username: "", password: "" };
  const [form, setForm] = useState(initialState);

  const handleChange = ({ target }) => {
    setForm((prevForm) => ({ ...prevForm, [target.name]: target.value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setForm(initialState);
    dispatch(loginUser(form));
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
