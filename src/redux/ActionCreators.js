// Create Action objects

import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';
import { LEADERS } from '../shared/leaders';

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

// enable the fetching of leaders info and update the redux store
export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading(true));
  
  setTimeout(() => {
    dispatch(addLeaders(LEADERS))
  }, 2000);
};

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
});




