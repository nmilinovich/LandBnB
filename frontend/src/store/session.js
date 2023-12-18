import { csrfFetch } from "./csrf";

export const LOGIN_USER = 'user/login';
export const LOGOUT_USER = 'user/logout';
export const GET_USER_SPOTS = 'user/spots';

export const loginUser = (payload) => ({
    type: LOGIN_USER,
    payload
});

export const logoutUser = () => ({
    type: LOGOUT_USER,
});

export const getUserSpots = (spots) => ({
    type: GET_USER_SPOTS,
    spots
});

export const login = (payload) => async (dispatch) => {
    const { credential, password } = payload;
    const user = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({
            credential,
            password
        }),
    });
    if (user.ok) {
      const data = await user.json();
      dispatch(loginUser(data.user));
      return data;
    };
    return user;
};

export const restoreUser = () => async (dispatch) => {
    const res = await csrfFetch("/api/session");
    const data = await res.json();
    dispatch(loginUser(data.user));
    const resSpots = await csrfFetch("/api/spots/current");
    const userSpots = await resSpots.json();
    dispatch(getUserSpots(userSpots));
    return res;
};

export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const res = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password,
      }),
    });
    const data = await res.json();
    dispatch(loginUser(data.user));
    return res;
};

export const logout = () => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(logoutUser());
    return res;
};


const sessionReducer = (state = { user: null }, action) => {
    console.log(action)
    switch (action.type) {
        case LOGIN_USER:
            return { user: action.payload }
        case LOGOUT_USER:
            return { user: null }
        case GET_USER_SPOTS:
            return {
                ...state,
                spots: action.spots,
            }
        default:
            return state;
    }
}

export default sessionReducer
