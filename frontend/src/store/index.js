import { configureStore, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

if (localStorage.hasOwnProperty("name")) {
  initialState.name = localStorage.getItem("name");
} else {
  initialState.name = "";
  localStorage.setItem("name", "");
}
if (localStorage.hasOwnProperty("quiz")) {
  initialState.quiz = JSON.parse(localStorage.getItem("quiz"));
} else {
  initialState.quiz = [];
  localStorage.setItem("quiz", "[]");
}
if (localStorage.hasOwnProperty("category")) {
  initialState.category = localStorage.getItem("category");
} else {
  initialState.category = "";
  localStorage.setItem("category", "");
}
if (localStorage.hasOwnProperty("answered")) {
  initialState.answered = JSON.parse(localStorage.getItem("answered"));
} else {
  initialState.answered = {};
  localStorage.setItem("answered", "{}");
}
if (localStorage.hasOwnProperty("hasBegun")) {
  initialState.hasBegun =
    localStorage.getItem("hasBegun") === "true" ? true : false;
} else {
  initialState.hasBegun = false;
  localStorage.setItem("hasBegun", "false");
}
const slice = createSlice({
  name: "state",
  initialState,
  reducers: {
    choseCategory(prevState, action) {
      prevState.category = action.payload;
      localStorage.setItem("category", action.payload);
    },
    setUserName(prevState, action) {
      prevState.name = action.payload;
      localStorage.setItem("name", action.payload);
    },
    setQuiz(prevState, action) {
      prevState.quiz = JSON.parse(JSON.stringify(action.payload));
      prevState.hasBegun = true;
      localStorage.setItem("hasBegun", "true");
      localStorage.setItem("quiz", JSON.stringify(action.payload));
    },
    setAnswer(prevState, action) {
      const { q, a } = action.payload;
      prevState.answered[q] = a;
      const obj = JSON.parse(localStorage.getItem("answered"));
      obj[q] = a;
      localStorage.setItem("answered", JSON.stringify(obj));
    },
    setResults(prevState, action) {
      prevState.results = action.payload;
    },
    endSession(prevState, action) {
      localStorage.clear();
    },
  },
});

export const actions = slice.actions;
const store = configureStore({ reducer: slice.reducer });
export const thunkMiddlewaretoGetResults = (setError) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/quiz`,
        { answers: state.answered, questions: state.quiz },
        { headers: { "Content-Type": "application/json" } }
      );
      //console.log(res);
      if (res.status === 200) {
        dispatch(actions.setResults(res.data.docs));
        setError((prev) => {
          dispatch(actions.endSession());
          return { isLoading: false, error: false };
        });
      } else {
        throw new Error("Could not fetch the results");
      }
    } catch (err) {
      setError((prev) => {
        return { isLoading: false, error: true };
      });
    }
  };
};
export default store;
