import { combineReducers } from "redux";

const Login = (state = {}, action) => {
  if (action.type == "LOGIN") {
    return { userId: "1" };
  }
  else {
    return state;
  }
}

export default combineReducers({
  login: Login
});