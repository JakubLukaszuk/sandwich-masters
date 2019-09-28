import * as actionTypes from './actions';

const INGREDIENT_PRICES = {
  salad: 0.2,
  cheese: 0.4,
  bacon: 0.8,
  meat: 1,
  onion: 0.1,
  tomato: 0.2,
  seed: 0.1,
  multigrain: 0.1,
  rollBread: 0.1,
  ham: 0.2
}

const initialState = {
  bread: {
    seed: false,
    rollBread: false,
    multigrain: false
  },
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
    onion: 0,
    tomato: 0,
    ham: 0
  },
  totalPrice: 4
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREADEINT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingreadientName]: state.ingredients[action.ingreadientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingreadientName]
      }
    case actionTypes.REMOVE_INGREADEINT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingreadientName]: state.ingredients[action.ingreadientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingreadientName]
      }
    case actionTypes.CHANGE_BREAD_PROPETY:
      const price = !state.bread[action.breadProperty] ? INGREDIENT_PRICES[action.breadProperty] : -INGREDIENT_PRICES[action.breadProperty];
      return {
        ...state,
        bread: {
          ...state.bread,
          [action.breadProperty]: !state.bread[action.breadProperty]
        },
        totalPrice: state.totalPrice + price
      }
    default:
      return state;
  }
};

export default reducer;
