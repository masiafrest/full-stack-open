import { useParams } from "react-router-dom";
const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find((e) => e.id === Number(id));
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>author: {anecdote.author}</div>
      <div>votes: {anecdote.votes}</div>
      <div>info: {anecdote.info}</div>
    </div>
  );
};

export default Anecdote;
