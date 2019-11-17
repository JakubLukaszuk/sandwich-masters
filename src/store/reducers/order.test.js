import reducer from './order';
import * as actionTypes from '../actions/actionsTypes';

describe('order reducer', () => {
    it('should return initial state', () =>{
        expect(reducer(undefined, {})).toEqual({
            orders: [],
            loading: false,
            purchased: false,
            error: null,
            orderData: null
        })
    })
})