import React from 'react';

import Separator from '../../components/UI/Separator/Separator'
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

    const ingradientOutput = ingredients.map((ingradient, index) => {
        if(index < Object.keys(ingredients).length-1)
            return <span key = {ingradient.name}>
                {ingradient.name}: {ingradient.amout}, </span>;
            else
                return <span key = {ingradient.name}>
                {ingradient.name}: {ingradient.amout}</span>;
    })

    const breadOutput = bread.map((breadProp, index) => {
        if(breadProp.value)
        {
            if(index < Object.keys(bread).length-1)
                return <span key = {breadProp.name}>
                    {breadProp.name}, </span>;
            else
                return <span key = {breadProp.name}>
                    {breadProp.name} </span>;
        }
    })

    return(
        <div className = {classes.Order}>
        <p> <strong>Ingradients:</strong> {ingradientOutput}</p>
        <p> <strong>Bread:</strong> {breadOutput.every(feature => feature === undefined) ? 'standard' : breadOutput} </p>
        <Separator style={{
            width: '100%'
          }}/>
        <p><strong> Price: {props.price}</strong></p>
    </div>
    );
};

export default order;