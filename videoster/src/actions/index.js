import server from "../apis/server";
import history from "../history";
import { createNotification } from "../utils/createNotification";

// TODO make clear logic about verify login
export const verifyLogin = () => {
  return {
    type: "VERIFY_LOGIN",
    payload: {
      userId: localStorage.getItem("userId"),
      userName: localStorage.getItem("userName"),
    },
  };
};

export const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  history.push("/");
  return {
    type: "LOG_OUT",
  };
};

export const takeMeIn = (values) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/auth/Login", values, {
        headers: {
          Authorization: `Basic ${localStorage.getItem("token")}`,
        },
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("userName", res.data.userName);
      history.push("/LandingPlace");
      dispatch({
        type: "LOGIN",
        payload: {
          userId: res.data.userId,
          userName: res.data.userName,
        },
      });
    } catch (err) {
      window.alert("Wrong");
    }
  };
};

export const registerUser = (values) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/auth/Register", values, {
        headers: {
          Authorization: `Basic ${localStorage.getItem("token")}`,
        },
      });
      history.push("/");
    } catch (err) {
      window.alert("Wrong");
    }
  };
};

export const addCategory = (category) => {
  return async (dispatch) => {
    try {
      const values = {
        category,
      };
      await server.post("/users/addCategory", values, {
        headers: {
          Authorization: `Basic ${localStorage.getItem("token")}`,
        },
      });
      dispatch({
        type: "ADD_CATEGORY",
        payload: category,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const searchChannels = (searchWord) => {
  return async (dispatch, getStatus) => {
    try {
      const category = getStatus().selectedCategory;
      const values = {
        searchWord,
      };
      let channels = await server.post(
        `/users/${category}/searchChannels`,
        values,
        {
          headers: {
            Authorization: `Basic ${localStorage.getItem("token")}`,
          },
        }
      );
      channels = channels.data.data;
      dispatch({
        type: "SEARCHED_CHANNELS",
        payload: channels,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const addChannels = (channels) => {
  return async (dispatch, getStatus) => {
    try {
      const category = getStatus().selectedCategory;
      const values = {
        channels,
      };
      const addedChannels = await server.post(
        `/users/${category}/addChannels`,
        values,
        {
          headers: {
            Authorization: `Basic ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("kk => ", addedChannels.data.channels);
      dispatch({
        type: "ADD_CHANNELS",
        payload: {
          category,
          addedChannels: addedChannels.data.channels,
        },
      });
      history.push("/Dashboard");
    } catch (err) {
      console.error(err);
    }
  };
};

export const getCategories = () => {
  return async (dispatch) => {
    try {
      const values = {};
      let data = await server.get("/users/getCategories", {
        headers: {
          Authorization: `Basic ${localStorage.getItem("token")}`,
        },
      });
      data = data.data.requiredData;
      console.log(data);
      dispatch({
        type: "GET_CATEGORIES",
        payload: data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const getChannels = () => {
  return async (dispatch) => {
    try {
      const values = {};
      let data = await server.get("/users/getChannels", {
        headers: {
          Authorization: `Basic ${localStorage.getItem("token")}`,
        },
      });
      data = data.data.requiredData;
      console.log(data);
      dispatch({
        type: "GET_CHANNELS",
        payload: data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const selectCategory = (category) => {
  return {
    type: "SELECT_CATEGORY",
    payload: category,
  };
};

export const toggleSidebar = (action) => {
  return {
    type: "TOGGLE_SIDEBAR",
    payload: action,
  };
};
