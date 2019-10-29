import * as actionTypes from "./actionTypes";

export const setErrors = errors => ({
  type: actionTypes.SET_ERRORS,
  payload: errors
});

export const resetErrors = () => {
  return {
    type: actionTypes.SET_ERRORS,
    payload: []
  };
};
