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

const sessionReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { user: action.payload}
        case LOGOUT_USER:
            return { user: null }
        default:
            return state;
    }
}

export default sessionReducer
