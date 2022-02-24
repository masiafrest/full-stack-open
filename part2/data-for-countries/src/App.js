import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";

function App() {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      console.log("res: ", res);
      setCountries(res.data);
    });
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
