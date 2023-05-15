import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { actions, thunkMiddlewaretoGetResults } from "../store";
import Error from "../components/Error";
export default function Result() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [error, setError] = useState({ isLoading: true, error: false });
  useEffect(() => {
    dispatch(thunkMiddlewaretoGetResults(setError));
  }, [dispatch, setError]);
  return (
    <>
      {error.error ? (
        <Error />
      ) : error.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-purple-900 flex flex-row justify-center items-center h-screen">
          <div className="text-3xl bg-purple-400 w-44 h-14 font-semibold rounded-lg">
            RESULT:
          </div>
          <span className="text-3xl bg-green-400 w-44 h-14 font-semibold rounded-lg ml-2">
            {state.results.correctCount}/{state.results.result.length}
          </span>
        </div>
      )}
    </>
  );
}
