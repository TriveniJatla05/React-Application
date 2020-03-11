import {
    SUCCESS_REGISTER,
    SUCCESS_LOGIN,
    FAIL_REGISTER,
    FAIL_LOGIN,
    SET_ERROR,
    CLEAR_ERROR
} from '../types';

//reducer function
export default (state, action) => {
    switch (action.type) {
        case SUCCESS_LOGIN:
            console.log("Setting to local storage and making auth to true");
            //localStorage.setItem('token', action.payload.token)
            console.log(JSON.stringify(action.payload.user));
            localStorage.setItem('user',JSON.stringify(action.payload.user));
            return {
                ...state,
                userAuth: true,
                errors: null
            }
        case SUCCESS_REGISTER:
            console.log("state : " + JSON.stringify(state));
            return {
                ...state,
                userRegistered:true,
                errors: null
            }
        case FAIL_LOGIN:
        case FAIL_REGISTER:
            return {
                ...state,
                userAuth: null,
                errors: action.payload
            }
        case SET_ERROR:
            return {
                ...state,
                errors: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                errors: null
            }
        default:
            return state
    }
}