import React from 'react';
import Aux from '../../../hoc/Auxlary/Axulary';

import classes from './Separator.css';

const separator = (props) => {
  return (
    <Aux>
        <hr style = {props.style}
        className={classes.Separator}/>
    </Aux>
  );
}

export default separator;