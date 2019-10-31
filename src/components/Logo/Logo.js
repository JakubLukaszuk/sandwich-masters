import React from 'react';

import burgerLogo from '../../assets/images/sandwitchMastersLogo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className = {classes.Logo}>
        <img src = {burgerLogo} alt ='LOGO'/>
    </div>
);

export default logo;