import { createAnecdote } from "../reduxSlices/anecdote";
//import { useDispatch } from "react-redux";
import { connect } from "react-redux";

function AnecdoteForm(props) {
  //const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    //dispatch(createAnecdote(content));
    props.createAnecdote(content);
  };

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
  );
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  createAnecdote,
};
const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm);

export default ConnectedAnecdoteForm;
