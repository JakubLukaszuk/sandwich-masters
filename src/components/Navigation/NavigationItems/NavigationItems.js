import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className = {classes.NavigationItems}>
        <NavigationItem link = '/' exact>Home</NavigationItem>
        <NavigationItem link = '/sandwitch-builder' exact>Sandwitch Builder</NavigationItem>
        <NavigationItem link = '/orders'>Orders</NavigationItem>
        <NavigationItem link ='/authentication'>Authentication</NavigationItem>
    </ul>
);

export default navigationItems;