import * as actionTypes from "./actionTypes";
import jwt_decode from "jwt-decode";
import { setErrors, resetErrors } from "./errors";
import instance from "./instance";


const setCurrentUser = token => {
    return async dispatch => {
        let user;
        if (token) {
            await localStorage.setItem("token", token);
            instance.defaults.headers.common.Authorization = `Bearer ${token}`;
            user = jwt_decode(token);
        } else {
            localStorage.removeItem("token");
            delete instance.defaults.headers.common.Authorization;
            user = null;
        }

        return dispatch({ type: actionTypes.SET_CURRENT_USER, payload: user });
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
                type: actionTypes.SET_ERRORS,
                payload: error.response.data
            });
        }
    };
};

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
