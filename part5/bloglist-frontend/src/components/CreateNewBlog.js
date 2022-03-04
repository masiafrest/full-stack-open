import { useState } from "react";

export default function CreateNewBlog({ addBlog }) {
  const initialState = {
    title: "",
    author: "",
    url: "",
  };
  const [form, setForm] = useState(initialState);

  const handleChange = ({ target }) => {
    setForm((prevForm) => ({ ...prevForm, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBlog(form);
    setForm(initialState);
  };
  return (
    <>
      <h1>Create new </h1>
      <form onSubmit={handleSubmit}>
        <div>
          title:{" "}
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="add title"
          />
        </div>
        <div>
          author:{" "}
          <input
            name="author"
            placeholder="add author"
            value={form.author}
            onChange={handleChange}
          />
        </div>
        <div>
          url:{" "}
          <input
            name="url"
            placeholder="add url"
            value={form.url}
            onChange={handleChange}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </>
  );
}
