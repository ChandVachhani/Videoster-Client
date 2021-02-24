import server from "../apis/server";
import history from "../history";
import { createNotification } from "../utils/createNotification";

export const checkLogIn = (values) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/auth/Login", JSON.stringify(values), {
        headers: {
          "Content-Type": "application/json",
        }
      });
      localStorage.setItem("token", res.data.token);
      history.push("/Dashboard");
      dispatch({
        type: "LOGIN",
        payload: {
          userId: res.data.userId,
          userName: res.data.userName
        }
      });
    } catch (err) {
      window.alert("Wrong");
    }
  }
}

export const registerUser = (values) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/auth/Register", JSON.stringify(values), {
        headers: {
          "Content-Type": "application/json",
        }
      });
      history.push("/");
    }
    catch (err) {
      window.alert("Wrong");
    }
  }
}

export const addCategory = (category) => {
  return async (dispatch) => {
    try {
      const values = {
        category
      }
      await server.post("/users/addCategory", values);
      dispatch({
        type: "ADD_CATEGORY",
        payload: category
      });
    }
    catch (err) {
      console.error(err);
    }
  }
}

export const searchChannels = (searchWord) => {
  return async (dispatch) => {
    try {
      const values = {
        searchWord
      };
      const channels = await server.post("/users/searchChannels", values);
      console.log(channels);
    }
    catch (err) {
      console.error(err);
    }
  }
}

export const addChannels = (category, channels) => {
  return async (dispatch) => {
    try {
      const values = {
        category,
        channels
      };
      const addedChannels = await server.post("/users/addChannels", values);
      console.log(addedChannels);
    }
    catch (err) {
      console.error(err);
    }
  }
}

export const getCategories = () => {
  return async (dispatch) => {
    try {
      const values = {};
      const data = await server.post("/users/getCategories", values);
      console.log(data);
    }
    catch (err) {
      console.error(err);
    }
  }
}

export const toggleSidebar = (action) => {
  return {
    type: 'TOGGLE_SIDEBAR',
    payload: action
  }
}