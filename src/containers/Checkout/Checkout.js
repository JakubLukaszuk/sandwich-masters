import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { log, isBoolean } from 'util';

class Checkout extends Component {
  state = {
    bread: {
      seed: false,
      rollBread: false,
      multigrain: false
    },
    ingredients: null,
    price: 0
  }

  checkBoolean(value){
    switch(value){
         case true:
         case "true":
             return true;
        case false:
        case "false":
            return true;
         default:
             return false
     }
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    const bread = {};
    let price = 0;
    for (let param of query.entries()) {
      if (this.checkBoolean(param[1]) === true)
          bread[param[0]] =+ JSON.parse(param[1]);
        else
          if (param[0] === 'price')
            price = param[1];
          else
            ingredients[param[0]] =+ param[1];

    this.setState({ingredients: ingredients, bread: bread, totalPrice: price});
  }
}
  checkoutCancelledHandler = () => {
    this
      .props
      .history
      .goBack();
  }

  checkoutContinuedHandler = () => {
    this
      .props
      .history
      .replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          bread={this.state.bread}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}/>
        <Route
          path={this.props.match.path + '/contact-data'}
          render=
          {(props) => (<ContactData ingredients = {this.state.ingredients} bread = {this.state.bread} price = {this.state.totalPrice} {...props} />)}/>
      </div>
    );
  }
}

export default Checkout;