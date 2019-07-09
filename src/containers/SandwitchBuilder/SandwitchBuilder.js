import React, { Component } from 'react';

import Aux from '../../hoc/Axulary';
import Sandwitch from '../../components/Sandwitch/Sandwitch';
import BuildControls from '../../components/Sandwitch/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
    salad: 0.2,
    cheese: 0.4,
    bacon: 0.8,
    meat: 1
}

class BurgerBuidler extends Component{

    state ={
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        toatalPrice: 4
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
    }

    removeIngreedientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
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
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return(
            <Aux>
            <Sandwitch ingredients = {this.state.ingredients}/>
            <BuildControls
                ingredientAdded = {this.addIngreedientHandler}
                ingredientRemoved = {this.removeIngreedientHandler}
                disabled = {disabledInfo}
                price = {this.state.toatalPrice}/>
            </Aux>
        )
    }
}

export default BurgerBuidler;