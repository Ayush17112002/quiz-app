import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Home from "./pages/Home";
import Prompt from "./pages/Prompt";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
const url = "http://localhost:3000/";
function App() {
  const state = useSelector((state) => state);
  window.addEventListener("popstate", (e) => {
    if (
      window.location.href === `${url}quiz` ||
      window.location.href === `${url}result`
    ) {
      window.history.go(1);
    }
  });
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={state.hasBegun ? <Navigate to="/quiz" /> : <Home />}
        ></Route>
        <Route
          path="/prompt"
          element={state.hasBegun ? <Navigate to="/quiz" /> : <Prompt />}
        ></Route>
        <Route
          path="/quiz"
          element={
            state.name.length > 0 && state.category.length > 0 ? (
              <Quiz />
            ) : (
              <Navigate to="/" />
            )
          }
        ></Route>
        <Route
          path="/result"
          element={state.hasBegun ? <Result /> : <Navigate to="/quiz" />}
        ></Route>
      </Routes>
    </div>
  );
}
export default App;
