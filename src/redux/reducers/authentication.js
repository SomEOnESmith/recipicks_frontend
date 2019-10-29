import * as actionTypes from "../actions/actionTypes";

const initialState = {
  user: null,
  profile: null,
  profileLoading: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      const user = action.payload;
      return {
        ...state,
        user: user
      };
    case actionTypes.SET_PROFILE:
      const profile = action.payload;
      return {
        ...state,
        profile: profile,
        profileLoading: false
      };
    case actionTypes.RESET_PROFILE:
      return {
        ...state,
        profile: null,
        profileLoading: true
      };
    case actionTypes.EDIT_PROFILE:
      return {
        ...state,
        profile: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
