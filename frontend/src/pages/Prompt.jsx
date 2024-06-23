import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { actions } from "../store";
import styles from "./Prompt.module.css";
import Protected from "./Protected";

export default function Prompt() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [name, setName] = useState(state.name);
  return (
    <Protected>
      <div className={styles.prompt}>
        <div className={styles.form}>
          <input
            type="text"
            id="first_name"
            className={styles.inputBox}
            placeholder="Enter your name..."
            required
            autoComplete="off"
            onChange={(e) => {
              setName(() => e.target.value);
            }}
          />
          <Link
            to="/quiz"
            className={styles.startBtn}
            onClick={(e) => {
              dispatch(actions.setUserName(name));
            }}
          >
            Start Test
          </Link>
        </div>
      </div>
    </Protected>
  );
}
