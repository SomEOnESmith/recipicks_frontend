import { FETCH_CUISINES } from "./actionTypes";

import instance from "./instance";

export const fetchCuisines = () => async dispatch => {
    try {
        const res = await instance.get("cuisines/");
        const cuisines = res.data;
        dispatch({
            type: FETCH_CUISINES,
            payload: cuisines
        });
    } catch (error) {
        console.error(error);
    }
};
