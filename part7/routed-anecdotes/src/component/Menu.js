import { Link } from "react-router-dom";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link style={padding} to="/" style={padding}>
        anecdotes
      </Link>
      <Link style={padding} to="/create" style={padding}>
        Create new
      </Link>
      <Link style={padding} to="/about" style={padding}>
        About
      </Link>
    </div>
  );
};

export default Menu;
