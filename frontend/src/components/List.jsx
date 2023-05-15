import React from "react";
import { useSelector } from "react-redux";
export default function Tabs(props) {
  const state = useSelector((state) => state);
  return (
    <div className="list grid grid-rows-10 grid-flow-row gap-2 h-screen w-1/4">
      {state.quiz.map((question, index) => {
        const check = props.questionOnScreen == index;
        const check2 =
          state.answered[index] !== null && state.answered[index] !== undefined;
        return (
          <div
            id={index}
            key={index}
            onClick={props.showHandler}
            className={`border-4 ${check ? "border-black" : ""} ${
              check2 ? "bg-green-400" : ""
            }`}
          >
            {index}
          </div>
        );
      })}
    </div>
  );
}
