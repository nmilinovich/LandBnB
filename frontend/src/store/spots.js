const LOAD_SPOTS = 'load/spots';

export const loadSpots = (payload) => ({
    type: LOAD_SPOTS,
    payload
});
export const getSpots = (payload) => async (dispatch) => {
    const res = await fetch("/api/spots");
    if (res.ok) {
      const data = await res.json();
      console.log(data);
    //   dispatch(loadSpots(data));
      return data;
    }
    return res;
};

const spotReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { user: action.payload }
        case LOGOUT_USER:
            return { user: null }
        default:
            return state;
    }
}

export default spotReducer
