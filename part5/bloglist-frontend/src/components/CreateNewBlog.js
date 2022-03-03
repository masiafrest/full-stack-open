import { useState } from "react";

export default function CreateNewBlog() {
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
    console.log("submitin new note: ", form);
  };
  return (
    <>
      <h1>Create new </h1>
      <form onSubmit={handleSubmit}>
        <div>
          title:{" "}
          <input name="title" value={form.title} onChange={handleChange} />
        </div>
        <div>
          author:{" "}
          <input name="author" value={form.author} onChange={handleChange} />
        </div>
        <div>
          url: <input name="url" value={form.url} onChange={handleChange} />
        </div>
        <button type="submit">submit</button>
      </form>
    </>
  );
}
