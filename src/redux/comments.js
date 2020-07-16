// reducer that only manages comments

import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

// receive the action and act on it
export const Comments = (state = COMMENTS, action) => {
  switch(action.type) {
    case ActionTypes.ADD_COMMENT:
      var comment = action.payload;
      comment.id = state.length;  // assign id on sequential order
      comment.date = new Date().toISOString();
      return state.concat(comment);    // pushes new comment and returns
    default:
      return state;
  }
}