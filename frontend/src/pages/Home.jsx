import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Category from "../components/Category";
import Error from "../components/Error";
const port = process.env.REACT_APP_PORT;
const url = process.env.REACT_APP_URL;
export default function Home() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fun = async () => {
      try {
        const res = await axios.get(`${url}/category/`);
        console.log(res);
        if (res.status === 200) {
          console.log(res.data);
          setCategories(() => res.data.docs);
        } else {
          throw new Error("error");
        }
      } catch (err) {
        console.log(err);
        setError(() => true);
      }
    };
    fun();
  }, []);

  return (
    <div className="home bg-gradient-to-b from-[#374CE7] to-[rgba(55, 76, 231, 0.00)] flex items-center justify-center flex-col h-screen">
      {error ? (
        <Error></Error>
      ) : (
        categories.map((category) => {
          return <Category key={category.name} name={category.name}></Category>;
        })
      )}
    </div>
  );
}
