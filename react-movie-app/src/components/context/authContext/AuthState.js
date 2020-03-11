import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import {
    SUCCESS_REGISTER,
    SUCCESS_LOGIN,
    FAIL_REGISTER,
    FAIL_LOGIN,
    SET_ERROR,
    CLEAR_ERROR
} from '../types';

const AuthState = (props) => {
    const initialState = {
        userAuth: null,
        errors: null,
        userRegistered: null
    }
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //register user
    const registerUser = async userData => {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/register', userData, config);
            console.log("res.data "+JSON.stringify(res.data));
            dispatch({
                type: SUCCESS_REGISTER,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: FAIL_REGISTER,
                payload: err.response.data
            })
        }
    }

    //login user
    const loginUser = async userData => {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/auth', userData, config)
            console.log("response from server after logged in =" +JSON.stringify(res));
            // console.log("response from server after logged in =" +(res));
            dispatch({
                type: SUCCESS_LOGIN,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: FAIL_LOGIN,
                payload: err.response.data
            })
        }
    }

    const setError = err => {
        dispatch({
            type: SET_ERROR,
            payload: err
        })
    }

    const clearError = () => {
        dispatch({
            type: CLEAR_ERROR
        })
    }

    return (
        <AuthContext.Provider value={{
            userAuth: state.userAuth,
            errors: state.errors,
            userRegistered: state.userRegistered,
            registerUser,
            loginUser,
            setError,
            clearError
        }}>{props.children}</AuthContext.Provider>
    )
}

export default AuthState