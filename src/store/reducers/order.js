import * as actionTypes from '../actions/actionsTypes'

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    error: null,
    orderData: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.PURCHASE_INIT:
                return{
                    ...state,
                    purchased: false,
                    error: null,
                    orderData: null
                }
        case actionTypes.PURCHASE_SANDWITCH_START:
            return{
                ...state,
                loading: true,
                purchased: false,
            }
        case actionTypes.PURCHASE_SANDWITCH_SUCCES:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return{
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true,
                orderData: {...action.order.orderData,
                    email: null}
            };
        case actionTypes.ORDER_DATA_CLEAN_UP:
            return{
                ...state,
                orderData: null
            }
        case actionTypes.PURCHASE_SANDWITCH_FAIL:
            return{
                ...state,
                loading: false,
                purchased: false,
                orderData: null,
                error: `Sorry.
                Something went wrong and order has just been canceled.`
            };
        case actionTypes.FETCH_ORDERS_START:
            return{
                ...state,
                loading: true
            };
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return{
                ...state,
                orders: action.orders,
                loading: false
            }
        case actionTypes.FETCH_ORDERS_FAIL:
            return{
                ...state,
                loading: false,
                error: `Sorry.
                 Something went wrong`
            }
        default:
            return state;
    }
};

export default reducer;