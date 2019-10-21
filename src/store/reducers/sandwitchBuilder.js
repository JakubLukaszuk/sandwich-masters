import * as actionTypes from '../actions/actionsTypes';

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
  bread: null,
  ingredients: null,
  totalPrice: 4,
  error: false
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
      const price = !state.bread[action.breadProperty]
        ? INGREDIENT_PRICES[action.breadProperty]
        : -INGREDIENT_PRICES[action.breadProperty];
      return {
        ...state,
        bread: {
          ...state.bread,
          [action.breadProperty]: !state.bread[action.breadProperty]
        },
        totalPrice: state.totalPrice + price
      }
    case actionTypes.SET_INGREADEINTS:
      return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false
      }
    case actionTypes.SET_BREAD:
      return {
        ...state,
        bread: action.bread
      }
    case actionTypes.FETCH_INGREADIENTS_FAILED:
      return {
        ...state,
        error: true
      }
    default:
      return state;
  }
};

export default reducer;
