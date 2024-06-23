import React from "react";
import { useSelector } from "react-redux";
import styles from "./List.module.css";

export default function Tabs(props) {
  const state = useSelector((state) => state);
  return (
    <div className={styles.list}>
      {state.quiz.map((question, index) => {
        const check = props.questionOnScreen == index;
        const check2 =
          state.answered[index] !== null && state.answered[index] !== undefined;
        return (
          <div
            id={index}
            key={index}
            onClick={props.showHandler}
            className={`${styles.index} ${check2 && styles.checked}`}
          >
            {index}
          </div>
        );
      })}
    </div>
  );
}
