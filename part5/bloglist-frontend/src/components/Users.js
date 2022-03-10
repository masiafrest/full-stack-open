import { useState, useEffect } from "react";
import blogService from "../services/blogs";

export default function Users() {
  const [blogsCount, setBlogsCount] = useState([]);
  useEffect(async () => {
    const data = await blogService.getBlogsCountByUser();
    setBlogsCount(data);
  }, []);

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {blogsCount.map((e) => (
            <tr key={e.id}>
              <td>{e.username}</td>
              <td>{e.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
