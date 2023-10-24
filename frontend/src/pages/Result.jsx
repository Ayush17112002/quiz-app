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
        <div className="bg-gradient-to-b from-[#374CE7] flex flex-row justify-center items-center h-screen">
          <div className="text-3xl bg-blue-800 w-auto h-auto flex justify-center items-center font-semibold rounded-lg p-8">
            Your score is : {state.results.correctCount}/
            {state.results.result.length}
          </div>
        </div>
      )}
    </>
  );
}
