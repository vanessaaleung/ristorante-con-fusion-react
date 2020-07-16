// Create Action objects

import * as ActionTypes from './ActionTypes';

export const addComment = (dishId, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {   // contains data sent back
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment
  }
})