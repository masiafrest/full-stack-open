import { addAnecdote } from "../reduxSlices/anecdote";
import anecdoteService from "../services/anecdotes";
import { useDispatch } from "react-redux";

export default function AnecdoteForm() {
  const dispatch = useDispatch();

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    const newNote = await anecdoteService.createAnecdote(content);
    dispatch(addAnecdote(newNote));
  };

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  );
}
