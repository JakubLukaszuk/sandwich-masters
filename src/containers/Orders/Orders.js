import React, {Component} from 'react';
import {connect} from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Separator from '../../components/UI/Separator/Separator';
import classes from './Orders.css';

class Orders extends Component{


    componentDidMount(){
        this.props.onFeatchOrders(this.props.token,this.props.userId);
    }

    render() {
        let orders = <Spinner/>;
        if(!this.props.loading){
            console.log(this.props.orders);
            orders = this.props.orders.map(order => (
                <Order key = {order.id}
                ingredients = {order.ingredients}
                bread = {order.bread}
                price = {order.price}/>
            ))
        }
        return(
            <div className = {classes.Orders}>
                <h3 className = {classes.OrdersHead}>Your orders</h3>
                <Separator/>
                {orders ? orders : <p>You haven't ordered anything yet.</p>}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        token: state.authenticationReducer.idToken,
        orders: state.orderRecuder.orders,
        loading: state.orderRecuder.loading,
        userId: state.authenticationReducer.userId
    }
}

const mapDipatchToProps = dispatch => {
    return {
        onFeatchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDipatchToProps) (withErrorHandler(Orders, axios));