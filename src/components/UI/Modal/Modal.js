import React from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Axulary';
import Backdrop from '../Backdrop/Backdrop';
const modal = (props) => (
  <Aux>
    <Backdrop show = {props.show} clicked = {props.modalClosed}/>
    <div
      style = {{
      transform: props.show
        ? 'translateY(0)'
        : 'translateY(-100bh)',
      opacity: props.show
        ? '1'
        : '0'
    }}
      className = {classes.Modal}>
      {props.children}
    </div>
  </Aux>

);

export default modal;