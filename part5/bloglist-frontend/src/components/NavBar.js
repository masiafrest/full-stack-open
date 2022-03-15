import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeUser } from "../redux/userSlice";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
} from "@chakra-ui/react";

const UserStatus = ({ user, onClick }) =>
  user !== null && (
    <>
      {user.name} is logged in
      <Button onClick={onClick} ml="1" size="xs">
        logout
      </Button>
    </>
  );

export default function NavBar({ user }) {
  const dispatch = useDispatch();
  return (
    <Breadcrumb bg={"blackAlpha.500"}>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/users">
          users
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/">
          blogs
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem ml="2">
        <UserStatus
          user={user}
          onClick={() => {
            dispatch(removeUser());
          }}
        />
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
