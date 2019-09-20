import React from 'react';

import classes from './Order.css';

const order = (props) => {
    const ingredients = [];
    const bread = [];

    for(let ingradientName in props.ingredients){
        ingredients.push(
            {
                name: ingradientName,
                amout: props.ingredients[ingradientName]
            }
        );
    }


    for(let breadPropName in props.bread){
        bread.push(
            {
                name: breadPropName,
                value: props.bread[breadPropName]
            }
        );
    }

    const ingradientOutput = ingredients.map(ingradient => {
        return <span
            key = {ingradient.name}>
            {ingradient.name} ({ingradient.amout})</span>;
    })

    const breadOutput = bread.map((breadProp) => {
        if(breadProp.value)
        {
             return <span key = {breadProp.name}>
             {breadProp.name}
         </span>;
        }
    })

    return(
        <div className = {classes.Order}>
        <p>Ingradients: {ingradientOutput}</p>
        <p>Bread: {breadOutput.every(feature => feature === undefined) ? 'standard' : breadOutput} </p>
        <p>Price: <strong>{props.price}</strong></p>
    </div>
    );
};

export default order;