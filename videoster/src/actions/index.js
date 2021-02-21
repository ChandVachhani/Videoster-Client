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