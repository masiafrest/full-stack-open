const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const sortAnecdote = (anecdotes = [asObject("234")]) =>
  anecdotes.sort((a, b) => b.votes - a.votes);

export const initialState = anecdotesAtStart.map(asObject);
const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "VOTE_ANECDOTE":
      const id = action.data.id;
      newState = [...state].map((e) => {
        if (e.id === id)
          return {
            ...e,
            votes: e.votes + 1,
          };
        return e;
      });
      return sortAnecdote(newState);
    case "ADD_ANECDOTE":
      const newAnecdote = asObject(action.data);
      newState = state.concat(newAnecdote);
      return sortAnecdote(newState);
    default:
      return state;
  }
};

export default reducer;

//actions

export const voteAnecdote = (id) => ({
  type: "VOTE_ANECDOTE",
  data: {
    id,
  },
});

export const createAnecdote = (anecdote) => ({
  type: "ADD_ANECDOTE",
  data: anecdote,
});
