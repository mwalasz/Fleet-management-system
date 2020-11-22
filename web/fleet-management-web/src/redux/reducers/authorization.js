import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,
    VERIFY_USER,
    VERIFY_SUCCESS,
    VERIFY_ERROR,
} from '../actions/authorization_actions';

const initialState = {
    isLoggingIn: false,
    isLoggingOut: false,
    isVerifying: false,
    loginError: false,
    logoutError: false,
    isAuthenticated: false,
    user: {},
};

const authorizationReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoggingIn: true,
                loginError: false,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: true,
                user: action.user,
            };
        case LOGIN_ERROR:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: false,
                loginError: true,
            };
        case LOGOUT_REQUEST:
            return {
                ...state,
                isLoggingOut: true,
                logoutError: false,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggingOut: false,
                isAuthenticated: false,
                user: {},
            };
        case LOGOUT_ERROR:
            return {
                ...state,
                isLoggingOut: false,
                logoutError: true,
            };
        case VERIFY_USER:
            return {
                ...state,
                isVerifying: true,
            };
        case VERIFY_SUCCESS:
            return {
                ...state,
                isVerifying: false,
                isAuthenticated: true,
                user: action.user,
            };
        case VERIFY_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                isVerifying: false,
            };

        default:
            return state;
    }
};

export default authorizationReducer;
