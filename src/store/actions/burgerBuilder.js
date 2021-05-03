import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'


export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENTS,
    ingredientName: name
  }
}

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    ingredientName: name
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
}


export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('https://brave-aileron-310307-default-rtdb.firebaseio.com/ingredients.json')
      .then(res => {
        console.log(res)
        dispatch(setIngredients(res.data))
      })
      .catch(err => {
        console.log('hattt sala', err)
        dispatch(fetchIngredientsFailed())
      })
  }
}