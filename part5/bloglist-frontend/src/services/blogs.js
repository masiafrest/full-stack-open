import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const config = {
  headers: { Authorization: "" },
};

const setNewToken = (newToken) => {
  token = `Bearer ${newToken}`;
  config.headers.Authorization = token;
};

const getAll = async () => {
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const create = async (newObj) => {
  const response = await axios.post(baseUrl, newObj, config);
  return response.data;
};

export default { setNewToken, getAll, create };
