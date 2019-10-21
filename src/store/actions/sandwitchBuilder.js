import * as actionTypes from './actionsTypes';
import axiosOrders from '../../axios-orders';

export const addIngreadient = (ingreadientName) => {
    return {
        type: actionTypes.ADD_INGREADEINT,
        ingreadientName: ingreadientName
    }
}

export const removeIngreadient = (ingreadientName) => {
    return {
        type: actionTypes.REMOVE_INGREADEINT,
        ingreadientName: ingreadientName
    }
}

export const changeBreadProperty = (breadProperty) => {
    return{
        type: actionTypes.CHANGE_BREAD_PROPETY,
        breadProperty: breadProperty
    }
}

export const setIngreadients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREADEINTS,
        ingredients: ingredients
    };
}

export const setBread = (bread) => {
    return {
        type: actionTypes.SET_BREAD,
        bread: bread
    };
}

export const fetchIngredientsFalied = () => {
    return{
        type: actionTypes.FETCH_INGREADIENTS_FAILED
    }
}

export const initIngreadients = () => {
    return dispatch =>{
        axiosOrders.get('/ingredients.json').then(
            response => {
              dispatch(setIngreadients(response.data));
            })
            .catch(error => {
              dispatch(fetchIngredientsFalied());
            })
    }
}

export const initBread = () => {
    return dispatch =>{
        axiosOrders.get('/bread.json').then(
            response => {
              dispatch(setBread(response.data));
            })
            .catch(error => {
              dispatch(fetchIngredientsFalied());
            })
    }
}

