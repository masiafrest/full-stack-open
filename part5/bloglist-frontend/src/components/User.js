import { useState, useEffect } from "react";
import { useMatch } from "react-router-dom";
import userService from "../services/users";

export default function User() {
  const [userBlogs, setUserBlogs] = useState(null);
  const userMatch = useMatch("/users/:id");

  useEffect(async () => {
    const blogs = await userService.getUser(userMatch.params.id);
    setUserBlogs(blogs);
  }, []);

  return (
    <>
      <h2>{userBlogs?.username}</h2>
      <h3>added blog</h3>
      <ul>
        {userBlogs?.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
}
