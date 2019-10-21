import * as actionTypes from './actionsTypes';
import axiosOrders from '../../axios-orders';

export const purchaseSandwitchSuccess = (id, order) =>{
    return{
        type: actionTypes.PURCHASE_SANDWITCH_SUCCES,
        orderId: id,
        order: order
    }
}

export const purchaseSandwitchFail = (error) => {
    return{
        type: actionTypes.PURCHASE_SANDWITCH_FAIL,
        error: error
    }
}

export const purchaseSandwitchStart = () => {
    return{
        type: actionTypes.PURCHASE_SANDWITCH_START
    }
}

export const purchaseSandwitch = (order) => {
    return dispatch => {
        dispatch(purchaseSandwitchStart());
        axiosOrders
        .post('/orders.json', order)
        .then(response => {
            dispatch(purchaseSandwitchSuccess(response.data, order));
        //   this.setState({loading: false});
        //   this.props.history.push('/');
        })
        .catch(error => {
          dispatch(purchaseSandwitchFail(error))
        });
    };
}

export const purchaseInit = () => {
    return{
        type: actionTypes.PURCHASE_INIT
    };
}

export const fetchOrdersSucces = (orders) => {
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) =>{
    return{
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () =>{
    return{
        type: actionTypes.FETCH_ORDERS_START,
    }
}

export const fetchOrders = () =>{
    return dispatch => {
        axiosOrders.get('/orders.json')
        .then(response => {
            const fetchedOrders = [];
            for(let key in response.data){
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                });
            }
            dispatch(fetchOrdersSucces(fetchedOrders))
        })
        .catch(error =>{
            dispatch(fetchOrdersFail(error));
        });
    }
}