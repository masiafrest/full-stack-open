import anecdoteReducer, {
  initialState as mockFromReducer,
} from "./anecdoteReducer";
import deepFreeze from "deep-freeze";

describe("anecdoteReducer", () => {
  const initialState = [
    {
      content: "abc",
      id: 1,
      votes: 0,
    },
    {
      content: "123",
      id: 2,
      votes: 0,
    },
  ];

  test("return proper state called with state undefined", () => {
    const action = { type: "DO_NOTHING" };
    const newState = anecdoteReducer(undefined, action);

    expect(newState).toEqual(mockFromReducer);
  });

  test("return state with votes + 1", () => {
    const votePlusOne = (e) => {
      if (e.id === 1)
        return {
          ...e,
          votes: e.votes + 1,
        };
      return e;
    };
    const state = initialState;
    deepFreeze(state);
    let expectState = [...state].map(votePlusOne);
    const action = { type: "VOTE_ANECDOTE", data: { id: 1 } };
    const newState = anecdoteReducer(state, action);
    expect(newState).toEqual(expectState);

    expectState = expectState.map(votePlusOne);
    const newState2 = anecdoteReducer(newState, action);
    expect(newState2).toEqual(expectState);
  });

  test("6.4: adding new anecdote", () => {
    const content = '!"#"';
    const state = initialState;
    deepFreeze(state);

    const action = { type: "ADD_ANECDOTE", data: content };
    const newState = anecdoteReducer(state, action);
    expect(newState[2].content).toBe(content);
  });

  test("6.5: anecdote are order by number of votes", () => {
    const state = initialState;
    deepFreeze(state);

    const action = { type: "VOTE_ANECDOTE", data: { id: 1 } };
    const newState = anecdoteReducer(state, action);
    expect(newState[0].votes).toBe(1);
  });
});
