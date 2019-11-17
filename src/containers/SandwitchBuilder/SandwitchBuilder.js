import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxlary/Axulary';
import Sandwitch from '../../components/Sandwitch/Sandwitch';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Sandwitch/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import OrderMenu from '../../components/OrderMenu/OrderMenu'
import axiosOrders from '../../axios-orders';
import * as actions from '../../store/actions/index';

const SandwitchBuilder = props => {

  const [purchasing,
    setPurchasing] = useState(false);

  const {onInitIngreadients,onInitBread,orderDataCleanUp } = props;
  useEffect(() => {
    onInitIngreadients();
    onInitBread();
    orderDataCleanUp();
  }, [onInitIngreadients,onInitBread,orderDataCleanUp])

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true)
    } else {
      props.onSetAuthRedirectPath('/checkout');
      props
        .history
        .push('/authentication');
    }
  }

  const updatePurchaseState = (ingredients) => {
    const sum = Object
      .keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  const purchaseCancleHandler = () => {
    setPurchasing(false)
  }

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props
      .history
      .push('/checkout');
  }

  const disabledInfo = {
    ...props.ingredients
  }

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary;

  let sandwitch = props.error
    ? <p>Ingreadiens can't be loaded</p>
    : <Spinner/>

  if (props.ingredients && props.bread) {
    sandwitch = <Aux>
      <Sandwitch ingredients={props.ingredients} bread={props.bread}/>
      <OrderMenu
        ingredientAdded={props.onIngreadientAdded}
        ingredientRemoved={props.onIngreadientRemoved}
        disabled={disabledInfo}
        pruchaseable={updatePurchaseState(props.ingredients)}
        orderd={purchaseHandler}
        price={props.sandwitchPrice}
        isAuthenticated={props.isAuthenticated}
        changedBread={props.onBreadPropertyChanged}
        checkedBread={props.bread}/>
    </Aux>
    orderSummary = <OrderSummary
      ingredients={props.ingredients}
      price={props.sandwitchPrice}
      purchaseCanclled={purchaseCancleHandler}
      purchaseContinued={purchaseContinueHandler}/>
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancleHandler}>
        {orderSummary}
      </Modal>
      {sandwitch}
    </Aux>
  )
}

const mapStateToProps = state => {
  return {
    ingredients: state.sandwitchBuilderReducer.ingredients,
    bread: state.sandwitchBuilderReducer.bread,
    sandwitchPrice: state.sandwitchBuilderReducer.totalPrice,
    error: state.sandwitchBuilderReducer.error,
    isAuthenticated: state.authenticationReducer.idToken !== null
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngreadientAdded: (ingreadientName) => dispatch(actions.addIngreadient(ingreadientName)),
    onIngreadientRemoved: (ingreadientName) => dispatch(actions.removeIngreadient(ingreadientName)),
    onBreadPropertyChanged: (breadPropertyName) => dispatch(actions.changeBreadProperty(breadPropertyName)),
    onInitIngreadients: () => dispatch(actions.initIngreadients()),
    onInitBread: () => dispatch(actions.initBread()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
    orderDataCleanUp: () => dispatch(actions.orderDataCleanUp())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(SandwitchBuilder, axiosOrders));