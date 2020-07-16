// Create Action objects

import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';

export const addComment = (dishId, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {   // contains data sent back
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment
  }
});

// a thunk: return a function which contains a inner function
export const fetchDishes = () => (dispatch) => {
  // first dispatch: setting isLoading to true
  dispatch(dishesLoading(true));
  
  // after 2000 secs, second dispatch: pushes new dishes
  setTimeout(() => {
    dispatch(addDishes(DISHES))
  }, 2000);
};

// inform the dishes are loading
export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});
