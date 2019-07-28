import React, {Component} from 'react';

import Aux from '../../hoc/Auxlary/Axulary';
import Sandwitch from '../../components/Sandwitch/Sandwitch';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Sandwitch/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import OrderMenu from '../../components/OrderMenu/OrderMenu'

import axiosOrders from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.2,
  cheese: 0.4,
  bacon: 0.8,
  meat: 1,
  onion: 0.1,
  tomato: 0.2,
  seed: 0.1,
  multigrain: 0.1,
  rollBread: 0.1,
  ham: 0.2
}

class SandwitchBuilder extends Component {

  state = {
    // bread: {
    //   seed: false,
    //   rollBread: false,
    //   multigrain: false,
    // },
    // ingredients: {
    //   salad: 0,
    //   bacon: 0,
    //   cheese: 0,
    //   meat: 0,
    //   onion: 0,
    //   tomato: 0,
    //   ham: 0,
    // },
    bread: null,
    ingredients: null,
    toatalPrice: 4,
    pruchaseable: false,
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    axiosOrders
      .get('/ingredients.json')
      .then(response => {
        this.setState({ingredients: response.data})
      })
      .catch(error => {this.setState({error: true})})

      axiosOrders.get('/bread.json')
      .then(response => {
        this.setState({bread: response.data})
      })
      .catch(error => {this.setState({error: true})})
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

  changeBreadHandler = (type) => {
    const oldBreadProperty = this.state.bread[type];
    const updatedBreadProperty = !oldBreadProperty;
    const updateBreadProperties = {
      ...this.state.bread
    };
    updateBreadProperties[type] = updatedBreadProperty;
    // if(this.state.bread[type] !== this.state.bread.)
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.toatalPrice;
    const newPrice = updatedBreadProperty
      ? oldPrice + priceDeduction
      : oldPrice - priceDeduction;
    //console.log(priceDeduction+' + '+oldPrice+' = '+newPrice);
    this.setState({toatalPrice: newPrice, bread: updateBreadProperties});
    //console.log(this.state);
  }

  purchaseCancleHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.setState({loading: true});

    const order = {
      ingredients: this.state.ingredients,
      bread: this.state.bread,
      price: this.state.toatalPrice,
      //price should be calcualted on server
      customer: {
        name: 'Bartek Lub',
        addres: {
          street: 'TestStreet 1',
          city: 'Warsaw',
          postCode: '12-123'
        },
        email: 'test@wp.pl',
        phoneNumber: 123123123
      }
      //alert('continue');
    }
    axiosOrders
      .post('/orders.json', order)
      .then(response => {
        this.setState({loading: false, purchasing: false})
      })
      .catch(error => {
        console.log(error)
        this.setState({loading: false, purchasing: false})
      });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary;

    let sandwitch = this.state.error ? <p>Ingreadiens can't be loaded</p> : <Spinner/>

    if(this.state.ingredients && this.state.bread)
    {
      sandwitch = <Aux>
      <Sandwitch ingredients={this.state.ingredients} bread={this.state.bread}/>
      <OrderMenu
        ingredientAdded={this.addIngreedientHandler}
        ingredientRemoved={this.removeIngreedientHandler}
        disabled={disabledInfo}
        pruchaseable={this.state.pruchaseable}
        orderd={this.purchaseHandler}
        price={this.state.toatalPrice}
        changedBread={this.changeBreadHandler}
        checkedBread={this.state.bread}/>
    </Aux>
      orderSummary = <OrderSummary
      ingredients={this.state.ingredients}
      price={this.state.toatalPrice}
      purchaseCanclled={this.purchaseCancleHandler}
      purchaseContinued={this.purchaseContinueHandler}/>
    }

    if (this.state.loading) {
      orderSummary = <Spinner/>
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

export default withErrorHandler(SandwitchBuilder, axiosOrders);