import React, {Component} from 'react';

import Aux from '../../hoc/Axulary';
import Sandwitch from '../../components/Sandwitch/Sandwitch';
import BuildControls from '../../components/Sandwitch/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Sandwitch/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.2,
  cheese: 0.4,
  bacon: 0.8,
  meat: 1
}

class BurgerBuidler extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    toatalPrice: 4,
    pruchaseable: false,
    purchasing: false
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
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
    this.setState({
      pruchaseable: sum > 0
    })
  }

  addIngreedientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updateIngredinets = {
      ...this.state.ingredients
    };
    updateIngredinets[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.toatalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({toatalPrice: newPrice, ingredients: updateIngredinets})
    this.updatePurchaseState(updateIngredinets);
  }

  removeIngreedientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updateIngredinets = {
      ...this.state.ingredients
    };
    updateIngredinets[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.toatalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({toatalPrice: newPrice, ingredients: updateIngredinets})
    this.updatePurchaseState(updateIngredinets);
  }

  purchaseCancleHandler = () =>{
      this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
      alert('continue');
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal
        show = {this.state.purchasing}
        modalClosed = {this.purchaseCancleHandler}>
          <OrderSummary ingredients={this.state.ingredients}
          price= {this.state.toatalPrice}
          purchaseCanclled = {this.purchaseCancleHandler}
          purchaseContinued = {this.purchaseContinueHandler}/>
        </Modal>
        <Sandwitch ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngreedientHandler}
          ingredientRemoved={this.removeIngreedientHandler}
          disabled={disabledInfo}
          pruchaseable={this.state.pruchaseable}
          orderd={this.purchaseHandler}
          price={this.state.toatalPrice}/>
      </Aux>
    )
  }
}

export default BurgerBuidler;