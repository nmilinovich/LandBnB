import { csrfFetch } from "./csrf";
const LOAD_SPOTS = 'load/spots';
const LOAD_SPOT = 'load/spot';
const CREATE_SPOT = 'create/spot';
const DELETE_SPOT = 'delete/spot';
const UPDATE_SPOT = 'update/spot';

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

export const deleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
});

export const updateSpot = (spot) => ({
    type: UPDATE_SPOT,
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

export const removeSpot = (spotId) => async (dispatch) => {
    const deletedSpot = await csrfFetch(`/api/spots/${spotId}`,
        {
            headers: {
            'Content-Type': 'application/json'
            },
            method: "DELETE",
        }
    );
    await dispatch(deleteSpot(spotId));
    return deletedSpot;
}

export const editSpot = (spot, imageURLs) => async (dispatch) => {
    console.log(spot)
    const resSpot = await csrfFetch(`/api/spots/${spot.id}`,
        {
            headers: {
            'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(spot)
        }
    );
    console.log(resSpot)
    const editedSpot = await resSpot.json();
    const spotImgs = [];
    // for (let i = 0; i < imageURLs.length; i++) {
    //     const imgURL = imageURLs[i];
    //     const newImage = await csrfFetch(`/api/spots/${editedSpot.id}/images`,
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             method: "POST",
    //             body: JSON.stringify({
    //                 url: imgURL,
    //                 preview: i === 0,
    //             })
    //         }
    //     );
    //     spotImgs.push(newImage);
    // }
    // editedSpot.SpotImages = spotImgs;
    dispatch(updateSpot(editedSpot));
    return editedSpot;
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
            newState["page"] = action.payload.page;
            newState["size"] = action.payload.size;
            console.log(newState);
            return newState;
        case LOAD_SPOT:
            newState[action.spot.id] = {...newState[action.spot.id], ...action.spot}
            return newState;
        case CREATE_SPOT:
            newState[action.spot.id] = {...newState[action.spot.id], ...action.spot}
            return newState;
        case UPDATE_SPOT:
            newState[action.spot.id] = {...action.spot}
            return newState;
        case DELETE_SPOT:
            delete newState[action.spotId];
            return newState;
        default:
            return state;
    }
}

export default spotsReducer
