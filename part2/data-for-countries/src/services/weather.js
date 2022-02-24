import axios from "axios";

const getAllWeather = () => {
  return axios
    .get("https://restcountries.com/v3.1/all")
    .then((res) => res.data);
};

export default { getAllWeather };
