import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const authStart = () => {
  return {type: actionTypes.AUTH_START};
}

export const authSuccess = (idToken, userId) => {
  return {type: actionTypes.AUTH_SUCCESS, idToken: idToken, userId: userId}
}

export const authFail = (error) => {
  let err = error
  if(error.message === 'INVALID_PASSWORD'){
    err.message = 'Wrong Password';
  }
  else if(error.message === 'EMAIL_NOT_FOUND' || error.message === 'INVALID_EMAIL'){
    err.message = 'Wrong Email';
  }
  else if(error.message === 'EMAIL_EXISTS'){
    err.message = 'This email is registed';
  }
  else if(error.message === 'TOO_MANY_ATTEMPTS_TRY_LATER'){
    err.message = 'Servers are overhelmed';
  }
  return {type: actionTypes.AUTH_FAIL, error: err}
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {type: actionTypes.AUTH_LOGOUT}
}

export const auth = (email, password, isSignIn) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSy' +
        'A6CXOpnQ3BtiPjcG4O7ImrVFXw9bvQ0Is';
    if (!isSignIn) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA6CXOpnQ3Bti' +
          'PjcG4O7ImrVFXw9bvQ0Is';
    }
    axios
      .post(url, authData)
      .then(response => {
        const expirationRealDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationRealDate);
        localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      })
  }
}

export const setAuthRedirectPath = (path) => {
  return {type: actionTypes.SET_AUTH_REDIRECT_PATH, path: path}
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
          const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
      }
    }
  }
}

export const authErrorCleanese = () =>{
  return {type: actionTypes.AUTH_ERROR_CLEANESE}
}