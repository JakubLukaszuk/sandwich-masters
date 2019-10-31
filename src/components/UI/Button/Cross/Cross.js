import React from 'react';

import classes from './Cross.css';

const cross = (props) => (
  <div
    disabled = {props.disabled}
    className={classes.Cross}
    style = {props.style}
    onClick={props.clicked}>
</div>
);

export default cross;