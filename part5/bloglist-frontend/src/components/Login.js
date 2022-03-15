import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/userSlice";
import {
  FormControl,
  FormLabel,
  // FormErrorMessage,
  // FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";

const Login = () => {
  const dispatch = useDispatch();
  const initialState = { username: "", password: "" };
  const [form, setForm] = useState(initialState);

  const handleChange = ({ target }) => {
    setForm((prevForm) => ({ ...prevForm, [target.id]: target.value }));
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
        <FormControl>
          <FormLabel htmlFor="username">username</FormLabel>
          <Input
            id="username"
            value={form.username}
            onChange={handleChange}
            placeholder="add username"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">password</FormLabel>
          <Input
            id="password"
            value={form.password}
            onChange={handleChange}
            placeholder="add password"
          />
        </FormControl>
        <Button type="submit">login</Button>
      </form>
    </>
  );
};

export default Login;
