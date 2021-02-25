import { combineReducers } from "redux";

const INITIAL_USER = {
  userId: null,
  userName: null,
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

const selectedCategory = (state = "", action) => {
  switch (action.type) {
    case "SELECT_CATEGORY":
      return action.payload;
    default:
      return state;
  }
};

const categories = (state = [], action) => {
  switch (action.type) {
    case "ADD_CATEGORY":
      return [...state, action.payload];
    case "GET_CATEGORIES":
      return action.payload;
    default:
      return state;
  }
};

const channels = (state = [], action) => {
  switch (action.type) {
    case "ADD_CHANNELS":
      return [...state, action.payload.addedChannels];
    case "GET_CHANNELS":
      return action.payload;
    default:
      return state;
  }
};

const searchChannels = (state = [], action) => {
  switch (action.type) {
    case "SEARCHED_CHANNELS":
      return action.payload;
    default:
      return state;
  }
};

const toggleSidebar = (state = true, action) => {
  if (action.type === "TOGGLE_SIDEBAR") {
    return action.payload;
  }
  return state;
};

export default combineReducers({
  user: auth,
  selectedCategory,
  categories,
  channels,
  searchChannels,
  hideSidebar: toggleSidebar,
});
