import server from "../apis/server";
import history from "../history";
import { createNotification } from "../utils/createNotification";

// TODO make clear logic about verify login
export const verifyLogin = () => {
  return {
    type: "VERIFY_LOGIN",
    payload: {
      userId: localStorage.getItem("VideosterUserId"),
      userName: localStorage.getItem("VideosterUserName"),
    },
  };
};

export const logOut = () => {
  return async (dispatch) => {
    await localStorage.removeItem("VideosterToken");
    await localStorage.removeItem("VideosterUserId");
    await localStorage.removeItem("VideosterUserName");
    await localStorage.removeItem("VideosterSelectedCategory");
    dispatch({
      type: "LOG_OUT",
    });
    history.push("/");
  };
};

export const takeMeIn = (values) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/auth/Login", values, {
        headers: {
          Authorization: `Basic ${localStorage.getItem("VideosterToken")}`,
        },
      });
      await localStorage.setItem("VideosterToken", res.data.token);
      await localStorage.setItem("VideosterUserId", res.data.userId);
      await localStorage.setItem("VideosterUserName", res.data.userName);
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
          Authorization: `Basic ${localStorage.getItem("VideosterToken")}`,
        },
      });
      dispatch({
        type: "REGISTER",
      });
      history.push("/");
    } catch (err) {
      window.alert("Wrong");
    }
  };
};

export const addCategory = (category) => {
  return async (dispatch, getStatus) => {
    try {
      const values = {
        category,
      };
      await server.post(
        `/users/${getStatus().user.userId}/categories`,
        values,
        {
          headers: {
            Authorization: `Basic ${localStorage.getItem("VideosterToken")}`,
          },
        }
      );
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
      const values = {
        searchWord,
      };
      const result = await server.get(`/YT/channels/${searchWord}`, {
        headers: {
          Authorization: `Basic ${localStorage.getItem("VideosterToken")}`,
        },
      });
      const channelIds = result.data.channels;
      let channels = [];
      for (let ind in channelIds) {
        const channel = await server.get(`/YT/channel/${channelIds[ind]}`, {
          headers: {
            Authorization: `Basic ${localStorage.getItem("VideosterToken")}`,
          },
        });
        channels.push(channel.data.channel);
      }
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
      for (let i in channels) {
        const channel = channels[i];
        await server.post(
          `/categories/${category}/channels`,
          { channel },
          {
            headers: {
              Authorization: `Basic ${localStorage.getItem("VideosterToken")}`,
            },
          }
        );

        let videos = await server.get(
          `/YT/channels/${channel.channelId}/videos`,
          {
            headers: {
              Authorization: `Basic ${localStorage.getItem("VideosterToken")}`,
            },
          }
        );
        videos = videos.data.videos.map((video) => {
          return {
            videoId: video.id.videoId,
            description: video.snippet.description,
            avatarDefault: video.snippet.thumbnails.default.url,
            avatarHigh: video.snippet.thumbnails.high.url,
            avatarMedium: video.snippet.thumbnails.medium.url,
            title: video.snippet.title,
          };
        });
        channels[i].videos = videos;

        for (let j in videos) {
          await server.post(
            `/channels/${channel.channelId}/videos`,
            { video: videos[j] },
            {
              headers: {
                Authorization: `Basic ${localStorage.getItem(
                  "VideosterToken"
                )}`,
              },
            }
          );
        }
      }

      dispatch({
        type: "ADD_CHANNELS",
        payload: {
          category,
          addedChannels: channels,
        },
      });
      history.push("/Dashboard");
    } catch (err) {
      console.error(err);
    }
  };
};

export const getCategories = () => {
  return async (dispatch, getStatus) => {
    try {
      let data = await server.get(
        `/users/${getStatus().user.userId}/categories`,
        {
          headers: {
            Authorization: `Basic ${localStorage.getItem("VideosterToken")}`,
          },
        }
      );
      data = data.data.categories;
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
  return async (dispatch, getStatus) => {
    try {
      let category = getStatus().selectedCategory;
      if (!category) return;
      let data = [];
      if (category == "General") {
        const categories = getStatus().categories;
        for (let ind in categories) {
          const currentCategory = categories[ind];
          if (currentCategory != category) {
            let result = await server.get(
              `/categories/${currentCategory}/channels`,
              {
                headers: {
                  Authorization: `Basic ${localStorage.getItem(
                    "VideosterToken"
                  )}`,
                },
              }
            );
            result = result.data.channels;

            for (let i in result) {
              const channelId = result[i].channelId;
              let resultVideos = await server.get(
                `/channels/${channelId}/videos`,
                {
                  headers: {
                    Authorization: `Basic ${localStorage.getItem(
                      "VideosterToken"
                    )}`,
                  },
                }
              );
              result[i].videos = resultVideos.data.videos;
            }

            data.push(...result);
          }
        }
        let map = [];

        data = data.filter((curr) => {
          if (!map.includes(curr.channelId)) {
            map.push(curr.channelId);
            return true;
          } else {
            return false;
          }
        });
      } else {
        data = await server.get(`/categories/${category}/channels`, {
          headers: {
            Authorization: `Basic ${localStorage.getItem("VideosterToken")}`,
          },
        });
        data = data.data.channels;

        for (let i in data) {
          const channelId = data[i].channelId;
          let result = await server.get(`/channels/${channelId}/videos`, {
            headers: {
              Authorization: `Basic ${localStorage.getItem("VideosterToken")}`,
            },
          });
          data[i].videos = result.data.videos;
        }
      }
      if (data.length == 0) {
        data.push(-1);
      }
      dispatch({
        type: "GET_CHANNELS",
        payload: data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const removeCategory = (category) => {
  return async (dispatch, getStatus) => {
    try {
      await server.delete(`/categories/${category}`, {
        data: { foo: "bar" },
        headers: {
          Authorization: `Basic ${localStorage.getItem("VideosterToken")}`,
        },
      });
      dispatch({
        type: "REMOVE_CATEGORY",
        payload: category,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const removeChannel = (channelId) => {
  return async (dispatch, getStatus) => {
    try {
      await server.delete(`/channels/${channelId}`, {
        data: { category: getStatus().selectedCategory },
        headers: {
          Authorization: `Basic ${localStorage.getItem("VideosterToken")}`,
        },
      });
      dispatch({
        type: "REMOVE_CHANNEL",
        payload: channelId,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const selectChannel = (channelId) => {
  return {
    type: "SELECT_CHANNEL",
    payload: channelId,
  };
};

export const clearHideChannels = () => {
  return {
    type: "CLEAR_HIDDEN_CHANNELS",
  };
};

export const selectCategory = (category) => {
  localStorage.setItem("VideosterSelectedCategory", category);
  return {
    type: "SELECT_CATEGORY",
    payload: category,
  };
};

export const clearSearchedChannels = () => {
  console.log("-------------------------------");
  return {
    type: "CLEAR_SEARCHED_CHANNELS",
  };
};

export const toggleSidebar = (action) => {
  return {
    type: "TOGGLE_SIDEBAR",
    payload: action,
  };
};

export const clearAllChannels = (action) => {
  return {
    type: "CLEAR_ALL_CHANNELS",
  };
};

export const clearChannelsRelatedStates = () => {
  return {
    type: "CLEAR_CHANNEL_RELATED_STATES",
  };
};

export const clearSelectedCategory = () => {
  return {
    type: "CLEAR_SELECTED_CATEGORY",
  };
};
