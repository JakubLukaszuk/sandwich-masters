import React from 'react';
import{ withRouter } from 'react-router-dom';

import classes from './Sandwitch.css';
import SandwitchIngredient from './SandwitchIngredient/SandwitchIngredient';

const sandwitch = (props) => {

    const breadFeatures = Object.keys(props.bread).filter(k => props.bread[k]);

    let ingreadientsPreperd  = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
           return <SandwitchIngredient key = {igKey + i} type = {igKey} />;
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
            <SandwitchIngredient type='bread-top' bread = {breadFeatures}/>
            {ingreadientsPreperd}
            <SandwitchIngredient type='bread-bottom' bread = {breadFeatures}/>
        </div>
    );
}

export default withRouter(sandwitch);
