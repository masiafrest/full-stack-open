import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reduxSlices/anecdote";

export default function AnecdoteList() {
  const anecdotes = useSelector((state) => {
    const { filter, anecdotes } = state;
    return anecdotes.filter((e) => e.content.toLowerCase().includes(filter));
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  ));
}
