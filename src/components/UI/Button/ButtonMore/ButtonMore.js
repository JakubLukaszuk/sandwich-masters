import React from 'react';

import classes from './ButtonMore.css';

const button = (props) => (

  <button className={classes.LearnMore} onClick={props.clicked}>
    <div className={classes.Circle}>
      <span className={[classes.Arrow, classes.Icon].join(' ')}></span>
    </div>
    <p className={classes.ButtonText}>{props.children}
    </p>
  </button>
);

export default button;