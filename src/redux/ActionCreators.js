// Create Action objects

import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl'; // configure server communication

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
// enable the fetching of info and update the redux store

// Dishes
export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true)); // setting isLoading to true
  
  return fetch(baseUrl + 'dishes')
            .then(response => response.json()) // convert response to json
            .then(dishes => dispatch(addDishes(dishes)));
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

// Comments
export const fetchComments = () => (dispatch) => {  
  return fetch(baseUrl + 'comments')
            .then(response => response.json()) 
            .then(comments => dispatch(addComments(comments)));
};

export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

// Promos
export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading(true));
  
  return fetch(baseUrl + 'promotions')
            .then(response => response.json())
            .then(promos => dispatch(addPromos(promos)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});

// Leaders
export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading(true));
  
  return fetch(baseUrl + 'leaders')
            .then(response => response.json()) 
            .then(leaders => dispatch(addLeaders(leaders)));
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




