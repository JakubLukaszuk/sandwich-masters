import React from 'react';

import Aux from '../../../hoc/Axulary';
import Button from '../../UI/Button/Button';
const orderSummary = (porps) =>{
    const ingredientSummary = Object.keys(porps.ingredients)
    .map(ingKey => {
        return(
            <li key = {ingKey}><span>
                {ingKey}: {porps.ingredients[ingKey]}
            </span></li>
    )});
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>Your sandwitch ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {porps.price}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType = "Danger" clicked = {porps.purchaseCanclled}>Cancle</Button>
            <Button btnType = "Success" clicked = {porps.purchaseContinued}>Continue</Button>
        </Aux>
    )
};

export default orderSummary;