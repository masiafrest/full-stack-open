import filterReducer from "./filterSlice";
import deepFreeze from "deep-freeze";

describe("FilterSlice", () => {
  test("add char", () => {
    const state = "";
    const action = {
      type: "filter/changeFilter",
      payload: "a",
    };

    deepFreeze(state);
    let newState = filterReducer(state, action);

    expect(newState).toBe("a");

    action.payload = "ab";
    newState = filterReducer(state, action);
    expect(newState).toBe("ab");
  });
});
