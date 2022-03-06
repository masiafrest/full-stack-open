import anecdoteReducer from "./anecdote";
import deepFreeze from "deep-freeze";

describe("anecdoteReducer", () => {
  test("returns new state with action notes/createNote", () => {
    const state = [];
    const action = {
      type: "anecdotes/addAnecdote",
      payload: "the app state is in redux store",
    };

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);

    expect(newState).toHaveLength(1);
    expect(newState.map((s) => s.content)).toContainEqual(action.payload);
  });

  test("returns new state with action anecdotes/voteAnecdote", () => {
    const state = [
      {
        content: "the app state is in redux store",
        votes: 10,
        id: 1,
      },
      {
        content: "state changes are made with actions",
        votes: 11,
        id: 2,
      },
    ];

    const action = {
      type: "anecdotes/voteAnecdote",
      payload: 2,
    };

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);

    expect(newState).toHaveLength(2);

    expect(newState).toContainEqual(state[0]);

    expect(newState).toContainEqual({
      content: "state changes are made with actions",
      votes: 12,
      id: 2,
    });
  });
});
