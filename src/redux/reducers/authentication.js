import * as actionTypes from "../actions/actionTypes";

const initialState = {
  user: null,
};

const reducer = (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.SET_CURRENT_USER:
      const user = action.payload;
      return {
        ...state,
        user: user
      };

    default:
      return state;
  }
};

export default reducer;
