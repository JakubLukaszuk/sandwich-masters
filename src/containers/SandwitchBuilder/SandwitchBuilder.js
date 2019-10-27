import React, {Component} from 'react';
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


class SandwitchBuilder extends Component {

  state = {
    purchasing: false,
    // loading: false,
    // error: false
  }

  componentDidMount() {
    this.props.onInitIngreadients();
    this.props.onInitBread();
  }


  purchaseHandler = () => {
    if(this.props.isAuthenticated){
      this.setState({purchasing: true})
    }else{
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/authentication');
    }
  }

  updatePurchaseState(ingredients) {
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


  purchaseCancleHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary;

    let sandwitch = this.props.error
      ? <p>Ingreadiens can't be loaded</p>
      : <Spinner/>

    if (this.props.ingredients && this.props.bread) {
      sandwitch = <Aux>
        <Sandwitch ingredients={this.props.ingredients} bread={this.props.bread}/>
        <OrderMenu
          ingredientAdded={this.props.onIngreadientAdded}
          ingredientRemoved={this.props.onIngreadientRemoved}
          disabled={disabledInfo}
          pruchaseable={this.updatePurchaseState(this.props.ingredients)}
          orderd={this.purchaseHandler}
          price={this.props.sandwitchPrice}
          isAuthenticated = {this.props.isAuthenticated}
          changedBread={this.props.onBreadPropertyChanged}
          checkedBread={this.props.bread}/>
      </Aux>
      orderSummary = <OrderSummary
        ingredients={this.props.ingredients}
        price={this.props.sandwitchPrice}
        purchaseCanclled={this.purchaseCancleHandler}
        purchaseContinued={this.purchaseContinueHandler}/>
    }



    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancleHandler}>
          {orderSummary}
        </Modal>
        {sandwitch}
      </Aux>
    )
  }
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
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(SandwitchBuilder, axiosOrders));