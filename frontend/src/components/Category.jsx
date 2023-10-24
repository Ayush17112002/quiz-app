import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store";
import { Link } from "react-router-dom";
export default function Category(props) {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  function categoryHandler(e) {
    dispatch(actions.choseCategory(e.target.classList[0]));
  }
  return (
    <div className="category relative bg-[#374CE7] w-96 p-5 m-5 rounded-lg shadow-lg hover:scale-110 transition-all ease-linear duration-250 hover:cursor-pointer">
      <div className={` text-[#FDE2F3] text-xl font-semibold`}>
        <Link to="prompt" onClick={categoryHandler} className={`${props.name}`}>
          {props.name}
        </Link>
      </div>
    </div>
  );
}
