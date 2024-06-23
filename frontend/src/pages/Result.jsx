import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { actions, thunkMiddlewaretoGetResults } from "../store";
import Error from "../components/Error";
import styles from "./Result.module.css";
import Protected from "./Protected";

export default function Result() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [error, setError] = useState({ isLoading: true, error: false });
  useEffect(() => {
    dispatch(thunkMiddlewaretoGetResults(setError));
  }, [dispatch, setError]);
  return (
    <Protected>
      <>
        {error.error ? (
          <Error>Error</Error>
        ) : error.isLoading ? (
          <Error>Loading</Error>
        ) : (
          <div className={styles.container}>
            <div className={styles.text}>
              Your score is : {state.results.correctCount}/
              {state.results.result.length}
            </div>
          </div>
        )}
      </>
    </Protected>
  );
}
