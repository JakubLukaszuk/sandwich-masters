import React from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Auxlary/Axulary';
import Backdrop from '../Backdrop/Backdrop';

const modal = props =>{

    return(
      <Aux>
      <Backdrop show = {props.show} clicked = {props.modalClosed}/>
      <div
        style = {{
        transform: props.show
          ? 'translateY(0)'
          : 'translateY(-100bh)',
        display: props.show
          ? 'block'
          : 'none'
      }}
        className = {classes.Modal}>
        {props.children}
      </div>
    </Aux>
    );
  }

export default React.memo(modal,(pervProps, nextProps)=>
nextProps.show === pervProps.show &&
nextProps.children === pervProps.children);