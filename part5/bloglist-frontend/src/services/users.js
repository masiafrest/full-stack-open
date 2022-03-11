import axios from "axios";
const baseUrl = "/api/users";

import { config } from "./blogs";

const getAll = async () => {
  const res = await axios.get(baseUrl, config);
  return res.data;
};

const getUser = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`, config);
  return res.data;
};

export default { getAll, getUser };
