import { csrfFetch } from "./csrf";
const LOAD_SPOT_REVIEWS = 'load/reviews';
const LOAD_USER_REVIEWs = 'load/reviews';
const CREATE_REVIEW = 'create/review';
const DELETE_REVIEW = 'delete/review';
// // action creators
export const loadSpotReviews = (reviews) => ({
    type: LOAD_SPOT_REVIEWS,
    reviews
});

export const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
});

// export const loadUserReviews = (user) => ({
//     type: LOAD_USER_REVIEWS,
//     userReviews
// });

export const postReview = (review) => ({
    type: CREATE_REVIEW,
    review
});

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

export const postNewReview = (review, stars, userId, spotId) => async (dispatch) => {
    const resReview = await csrfFetch(`/api/spots/${spotId}/reviews`,
        {
            headers: {
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                review,
                stars
            })
        }
    );
    const newReview = await resReview.json();
    console.log(newReview);
    dispatch(postReview(newReview));
    dispatch(getSpotReviews(spotId));
    return newReview;
};

export const removeReview = (reviewId) => async (dispatch) => {
    const deletedSpot = await csrfFetch(`/api/reviews/${reviewId}`,
        {
            headers: {
            'Content-Type': 'application/json'
            },
            method: "DELETE",
        }
    );
    await dispatch(deleteReview(reviewId));
    return deletedSpot;
}

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
            action.reviews?.Reviews.forEach((review) => {
            console.log(review)
            newState[review.id] = review
            });
            console.log(newState);
            return newState;
        // case LOAD_USER_REVIEWS:
        //     newState[action.spot.id] = {...newState[action.spot.id], ...action.spot}
        //     return newState;
        case CREATE_REVIEW:
            newState[action.review.id] = {...action.review}
            return newState;
        case DELETE_REVIEW:
            delete newState[action.reviewId];
            return newState;
        default:
            return state;
    }
}

export default reviewsReducer;
