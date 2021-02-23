import server from "../apis/server";
import YT from "../apis/YT";
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

export const addCategory = () => {

}

export const searchChannels = () => {

}

export const addChannels = () => {

}

export const toggleSidebar = (action) => {
  return {
    type: 'TOGGLE_SIDEBAR',
    payload: action
  }
}