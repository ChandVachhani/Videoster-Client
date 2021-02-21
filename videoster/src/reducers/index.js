import { combineReducers } from "redux";

const Login = (state = {}, action) => {
  if (action.type == "LOGIN") {
    return action.payload;
  }
  else {
    return state;
  }
}

const toggleSidebar = (state = true, action) => {
  if (action.type === 'TOGGLE_SIDEBAR') {
    return action.payload;
  }
  return state;
}

export default combineReducers({
  user: Login,
  hideSidebar: toggleSidebar
});