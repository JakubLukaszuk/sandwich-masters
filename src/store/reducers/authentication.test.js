import reducer from './authentication';
import * as actionTypes from '../actions/actionsTypes';

describe('auth reducer', () => {
    it('should return initial state', () =>{
        expect(reducer(undefined, {})).toEqual({
            idToken: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })
})

it('should store token upon login', () => {
    expect(reducer({
        idToken: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: '/'
    },{
        type: actionTypes.AUTH_SUCCESS,
        idToken: 'token',
        userId: 'userId'
    })).toEqual({
        idToken: 'token',
        userId: 'userId',
        error: null,
        loading: false,
        authRedirectPath: '/'
    })
})

it('should store nullificate token', () => {
    expect(reducer({
        idToken: 'token',
        userId: 'id',
        error: null,
        loading: false,
        authRedirectPath: '/'
    },{
        type: actionTypes.AUTH_LOGOUT,
    })).toEqual({
        idToken: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: '/'
    })
})

it('should store nullificate loading and set error', () => {
    expect(reducer({
        idToken: null,
        userId: null,
        error: null,
        loading: true,
        authRedirectPath: '/'
    },{
        type: actionTypes.AUTH_FAIL,
        error: 'error'
    })).toEqual({
        idToken: null,
        userId: null,
        error: 'error',
        loading: false,
        authRedirectPath: '/'
    })
})