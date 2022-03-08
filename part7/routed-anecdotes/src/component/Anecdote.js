const Anecdote = ({ anecdote }) => {
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
