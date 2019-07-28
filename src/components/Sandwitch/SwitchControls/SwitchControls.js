import React from 'react';
import SwitchControl from './SiwtchControl/SwitchControl';
import classes from './SwitchControls.css';

const controls =[

        { label: 'Roll bread', type: 'rollBread'},
        { label: 'Seed', type: 'seed'},
        { label: 'Multigrain bread', type: 'multigrain'},
];


const switchControl = (props) =>(
    <div className = {classes.Controls}>
        <p>Bread menu</p>
        {controls.map((control, i) => (
            <SwitchControl
                key = {control.label}
                label = {control.label}
                checked = {props.checked[i]}
                changed = {() => props.changed(control.type)}
            />
        ))}
    </div>
);

export default switchControl;