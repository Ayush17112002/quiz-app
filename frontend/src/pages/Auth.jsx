import { useRef } from "react";
import styles from "./Auth.module.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
export default function Auth() {
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  async function onLoginHandler(e) {
    try {
      e.preventDefault();
      const user = await signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      );
      const token = user.user.accessToken;
      console.log(user.user, user.user.accessToken);
      localStorage.setItem("token", token);
      navigate("/home");
    } catch (err) {
      console.log("Error");
    }
  }

  async function onSignupHandler(e) {
    try {
      e.preventDefault();
      const user = await createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      );
      const token = user.user.accessToken;
      console.log(user.user, user.user.accessToken);
      localStorage.setItem("token", token);
      navigate("/home");
    } catch (err) {
      console.log("Error");
    }
  }
  return (
    <div className={styles.auth}>
      <div className={styles.container}>
        <div className={styles.box}>
          <label htmlFor="email" className={styles.label}>
            Email:
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            autoComplete="off"
            placeholder="xyz@gmail.com"
            ref={email}
          />
        </div>
        <div className={styles.box}>
          <label className={styles.label} htmlFor="password">
            Password:
          </label>
          <input
            className={styles.input}
            type="password"
            id="password"
            minLength={8}
            ref={password}
          />
        </div>
        <div className={styles.btns}>
          <button onClick={onLoginHandler} className={styles.btn} type="submit">
            Login
          </button>
          <button
            onClick={onSignupHandler}
            className={styles.btn}
            type="submit"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}
