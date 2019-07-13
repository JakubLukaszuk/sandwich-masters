import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (proops) => (
    <div className = {classes.Logo}>
        <img src = {burgerLogo} alt ='LOGO'/>
    </div>
);

export default logo;