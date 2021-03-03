import { combineReducers } from "redux";

// const INITIAL_USER = {
//   userId: localStorage.getItem("VideosterUserId"),
//   userName: localStorage.getItem("VideosterUserName"),
// };

const auth = (
  state = {
    userId: localStorage.getItem("VideosterUserId"),
    userName: localStorage.getItem("VideosterUserName"),
  },
  action
) => {
  switch (action.type) {
    case "LOGIN":
    case "VERIFY_LOGIN":
      return action.payload;
    case "LOG_OUT":
      return {
        userId: null,
        userName: null,
      };
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
      const arr = state.map((st) => {
        return st.channelId;
      });
      // return [...state, ...action.payload.addedChannels];
      const data = [...state];
      action.payload.addedChannels.forEach((channel) => {
        if (!arr.includes(channel.channelId)) {
          data.push(channel);
        }
      });
      return data;
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

const selectChannel = (state = {}, action) => {
  switch (action.type) {
    case "SELECT_CHANNEL":
      if (state[action.payload]) return { ...state, [action.payload]: false };
      else return { ...state, [action.payload]: true };
    case "CLEAR_HIDDEN_CHANNELS":
    case "LOG_OUT":
      return {};
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
  hideChannel: selectChannel,
});
