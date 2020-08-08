import React, {useRef} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = props => {

  const scrollRef = useRef(null);

  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" })
  }

  const checkoutCancelledHandler = () => {
    props
      .history
      .goBack();
  }

  const checkoutContinuedHandler = () => {
    props
      .history
      .replace('/checkout/contact-data');
      setTimeout(()=> {
        scrollToBottom();
      }, 100)
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
            checkoutContinued={checkoutContinuedHandler}
            />
          <Route path={props.match.path + '/contact-data'} component={ContactData}/>
          <div ref={scrollRef}/>
        </div>
      )
    }
    return summary;
  }


const mapStateToProps = state => {
  return {ingredients: state.sandwitchBuilderReducer.ingredients, bread: state.sandwitchBuilderReducer.bread, purchased: state.orderRecuder.purchased}
}

export default connect(mapStateToProps)(Checkout);