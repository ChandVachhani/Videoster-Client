import { combineReducers } from "redux";

const INITIAL_USER = {
  userId: localStorage.getItem("VideosterUserId"),
  userName: localStorage.getItem("VideosterUserName"),
};

const auth = (state = INITIAL_USER, action) => {
  switch (action.type) {
    case "LOGIN":
    case "VERIFY_LOGIN":
      return action.payload;
    case "LOG_OUT":
      return INITIAL_USER;
    default:
      return state;
  }
};

const selectedCategory = (
  state = localStorage.getItem("VideosterSelectedCategory"),
  action
) => {
  switch (action.type) {
    case "SELECT_CATEGORY":
      return action.payload;
    case "LOG_OUT":
      return "";
    default:
      return state;
  }
};

const categories = (state = [], action) => {
  switch (action.type) {
    case "ADD_CATEGORY":
      return [...state, action.payload];
    case "REGISTER":
      return ["General"];
    case "GET_CATEGORIES":
      return [...action.payload];
    case "LOG_OUT":
      return [];
    default:
      return state;
  }
};

const channels = (state = [], action) => {
  switch (action.type) {
    case "ADD_CHANNELS":
      return [...state, ...action.payload.addedChannels];
    case "GET_CHANNELS":
      return action.payload;
    case "LOG_OUT":
      return [];
    default:
      return state;
  }
};

const searchChannels = (state = [], action) => {
  switch (action.type) {
    case "SEARCHED_CHANNELS":
      return action.payload;
    case "LOG_OUT":
    case "CLEAR_SEARCHED_CHANNELS":
      return [];
    default:
      return state;
  }
};

const toggleSidebar = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  user: auth,
  selectedCategory,
  categories,
  channels,
  searchChannels,
  hideSidebar: toggleSidebar,
});
