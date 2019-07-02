import React, { Component } from 'react';

import Aux from '../../hoc/Axulary';
import Sandwitch from '../../components/Sandwitch/Sandwitch';
import BuildControls from '../../components/Sandwitch/BuildControls/BuildControls'

class BurgerBuidler extends Component{

    state ={
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        }
    }

    render() {
        return(
            <Aux>
            <Sandwitch ingredients = {this.state.ingredients}/>
            <BuildControls/>
            </Aux>
        )
    }
}

export default BurgerBuidler;