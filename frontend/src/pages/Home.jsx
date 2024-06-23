import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Home.module.css";
import axios from "axios";
import Category from "../components/Category";
import Error from "../components/Error";
import Protected from "./Protected";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
const port = process.env.REACT_APP_PORT;
const url = process.env.REACT_APP_URL;

export default function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${url}/category/`);
        console.log(res);
        if (res.status === 200) {
          console.log(res.data);
          setCategories(() => res.data.docs);
        } else {
          throw new Error("fetchCategories ~ error");
        }
      } catch (err) {
        console.log(err);
        setError(() => true);
      }
    };
    fetchCategories();
  }, []);

  const logoutHandler = async (e) => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.log(err, "logoutHandler ~ error");
    }
  };

  return (
    <Protected>
      <div className={styles.home}>
        {error ? (
          <Error></Error>
        ) : (
          categories.map((category) => {
            return (
              <Category key={category.name} name={category.name}></Category>
            );
          })
        )}
        <button className={styles.btn} onClick={logoutHandler}>
          Log Out
        </button>
      </div>
    </Protected>
  );
}
