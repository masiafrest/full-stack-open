import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
      <li>
        <Link to="/users">users</Link>
        <Link to="/blogs">blogs</Link>
      </li>
    </ul>
  );
}
