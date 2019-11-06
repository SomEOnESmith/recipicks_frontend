import {
  SET_PROFILE,
  EDIT_PROFILE,
  SET_CURRENT_USER,
  SET_ERRORS,
  RESET_PROFILE
} from "./actionTypes";
import jwt_decode from "jwt-decode";
import { setErrors, resetErrors } from "./errors";
import instance from "./instance";

export const profile = () => async dispatch => {
  try {
    const res = await instance.get("profile/");
    const profile = res.data;
    dispatch({ type: SET_PROFILE, payload: profile });
  } catch (error) {
    console.error(error);
  }
};

export const editProfile = (userData, history) => {
  return async dispatch => {
    try {
      let newUserDate = {
        user: {
          username: "",
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email
        },
        phone: userData.phone,
        gender: userData.gender,
        age: userData.age,
        image: userData.image
      };

      const res = await instance.put("profile/", newUserDate);
      dispatch({ type: EDIT_PROFILE, payload: res.data });
      dispatch(resetErrors());
      history.replace("profile/");
    } catch (error) {
      console.error(error);
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data
      });
    }
  };
};

const setCurrentUser = token => {
  return async dispatch => {
    let user;
    if (token) {
      await localStorage.setItem("token", token);
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
      user = jwt_decode(token);
      dispatch(profile());
    } else {
      localStorage.removeItem("token");
      delete instance.defaults.headers.common.Authorization;
      user = null;
    }

    return dispatch({ type: SET_CURRENT_USER, payload: user });
  };
};

export const login = (userData, history) => {
  return async dispatch => {
    try {
      const response = await instance.post("login/", userData);
      const user = response.data;
      dispatch(setCurrentUser(user.access));
      dispatch(resetErrors());
      history.replace("/");
    } catch (error) {
      console.log(error);
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data
      });
    }
  };
};

export const resetProfile = () => ({
  type: RESET_PROFILE
});

export const signup = (userData, history) => {
  return async dispatch => {
    try {
      const res = await instance.post("register/", userData);
      const user = res.data;
      dispatch(setCurrentUser(user.access));
      dispatch(login(userData, history));
      // history.replace("/");
    } catch (error) {
      console.error(error.response.data);
      dispatch(setErrors(error.response.data));
    }
  };
};

export const logout = () => {
  return async dispatch => {
    dispatch(setCurrentUser());
    dispatch(resetProfile());
  };
};

export const checkForExpiredToken = () => {
  // Check for token expiration
  const token = localStorage.getItem("token");
  let user = null;
  if (token) {
    const currentTimeInSeconds = Date.now() / 1000;

    // Decode token and get user info
    user = jwt_decode(token);

    // Check token expiration
    if (user.exp >= currentTimeInSeconds) {
      // Set user
      return setCurrentUser(token);
    }
  }
  return logout();
};
