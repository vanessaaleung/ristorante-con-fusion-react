// reducer that only manages comments

import * as ActionTypes from './ActionTypes';

// receive the action and act on it
export const Comments = (state = {
  errMess: null,
  comments: []
}, action) => {
  switch(action.type) {
    case ActionTypes.ADD_COMMENT:
      var comment = action.payload;
      return {...state, comments: state.comments.concat(comment)};  // pushes new comment and returns
    
    case ActionTypes.ADD_COMMENTS:
      return {...state, 
        isLoading: false,
        errMess: null,
        comments: action.payload};
    
    case ActionTypes.COMMENTS_FAILED:
      return {...state, 
        isLoading: false,
        errMess: action.payload,
        comments: []};
        
    default:
      return state;
  }
}