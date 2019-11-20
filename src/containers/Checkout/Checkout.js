import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = props => {

  const checkoutCancelledHandler = () => {
    props
      .history
      .goBack();
  }

  const checkoutContinuedHandler = () => {
    props
      .history
      .replace('/checkout/contact-data');
  }

    let summary = <Redirect to="/"/>
    if (props.ingredients) {
      const purchsedPredirected = props.purchased
        ? <Redirect to='/'/>
        : null;
      summary = (
        <div>
          {purchsedPredirected}
          <CheckoutSummary
            ingredients={props.ingredients}
            bread={props.bread}
            checkoutCancelled={checkoutCancelledHandler}
            checkoutContinued={checkoutContinuedHandler}/>
          <Route path={props.match.path + '/contact-data'} component={ContactData}/>
        </div>
      )
    }
    return summary;
  }


const mapStateToProps = state => {
  return {ingredients: state.sandwitchBuilderReducer.ingredients, bread: state.sandwitchBuilderReducer.bread, purchased: state.orderRecuder.purchased}
}

export default connect(mapStateToProps)(Checkout);