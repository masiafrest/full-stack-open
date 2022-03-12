import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import blogService from "../services/blogs";

import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

export default function Users() {
  const [blogsCount, setBlogsCount] = useState([]);
  useEffect(async () => {
    const data = await blogService.getBlogsCountByUser();
    setBlogsCount(data);
  }, []);

  return (
    <>
      <h2>Users</h2>
      <Table>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>blogs created</Th>
          </Tr>
        </Thead>
        <Tbody>
          {blogsCount.map((e) => (
            <Tr key={e.id}>
              <Td>
                <Link to={`/users/${e.id}`}>{e.username}</Link>
              </Td>
              <Td>{e.blogs.length}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
