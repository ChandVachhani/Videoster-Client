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
      window.alert(err.response.data.message);
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
      console.log(res.message);
      dispatch({
        type: "REGISTER",
      });
      history.push("/");
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };
};

export const forgotPassword = (values) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/auth/forgotPassword", values, {
        headers: {
          Authorization: `Basic ${localStorage.getItem("VideosterToken")}`,
        },
      });
      history.push("/");
      window.alert(res.data.message);
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };
};

export const changePassword = (values) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/auth/changePassword", values, {
        headers: {
          Authorization: `Basic ${localStorage.getItem("VideosterToken")}`,
        },
      });
      history.push("/");
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };
};

export const varifyEmail = (values) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/auth/varifyEmail", values, {
        headers: {
          Authorization: `Basic ${localStorage.getItem("VideosterToken")}`,
        },
      });
      history.push("/");
    } catch (err) {
      window.alert(err.response.data.message);
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
      return true;
    } catch (err) {
      window.alert(err.response.data.message);
      return false;
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

export const addChannels = (channels, redirect = true) => {
  return async (dispatch, getStatus) => {
    try {
      let requiredChannels = [];

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

        let videoIds = (
          await server.get(`/YT/channels/${channel.channelId}/videos`, {
            headers: {
              Authorization: `Basic ${localStorage.getItem("VideosterToken")}`,
            },
          })
        ).data.videoIds;
        let videos = [];
        for (let j in videoIds) {
          let videoId = videoIds[j];
          let video = (
            await server.get(`/YT/videos/${videoId}`, {
              headers: {
                Authorization: `Basic ${localStorage.getItem(
                  "VideosterToken"
                )}`,
              },
            })
          ).data.video;
          videos.push({
            videoId: video.id,
            description: video.snippet.description,
            avatarDefault: video.snippet.thumbnails.default.url,
            avatarHigh: video.snippet.thumbnails.high.url,
            avatarMedium: video.snippet.thumbnails.medium.url,
            title: video.snippet.title,
            views: video.statistics.viewCount,
            publishedAt: video.snippet.publishedAt,
          });
        }
        for (let j in videos) {
          console.log(videos[j].title);
          videos[j].fk_channelId = channel.channelId;
          videos[j].channelName = channel.name;
          videos[j].channelAvatarDefault = channel.avatarDefault;
        }

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

        videos = videos.slice(0, getStatus().videoPagination[0] + 1);
        requiredChannels.push(...videos);
      }

      const arr = [getStatus().channels].map((st) => {
        return st.channelId;
      });

      channels = channels.filter((channel) => {
        return !arr.includes(channel.channelId);
      });

      requiredChannels = requiredChannels.filter((video) => {
        return !arr.includes(video.fk_channelId);
      });

      dispatch({
        type: "ADD_CHANNELS",
        payload: channels,
      });

      dispatch({
        type: "ADD_VIDEOS",
        payload: requiredChannels,
      });
      if (redirect) {
        history.push("/Dashboard");
      }
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
      if (category == "GENERAL") {
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

export const getVideos = () => {
  return async (dispatch, getStatus) => {
    try {
      let channelIds = getStatus().channels.map((channel) => channel.channelId);

      let data = [];
      for (let i in channelIds) {
        const channelId = channelIds[i];
        let resultVideos = await server.get(
          `/channels/${channelId}/videos/${getStatus().videoPagination[0]}/${
            getStatus().videoPagination[1]
          }`,
          {
            headers: {
              Authorization: `Basic ${localStorage.getItem("VideosterToken")}`,
            },
          }
        );
        data.push(...resultVideos.data.videos);
      }
      dispatch({
        type: "GET_VIDEOS",
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

export const getTokens = () => {
  return async (dispatch, getStatus) => {
    try {
      const data = (
        await server.get(`/users/${getStatus().user.userId}/token`, {
          headers: {
            Authorization: `Basic ${localStorage.getItem("VideosterToken")}`,
          },
        })
      ).data.tokens;

      dispatch({
        type: "GET_TOKENS",
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getTokenData = (token) => {
  return async (dispatch) => {
    try {
      const data = (
        await server.get(`/tokens/${token}`, {
          headers: {
            Authorization: `Basic ${localStorage.getItem("VideosterToken")}`,
          },
        })
      ).data.tokenData;

      dispatch({
        type: "GET_TOKEN_DATA",
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const renameCategory = (newCategory) => {
  return async (dispatch, getStatus) => {
    try {
      const category = getStatus().selectedCategory;
      await server.patch(
        `/categories/${category}/rename`,
        { category: newCategory },
        {
          headers: {
            Authorization: `Basic ${localStorage.getItem("VideosterToken")}`,
          },
        }
      );
      dispatch({
        type: "RENAME_CATEGORY",
        payload: {
          category,
          newCategory,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const channelPagination = (offset) => {
  return {
    type: "CHANNEL_PAGINATION",
    payload: offset,
  };
};

export const videoPagination = (offset) => {
  return {
    type: "VIDEO_PAGINATION",
    payload: offset,
  };
};

export const clearTokens = () => {
  return {
    type: "CLEAR_TOKENS",
  };
};

export const clearTokenData = () => {
  return {
    type: "CLEAR_TOKEN_DATA",
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

// export const clearAllVideos = (action) => {
//   return {
//     type: "CLEAR_ALL_",
//   };
// };

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
