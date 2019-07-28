import React from 'react';
import BuildControls from '../Sandwitch/BuildControls/BuildControls'
import SwitchControls from '../Sandwitch/SwitchControls/SwitchControls'
import classes from './OrderMenu.css';

const orderMenu = (props) => {
  return (
    <div className={classes.OrderMenu}>
    <p> Current Price: {props.price.toFixed(2)}</p>
      <div className={classes.IngredientsMenu}>
        <BuildControls
          ingredientAdded={props.ingredientAdded}
          ingredientRemoved={props.ingredientRemoved}
          disabled={props.disabled}
          pruchaseable={props.pruchaseable}>
          </BuildControls>
        <SwitchControls changed={props.changedBread} checked={props.checkedBread}/>
      </div>
      <button
        className={classes.OrderButton}
        disabled={!props.pruchaseable}
        onClick={props.orderd}>Order now</button>
    </div>
  );
}

export default orderMenu;