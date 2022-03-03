import { useState } from "react";
import blogService from "../services/blogs";

export default function CreateNewBlog({ setNotification }) {
  const initialState = {
    title: "",
    author: "",
    url: "",
  };
  const [form, setForm] = useState(initialState);

  const handleChange = ({ target }) => {
    setForm((prevForm) => ({ ...prevForm, [target.name]: target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("submitin new note: ", form);
      const response = await blogService.create(form);
      setNotification({ error: false, message: `added title: ${form.title}` });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      setNotification({ error: true, message: error.message });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
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
