import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { actions } from "../store";
export default function Prompt() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [name, setName] = useState(state.name);
  return (
    <div className="prompt h-screen bg-gradient-to-b from-[#374CE7] to-white flex flex-col justify-center items-center place-content-center">
      <div className="form w-auto h-auto p-8 bg-black opacity-50 flex flex-col gap-4 items-center justify-center rounded-md">
        <div className="text-lg w-96 h-11 m-4 bg-transparent shadow-md text-[white]">
          Enter your name
        </div>
        <input
          type="text"
          id="first_name"
          className="border-2 focus:border-none h-11 w-96 text-sm rounded-lg p-4"
          placeholder="Ayush"
          required
          onChange={(e) => {
            setName(() => e.target.value);
          }}
        />
        <Link
          to="/quiz"
          className="w-auto h-auto p-1 text-white"
          onClick={(e) => {
            dispatch(actions.setUserName(name));
          }}
        >
          Start Test
        </Link>
      </div>
    </div>
  );
}
