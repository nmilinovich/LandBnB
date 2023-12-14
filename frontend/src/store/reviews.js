import { csrfFetch } from "./csrf";
const LOAD_SPOT_REVIEWS = 'load/reviews';
const LOAD_USER_REVIEWs = 'load/reviews';

// // action creators
export const loadSpotReviews = (spotReviews) => ({
    type: LOAD_SPOT_REVIEWS,
    spotReviews
});

// export const loadUserReviews = (user) => ({
//     type: LOAD_USER_REVIEWS,
//     userReviews
// });

// // thunks
export const getSpotReviews = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (res.ok) {
      const data = await res.json();
      dispatch(loadSpotReviews(data));
      return data;
    }
    return res;
};

// export const getUserReviews = (spotId) => async (dispatch) => {
//     const res = await csrfFetch('/api/spots/current');
//     if (res.ok) {
//         const data = await res.json();
//         console.log(data);
//         dispatch(loadSpot(data));
//         console.log(data);
//         return data;
//     }
//     return res;
// }

// //reducer
const reviewsReducer = (state = {}, action) => {
    const newState = {...state}
    switch (action.type) {
        case LOAD_SPOT_REVIEWS:
            action.spotReviews.Reviews.forEach((review) => {
            newState[review.id] = review
            });
            console.log(newState);
            return newState;
        // case LOAD_USER_REVIEWS:
        //     newState[action.spot.id] = {...newState[action.spot.id], ...action.spot}
        //     return newState;
        default:
            return state;
    }
}

export default reviewsReducer;
