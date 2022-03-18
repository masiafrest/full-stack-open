import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR } from "../queries";

export default function SetBirthyear() {
  const [name, setName] = useState("");
  const [born, setBorn] = useState(1900);

  const [editAuthor] = useMutation(EDIT_AUTHOR);
  const years = [];
  for (let i = 1900; i < 2000; i++) {
    years.push(i);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    editAuthor({ variables: { name, setBornTo: Number(born) } });

    setBorn(null);
    setName("");
  };
  return (
    <>
      <h2>Set birthyear</h2>
      <form onSubmit={onSubmit}>
        <div>
          name
          <input
            type="text"
            onChange={({ target }) => setName(target.value)}
            value={name}
          />
        </div>
        <div>
          born
          <select
            type="number"
            onChange={({ target }) => {
              console.log(target);
              setBorn(target.value);
            }}
            value={born}
          >
            {years.map((year, idx) => {
              return (
                <option key={year} value={year} defaultValue={idx === 0}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
        <button type="submit">update author</button>
      </form>
    </>
  );
}
