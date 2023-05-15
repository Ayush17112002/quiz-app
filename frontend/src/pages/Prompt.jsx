import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { actions } from "../store";
export default function Prompt() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [name, setName] = useState(state.name);
  return (
    <div className="prompt  h-screen flex flex-col justify-center items-center place-content-center">
      <div className="text-lg w-96 h-11 m-4 bg-transparent shadow-md text-black">
        Enter your name
      </div>
      <input
        type="text"
        id="first_name"
        className="border-2 border-rose-600  hover:shadow-lg h-11 w-96 text-sm rounded-lg"
        placeholder="Ayush"
        required
        onChange={(e) => {
          setName(() => e.target.value);
        }}
      />
      <Link
        to="/quiz"
        className="w-40 m-4 shadow-md"
        onClick={(e) => {
          dispatch(actions.setUserName(name));
        }}
      >
        Start Test
      </Link>
    </div>
  );
}
