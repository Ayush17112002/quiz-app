//side bar - all question number
//individual quesion
import axios from "axios";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store";
import { useNavigate } from "react-router-dom";
import Tabs from "../components/List";
import Error from "../components/Error";
import styles from "./Quiz.module.css";
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
    dispatch(actions.setAnswer({ q: questionOnScreen, a: who }));
  };
  const answerHandler = (e) => {
    setOptions(() => {
      return { ...options, answer: e.target.value };
    });
    dispatch(actions.setAnswer({ q: "answer", a: e.target.value }));
  };
  const submitHandler = (e) => {
    navigate("/result");
  };
  useEffect(() => {
    const fun = async () => {
      try {
        const res = await axios.get(`${url}/quiz/${state.category}`);
        if (res.status === 200) {
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
  return (
    <div className={styles.quiz}>
      {error.error && <Error>Error</Error>}
      {error.isLoading && <Error>Loading</Error>}
      {!error.isLoading && !error.error && (
        <div className={styles.container}>
          <Tabs showHandler={showHandler} questionOnScreen={questionOnScreen} />
          <div className={styles.question}>
            <p className={styles.name}>{state.quiz[questionOnScreen].name}</p>
            {state.quiz[questionOnScreen].mcq ? (
              <>
                <div className={styles.checkBox}>
                  <input
                    type="checkbox"
                    className={styles.checkBoxInput}
                    id="0"
                    checked={options[0]}
                    onChange={checkBoxHandler}
                  ></input>
                  <div className="">
                    {state.quiz[questionOnScreen].choice[0]}
                  </div>
                </div>
                <div className={styles.checkBox}>
                  <input
                    type="checkbox"
                    className={styles.checkBoxInput}
                    id="1"
                    checked={options[1]}
                    onChange={checkBoxHandler}
                  ></input>
                  <div className="">
                    {state.quiz[questionOnScreen].choice[1]}
                  </div>
                </div>
                <div className={styles.checkBox}>
                  <input
                    checked={options[2]}
                    type="checkbox"
                    className={styles.checkBoxInput}
                    id="2"
                    onChange={checkBoxHandler}
                  ></input>
                  <div className="">
                    {state.quiz[questionOnScreen].choice[2]}
                  </div>
                </div>
                <div className={styles.checkBox}>
                  <input
                    type="checkbox"
                    checked={options[3]}
                    className={styles.checkBoxInput}
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
          <button type="submit" className={styles.btn} onClick={submitHandler}>
            End Test
          </button>
        </div>
      )}
    </div>
  );
}
