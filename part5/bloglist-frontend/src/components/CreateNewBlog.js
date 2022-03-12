import { useState } from "react";
import {
  FormControl,
  FormLabel,
  // FormErrorMessage,
  // FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";

export default function CreateNewBlog({ addBlog }) {
  const initialState = {
    title: "",
    author: "",
    url: "",
  };
  const [form, setForm] = useState(initialState);

  const handleChange = ({ target }) => {
    setForm((prevForm) => ({ ...prevForm, [target.id]: target.value }));
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
        <FormControl>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            id="title"
            value={form.title}
            onChange={handleChange}
            placeholder="add title"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="author">Author</FormLabel>
          <Input
            id="author"
            value={form.author}
            onChange={handleChange}
            placeholder="add author"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="url">Url</FormLabel>
          <Input
            id="url"
            value={form.url}
            onChange={handleChange}
            placeholder="add url"
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          save
        </Button>
      </form>
    </>
  );
}
