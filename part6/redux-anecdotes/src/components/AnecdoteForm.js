import { addAnecdote as createAnecdote } from "../reduxSlices/anecdote";
import {
  setNotification,
  removeNotification,
} from "../reduxSlices/notification";
import { useDispatch } from "react-redux";

export default function AnecdoteForm() {
  const dispatch = useDispatch();

  const addAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    e.target.content.value = "";
    dispatch(createAnecdote(content));
    dispatch(setNotification(content));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <>
      <h2>create new</h2>

      <form onSubmit={addAnecdote}>
        <div>
          <input name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
}
