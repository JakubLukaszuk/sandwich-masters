import React, {Component} from 'react';
import {connect} from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component{


    componentDidMount(){
        this.props.onFeatchOrders();
    }

    render() {
        let orders = <Spinner/>;
        if(!this.props.loading){
            orders = this.props.orders.map(order => (
                <Order key = {order.id}
                ingredients = {order.ingredients}
                bread = {order.bread}
                price = {order.price}/>
            ))
        }
        return(
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        orders: state.orderRecuder.orders,
        loading: state.orderRecuder.loading
    }
}

const mapDipatchToProps = dispatch => {
    return {
        onFeatchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDipatchToProps) (withErrorHandler(Orders, axios));