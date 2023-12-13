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

// {Spots: []}
//reducer
const spotsReducer = (state = {}, action) => {
    const newState = {...state}
    switch (action.type) {
        case LOAD_SPOTS:
            // spotsState.spots = []
            action.payload.Spots.forEach((spot) => {
            //   spotsState.spots.push(spot);
            newState[spot.id] = spot
            });
            // spotsState.page = action.payload.page;
            // spotsState.size = action.payload.size;
            console.log(newState);
            return newState;
        case LOAD_SPOT:
            newState[action.spot.id] = {...newState[action.spot.id], ...action.spot}
            return newState;
        default:
            return state;
    }
}

export default spotsReducer
