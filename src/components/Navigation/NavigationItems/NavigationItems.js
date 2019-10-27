import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className = {classes.NavigationItems}>
        <NavigationItem link = '/' exact>Home</NavigationItem>
        <NavigationItem link = '/sandwitch-builder' exact>Sandwitch Builder</NavigationItem>
        {props.isAuthenticated ?
            <NavigationItem link = '/orders'>Orders</NavigationItem> :
            null }
        {!props.isAuthenticated ?
            <NavigationItem link ='/authentication'>Authentication</NavigationItem> :
            <NavigationItem link ='/logout'>Logout</NavigationItem> }
    </ul>
);

export default navigationItems;