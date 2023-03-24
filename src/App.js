
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { GetUserDetails } from "./App/Redux/Actions/AuthActions";
import { GetWalletBalance } from "./App/Redux/Actions/WalletActions";
import Router from "./Router/Router";
function App() {
  const dispatch = useDispatch()
  const UserToken = localStorage.getItem('UserToken')
  const isAuthenticated =
    UserToken !== 'undefined' && UserToken !== null ? true : false
  const userId =
    UserToken !== 'undefined' && UserToken !== null
      ? JSON.parse(UserToken).user_id
      : undefined
  useEffect(() => {
    if (userId != undefined) {
      dispatch(GetUserDetails({ id: userId }))
      dispatch(GetWalletBalance({ user_id: userId }))
    }
  }, [isAuthenticated, userId])
  return (
    <div className="app">
      <Router />
    </div>
  );
}

export default App;
