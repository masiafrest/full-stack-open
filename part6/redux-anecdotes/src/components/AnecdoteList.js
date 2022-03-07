import { useSelector, useDispatch } from "react-redux";
import { putVoteAnecdote } from "../reduxSlices/anecdote";

export default function AnecdoteList() {
  const anecdotes = useSelector((state) => {
    const { filter, anecdotes } = state;
    return anecdotes.filter((e) => {
      return e.content.toLowerCase().includes(filter);
    });
  });
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    const newAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    dispatch(putVoteAnecdote(newAnecdote));
  };

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  ));
}
