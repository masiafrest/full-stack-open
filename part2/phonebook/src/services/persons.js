import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAllPersons = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const savePerson = (person) => {
  return axios.post(baseUrl, person).then((res) => res.data);
};
const updatePerson = (id, person) => {
  return axios.put(`${baseUrl}/${id}`, person).then((res) => res.data);
};

const delPerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((res) => res.data);
};

export default { getAllPersons, savePerson, delPerson, updatePerson };
