import * as actionTypes from '../actions/actionsTypes';

const initialState = {
  idToken: null,
  userId: null,
  error: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      }
    case actionTypes.AUTH_SUCCESS:
      console.log(action.idToken);
      return {
        ...state,
        idToken: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
      }
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        loading: true
      }
    default:
      return state;
  }
};

export default reducer;
