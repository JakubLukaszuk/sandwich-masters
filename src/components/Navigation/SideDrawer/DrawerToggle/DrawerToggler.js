import React from 'react';
import classes from './DrawerToggler.css';

const hamburgerButton = (props) =>
(
  <div className={classes.HaburgerButton} onClick={props.click}>
    <div className = {classes.bar}/>
    <div className = {classes.bar}/>
    <div className = {classes.bar}/>
  </div>
);

export default hamburgerButton;