import { useState, useEffect } from "react";
import Countries from "./components/Countries";
import weather from "./services/weather";

function App() {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    weather.getAllWeather().then((data) => setCountries(data));
  }, []);
  return (
    <div>
      find countries{" "}
      <input
        value={country}
        onChange={(e) => {
          setCountry(e.target.value);
        }}
      />
      <Countries countries={countries} country={country} />
    </div>
  );
}

export default App;
