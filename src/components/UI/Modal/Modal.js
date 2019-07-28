import React, {Component} from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Auxlary/Axulary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{

  shouldComponentUpdate(nextProps, nextState){
    return nextProps.show !== this.props.show
    || nextProps.children !== this.props.children;
  }

  componentDidUpdate() {
    console.log('Modal  DidUpdate')
}

  render(){
    return(
      <Aux>
      <Backdrop show = {this.props.show} clicked = {this.props.modalClosed}/>
      <div
        style = {{
        transform: this.props.show
          ? 'translateY(0)'
          : 'translateY(-100bh)',
        display: this.props.show
          ? 'block'
          : 'none'
      }}
        className = {classes.Modal}>
        {this.props.children}
      </div>
    </Aux>
    );
  }
}


export default Modal;
//export default React.memo(modal); for dumb componet