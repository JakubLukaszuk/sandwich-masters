import React from 'react';
import BuildControls from '../Sandwitch/BuildControls/BuildControls'
import SwitchControls from '../Sandwitch/SwitchControls/SwitchControls'
import classes from './OrderMenu.css';

const orderMenu = (props) => {
  return (
    <div className={classes.OrderMenu}>
      <h3>
        Current Price: {props
          .price
          .toFixed(2)}</h3>
      <div className={classes.IngredientsMenu}>
        <BuildControls
          ingredientAdded={props.ingredientAdded}
          ingredientRemoved={props.ingredientRemoved}
          disabled={props.disabled}
          pruchaseable={props.pruchaseable}></BuildControls>
        <SwitchControls changed={props.changedBread} checked={props.checkedBread}/>
      </div>
      <button
        className={classes.OrderButton}
        disabled={!props.pruchaseable}
        onClick={props.orderd}>{props.isAuthenticated ? 'Order now' : 'Sign up to order'}</button>
    </div>
  );
}

export default orderMenu;