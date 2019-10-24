import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const authStart = () =>{
    return{
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (idToken, userId) => {
    console.log(idToken);
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    }
}

export const authFail = (error) =>{
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime*1000);
    };
};

export const logout = () => {
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (email, password, isSignIn) => {
    return dispatch => {
        dispatch(authStart());
        const authData= {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA6CXOpnQ3BtiPjcG4O7ImrVFXw9bvQ0Is';
        if(!isSignIn){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA6CXOpnQ3BtiPjcG4O7ImrVFXw9bvQ0Is';
        }
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(error => {
            dispatch(authFail(error.response.data.error));
        })
    }
}