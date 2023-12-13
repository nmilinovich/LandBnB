import { csrfFetch } from "./csrf";
const LOAD_REVIEWS = 'load/reviews';
const LOAD_REVIEW = 'load/review';

// action creators
export const loadReviews = (payload) => ({
    type: LOAD_REVIEWS,
    payload
});

export const loadReview = (review) => ({
    type: LOAD_REVIEW,
    review
});

// thunks
export const getReviews = () => async (dispatch) => {
    const res = await csrfFetch("/api/spots");
    if (res.ok) {
      const data = await res.json();
      dispatch(loadSpots(data));
      return data;
    }
    return res;
};

export const getSpotDetails = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`);
    if (res.ok) {
        const data = await res.json();
        console.log(data);
        dispatch(loadSpot(data));
        console.log(data);
        return data;
    }
    return res;
}

//reducer
const spotsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            const spotsState = {...state};
            spotsState.spots = []
            action.payload.Spots.forEach((spot) => {
              spotsState.spots.push(spot);
            });
            spotsState.page = action.payload.page;
            spotsState.size = action.payload.size;
            console.log(spotsState);
            return spotsState;
        case LOAD_SPOT:
            const newState = {[action.spot.id]: action.spot }
            console.log(newState)
            return newState
        default:
            return state;
    }
}

export default spotsReducer
