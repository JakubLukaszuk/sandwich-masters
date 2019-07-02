import React from 'react';
import classes from './Sandwitch.css';
import SandwitchIngredient from './SandwitchIngredient/SandwitchIngredient';

const sandwitch = (props) => {
    let ingreadientsPreperd  = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
           return <SandwitchIngredient key = {igKey + 1} type = {igKey} />
        });
    })
    .reduce((perv, recent)=>{
        return perv.concat(recent)
    }, []);
    if(ingreadientsPreperd.length === 0){
         ingreadientsPreperd = <p>Please start adding ingreadients</p>
    }
    return(
        <div className={classes.Sandwitch}>
            <SandwitchIngredient type='bread-top'/>
            {ingreadientsPreperd}
            <SandwitchIngredient type='bread-bottom'/>
        </div>
    );
}

export default sandwitch;