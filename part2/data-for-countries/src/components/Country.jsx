import { useState, useEffect } from "react";
import axios from "axios";

export default function Country({ data }) {
  const [weather, setWeather] = useState("");
  const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
  useEffect(() => {
    axios
      .get(
        `api.openweathermap.org/data/2.5/weather?lat=${data?.latlng[0]}&lon=${data?.latlng[1]}&appid=${weatherApiKey}`
      )
      .then((res) => {
        console.log(res);
        setWeather(res.data);
      });
  }, []);

  return (
    <div>
      <h1>{data?.name.common}</h1>
      <p>capital {data?.capital[0]}</p>
      <p>area {data?.area}</p>
      <h2>languages: </h2>
      <ul>
        {Object.keys(data?.languages).map((e) => (
          <li>{data?.languages[e]}</li>
        ))}
      </ul>
      <img src={data?.flags.svg} width={"200px"} />
      <h1>Weather in {data?.name.common}</h1>
      <p>temperature</p>
      <p>wind</p>
    </div>
  );
}
