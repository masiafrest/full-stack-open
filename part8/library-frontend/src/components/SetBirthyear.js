import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR } from "../queries";

export default function SetBirthyear() {
  const [name, setName] = useState("");
  const [born, setBorn] = useState(null);

  const [editAuthor] = useMutation(EDIT_AUTHOR);

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
          <input
            type="number"
            onChange={({ target }) => setBorn(target.value)}
            value={born}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </>
  );
}
