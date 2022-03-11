import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeUser } from "../redux/userSlice";

const UserStatus = ({ user, onClick }) =>
  user !== null && (
    <>
      {user.name} is logged in
      <button onClick={onClick}>logout</button>
    </>
  );

export default function NavBar({ user }) {
  const dispatch = useDispatch();
  return (
    <ul
      style={{
        listStyleType: "none",
        margin: 0,
        padding: 0,
        background: "grey",
        display: "flex",
        gap: "10px",
      }}
    >
      <li>
        <Link to="/users">users</Link>
      </li>
      <li>
        <Link to="/">blogs</Link>
      </li>
      <li>
        <UserStatus
          user={user}
          onClick={() => {
            dispatch(removeUser());
          }}
        />
      </li>
    </ul>
  );
}
