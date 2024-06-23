import Auth from "./Auth";

export default function Protected({ children }) {
  let token = localStorage.getItem("token");
  if (token === "undefined") {
    token = undefined;
  }
  const isAuthenticated = token !== undefined && token !== null;
  console.log(isAuthenticated, token);
  return <>{isAuthenticated ? children : <Auth />}</>;
}
