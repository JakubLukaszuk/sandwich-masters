import React  from 'react';

import classes from './SandwitchIngredient.css';

const SandwitchIngredient  = props =>
{
        let ingredient = null;
        let breadClasses = [];
        let seeds = [];

        if(props.bread){
            props.bread.forEach(element => {
                if(element === 'multigrain'){
                    breadClasses = [...breadClasses, classes.Multigrain]
                }
                if(element === 'seed'){
                    //breadClasses = [...breadClasses, classes.Multigrain]
                    seeds.push(<div className = {classes.Seeds1} key = {classes.Seeds1}></div>)
                    seeds.push(<div className = {classes.Seeds2}  key ={classes.Seeds2}></div>)
                }
                else if(element ==='rollBread'){
                    breadClasses = [...breadClasses, classes.Roll]
                }
            });
        }

        switch(props.type){
            case ('bread-bottom'):
                ingredient = <div className = {[classes.BreadBottom, breadClasses.join(' ')].join(' ')}></div>
                break;
            case ('bread-top'):
                    ingredient = (
                        <div className = {[classes.BreadTop, breadClasses.join(' ')].join(' ')}>
                            {seeds}
                        </div>
                    );
                break;
            case('meat'):
                ingredient = <div className = {classes.Meat}></div>;
                break;
            case('cheese'):
                ingredient = <div className = {classes.Cheese}></div>;
                break;
            case('bacon'):
                ingredient = <div className = {classes.Bacon}></div>;
                break;
            case('salad'):
                ingredient = <div className = {classes.Salad}></div>;
                break;
            case('onion'):
                ingredient = <div className = {classes.Onion}></div>;
                break;
            case('tomato'):
                ingredient = <div className = {classes.Tomato}></div>;
                break;
            case('ham'):
                ingredient = <div className = {classes.Ham}></div>;
                break;
            default:
                ingredient = null;
        }
        return ingredient;
    };


export default SandwitchIngredient;

