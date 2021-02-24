import { combineReducers } from "redux";

const INITIAL_USER = {
  userId: null,
  userName: null
}

const Login = (state = INITIAL_USER, action) => {
  switch (action.type) {
    case "LOGIN":
    case "VERIFY_LOGIN":
      return action.payload;
    case "LOG_OUT":
      return INITIAL_USER;
    default:
      return state;
  }
}

const categories = (state = {}, action) => {
  switch (action.type) {
    case "ADD_CATEGORY":
      return { ...state, [`${action.payload}`]: [] };
    case "GET_CATEGORIES":
      return { ...action.payload };
    case "ADD_CHANNELS":
      return { ...state, [`${action.payload.category}`]: [...state[action.payload.category], ...action.payload.addedChannels] };
    default:
      return state;
  }
}

const searchChannels = (state = [], action) => {
  switch (action.type) {
    case "SEARCHED_CHANNELS":
      return action.payload;
    default:
      return state;
  }
}

const toggleSidebar = (state = true, action) => {
  if (action.type === 'TOGGLE_SIDEBAR') {
    return action.payload;
  }
  return state;
}

const selectedCategory = (state = "", action) => {
  switch (action.type) {
    case "SELECT_CATEGORY":
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  user: Login,
  hideSidebar: toggleSidebar,
  categories,
  searchChannels,
  selectedCategory,
});