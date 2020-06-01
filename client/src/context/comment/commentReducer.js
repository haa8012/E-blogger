import {
  GET_COMMENTS,
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  SET_CURRENT_COMMENT,
  CLEAR_CURRENT_COMMENT,
  COMMENT_ERROR,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
        loading: false,
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment._id === action.payload._id ? action.payload : comment
        ),
        loading: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment._id !== action.payload
        ),
        loading: false,
      };
    case SET_CURRENT_COMMENT:
      return {
        ...state,
        currentComment: action.payload,
      };
    case CLEAR_CURRENT_COMMENT:
      return {
        ...state,
        currentComment: null,
      };
    case COMMENT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
