//side bar - all question number
//individual quesion
import axios from "axios";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store";
import { useNavigate } from "react-router-dom";
import Tabs from "../components/List";
import Error from "../components/Error";
const url = process.env.REACT_APP_URL;

export default function Quiz() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [error, setError] = useState({ isLoading: true, error: false });
  const [questionOnScreen, setQuestionOnScreen] = useState(0);
  const [options, setOptions] = useState({
    0: state.answered[questionOnScreen] === 0 ? true : false,
    1: state.answered[questionOnScreen] === 1 ? true : false,
    2: state.answered[questionOnScreen] === 2 ? true : false,
    3: state.answered[questionOnScreen] === 3 ? true : false,
    answer: "",
  });
  const showHandler = (e) => {
    setQuestionOnScreen(() => e.target.id);
    console.log(
      state.answered,
      e.target.id,
      typeof state.answered[e.target.id]
    );
    const tmp = {
      0: state.answered[e.target.id] === 0 ? true : false,
      1: state.answered[e.target.id] === 1 ? true : false,
      2: state.answered[e.target.id] === 2 ? true : false,
      3: state.answered[e.target.id] === 3 ? true : false,
      answer:
        typeof state.answered[e.target.id] === "string"
          ? state.answered[e.target.id]
          : "",
    };
    setOptions(tmp);
  };
  const checkBoxHandler = (e) => {
    const id = e.target.id;
    let who = null;
    const obj = { ...options, 0: false, 1: false, 2: false, 3: false };
    obj[id] = !options[id];
    if (obj[0]) who = 0;
    else if (obj[1]) who = 1;
    else if (obj[2]) who = 2;
    else if (obj[3]) who = 3;
    else if (typeof obj["answer"] === "string" && obj["answer"].length > 0)
      who = obj["answer"];
    setOptions((prev) => {
      return obj;
    });
    //console.log(who);
    dispatch(actions.setAnswer({ q: questionOnScreen, a: who }));
  };
  //console.log(options);
  const answerHandler = (e) => {
    setOptions(() => {
      return { ...options, answer: e.target.value };
    });
    dispatch(actions.setAnswer({ q: "answer", a: e.target.value }));
  };
  const submitHandler = (e) => {
    //console.log("Fdfd");
    navigate("/result");
  };
  useEffect(() => {
    const fun = async () => {
      try {
        //console.log(`${url}/quiz/${state.category}`);
        const res = await axios.get(`${url}/quiz/${state.category}`);
        if (res.statusText === "OK") {
          dispatch(actions.setQuiz(res.data.quiz));
          setError((err) => {
            return { isLoading: false, error: false };
          });
        } else {
          throw new Error("Could not fetch questions");
        }
      } catch (err) {
        setError({ isLoading: false, error: true });
      }
    };
    if (state.hasBegun) {
      setError((err) => {
        return { isLoading: false, error: false };
      });
      return;
    } else {
      fun();
    }
  }, [state]);
  //console.log(error);
  return (
    <div className="quiz">
      {error.error && <Error></Error>}
      {error.isLoading && <div>Loading</div>}
      {!error.isLoading && !error.error && (
        <div className="flex flex-row">
          <Tabs showHandler={showHandler} questionOnScreen={questionOnScreen} />
          <div className="question m-10">
            <p className="d-flex flex-row align-top justify-start">
              {state.quiz[questionOnScreen].name}
            </p>
            {state.quiz[questionOnScreen].mcq ? (
              <>
                <div className="flex flex-row">
                  <input
                    type="checkbox"
                    className="  checked:bg-blue-500 w-5 h-5 m-5"
                    id="0"
                    checked={options[0]}
                    onChange={checkBoxHandler}
                  ></input>
                  <div className="">
                    {state.quiz[questionOnScreen].choice[0]}
                  </div>
                </div>
                <div className="flex flex-row">
                  <input
                    type="checkbox"
                    className="checked:bg-blue-500 w-5 h-5 m-5"
                    id="1"
                    checked={options[1]}
                    onChange={checkBoxHandler}
                  ></input>
                  <div className="">
                    {state.quiz[questionOnScreen].choice[1]}
                  </div>
                </div>
                <div className="flex flex-row">
                  <input
                    checked={options[2]}
                    type="checkbox"
                    className="checked:bg-blue-500 w-5 h-5 m-5"
                    id="2"
                    onChange={checkBoxHandler}
                  ></input>
                  <div className="">
                    {state.quiz[questionOnScreen].choice[2]}
                  </div>
                </div>
                <div className="flex flex-row">
                  <input
                    type="checkbox"
                    checked={options[3]}
                    className="checked:bg-blue-500 w-5 h-5 m-5"
                    id="3"
                    onChange={checkBoxHandler}
                  ></input>
                  <div className="">
                    {state.quiz[questionOnScreen].choice[3]}
                  </div>
                </div>
              </>
            ) : (
              <>
                <input type="text" onChange={answerHandler}></input>
              </>
            )}
          </div>
          <button
            type="submit"
            className="bottom-0 right-0 absolute w-28 h-10 mb-5 mr-5 rounded-md bg-red-500 font-semibold"
            onClick={submitHandler}
          >
            End Test
          </button>
        </div>
      )}
    </div>
  );
}
