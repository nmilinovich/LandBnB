const LOAD_SPOTS = 'load/spots';


// action creators
export const loadSpots = (payload) => ({
    type: LOAD_SPOTS,
    payload
});


// thunks
export const getSpots = () => async (dispatch) => {
    const res = await fetch("/api/spots");
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      dispatch(loadSpots(data));
      return data;
    }
    return res;
};

//reducer
const spotsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            const spotsState = {};
            action.payload.Spots.forEach((spot) => {
              spotsState[spot.id] = spot;
            });
            spotsState.page = action.payload.page;
            spotsState.size = action.payload.size;
            console.log(spotsState)
            return spotsState
        default:
            return state;
    }
}

export default spotsReducer
