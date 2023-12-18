import { csrfFetch } from "./csrf";
const LOAD_SPOTS = 'load/spots';
const LOAD_SPOT = 'load/spot';
const CREATE_SPOT = 'create/spot';

// action creators
export const loadSpots = (payload) => ({
    type: LOAD_SPOTS,
    payload
});

export const loadSpot = (spot) => ({
    type: LOAD_SPOT,
    spot
});

export const postSpot = (spot) => ({
    type: CREATE_SPOT,
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
};

export const postNewSpot = (spot, imageURLs) => async (dispatch) => {
    const resSpots = await csrfFetch("/api/spots",
        {
            headers: {
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(spot)
        }
    );
    const newSpot = await resSpots.json();
    const spotImgs = [];
    for (let i = 0; i < imageURLs.length; i++) {
        const imgURL = imageURLs[i];
        const newImage = await csrfFetch(`/api/spots/${newSpot.id}/images`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    url: imgURL,
                    preview: i === 0,
                })
            }
        );
        spotImgs.push(newImage);
    }
    newSpot.SpotImages = spotImgs;
    dispatch(postSpot(newSpot));
    return newSpot;
};

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
        case CREATE_SPOT:
            newState[action.spot.id] = {...newState[action.spot.id], ...action.spot}
        default:
            return state;
    }
}

export default spotsReducer
