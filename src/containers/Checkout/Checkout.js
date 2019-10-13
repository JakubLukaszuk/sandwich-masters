import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index';


class Checkout extends Component {


  // checkBoolean(value){
  //   switch(value){
  //        case true:
  //        case "true":
  //            return true;
  //       case false:
  //       case "false":
  //           return true;
  //        default:
  //            return false
  //    }
  // }

  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   const bread = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     if (this.checkBoolean(param[1]) === true)
  //         bread[param[0]] =+ JSON.parse(param[1]);
  //       else
  //         if (param[0] === 'price')
  //           price = param[1];
  //         else
  //           ingredients[param[0]] =+ param[1];

  //   this.setState({ingredients: ingredients, bread: bread, totalPrice: price});
  // }
//}
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
    let summary = <Redirect to="/"/>
    if (this.props.ingredients) {
      const purchsedPredirected = this.props.purchased ? <Redirect to='/'/> : null;
      summary = (
        <div>
        {purchsedPredirected}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            bread={this.props.bread}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
            />
            <Route path={this.props.match.path + '/contact-data'} component={ContactData}
           />
        </div>) }
        return summary;
      }
    }

const mapStateToProps = state => {
  return{
    ingredients: state.sandwitchBuilderReducer.ingredients,
    bread: state.sandwitchBuilderReducer.bread,
    purchased: state.orderRecuder.purchased
  }
}



export default connect(mapStateToProps)(Checkout);