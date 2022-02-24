import { useState } from "react";
import Country from "./Country";

export default function CountryList({ countries }) {
  const [show, setShow] = useState({});
  const handleClick = (e) => () => {
    setShow({ ...show, [e.name.common]: e });
  };
  return countries.map((e) => {
    const name = e.name.common;
    return (
      <div key={name}>
        {name}
        <button onClick={handleClick(e)}>show</button>
        {show[name] && <Country key={name} data={show[name]} />}
      </div>
    );
  });
}
