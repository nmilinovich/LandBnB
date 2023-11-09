const LOAD_SPOTS = 'load/spots';

export const loadSpots = (payload) => ({
    type: LOAD_SPOTS,
    payload
});
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

const spotsReducer = (state = {spots: []}, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            return { spots: action.payload }
        default:
            return state;
    }
}

export default spotsReducer
