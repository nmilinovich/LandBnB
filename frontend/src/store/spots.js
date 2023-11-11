import { csrfFetch } from "./csrf";
const LOAD_SPOTS = 'load/spots';
const LOAD_SPOT = 'load/spot';

// action creators
export const loadSpots = (payload) => ({
    type: LOAD_SPOTS,
    payload
});

export const loadSpot = (spot) => ({
    type: LOAD_SPOT,
    spot
});

// thunks
export const getSpots = () => async (dispatch) => {
    const res = await csrfFetch("/api/spots");
    if (res.ok) {
      const data = await res.json();

      dispatch(loadSpots(data));
      console.log(data);
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
            action.payload.Spots.forEach((spot) => {
              spotsState[spot.id] = spot;
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
