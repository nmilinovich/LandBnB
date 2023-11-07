import { csrfFetch } from "./csrf";

export const LOGIN_USER = 'user/login';
export const LOGOUT_USER = 'user/logout'

export const loginUser = (payload) => ({
    type: LOGIN_USER,
    payload
});
export const logoutUser = () => ({
    type: LOGOUT_USER,
    payload: {}
})

export const login = (payload) => async (dispatch) => {
    const { credential, password } = payload;
    const res = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({
            credential,
            password
        }),
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(loginUser(data.user));
      return data;
    }
    return res;
};

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(loginUser(data.user));
    return response;
};

export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password,
      }),
    });
    const data = await response.json();
    dispatch(loginUser(data.user));
    return response;
};


const sessionReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { user: action.payload }
        case LOGOUT_USER:
            return { user: null }
        default:
            return state;
    }
}

export default sessionReducer
