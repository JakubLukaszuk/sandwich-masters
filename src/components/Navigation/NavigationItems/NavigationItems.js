import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className = {classes.NavigationItems}>
        <NavigationItem link = '/' exact><b>Home</b></NavigationItem>
        <NavigationItem link = '/sandwitch-builder' exact><b>Sandwitch Builder</b></NavigationItem>
        {props.isAuthenticated ?
            <NavigationItem link = '/orders'><b>Orders</b></NavigationItem> :
            null }
        {!props.isAuthenticated ?
            <NavigationItem link ='/authentication'><b>Authentication</b></NavigationItem> :
            <NavigationItem link ='/logout'><b>Logout</b></NavigationItem> }
    </ul>
);

export default navigationItems;