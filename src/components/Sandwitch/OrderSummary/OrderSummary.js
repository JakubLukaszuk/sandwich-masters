import React from 'react';

import Aux from '../../../hoc/Auxlary/Axulary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

        const ingredientSummary = Object.keys(props.ingredients)
        .map(ingKey => {
            return(
                <li key = {ingKey}><span>
                    {ingKey}: {props.ingredients[ingKey]}
                </span></li>
        )});
        return(
            <Aux>
                <h3>Your Order</h3>
                <p>Your sandwitch ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType = "Danger" clicked = {props.purchaseCanclled}>Cancle</Button>
                <Button btnType = "Success" clicked = {props.purchaseContinued}>Continue</Button>
            </Aux>
        )

    }


export default orderSummary;