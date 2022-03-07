import { useState } from "react";

export default function Filter() {
  const [filter, setFilter] = useState("");
  const handleChange = ({ target }) => {
    setFilter(target.value);
  };
  return (
    <div>
      filter
      <input value={filter} name="filter" onChange={handleChange} />{" "}
    </div>
  );
}
