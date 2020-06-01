import React, { useReducer } from 'react';
import axios from 'axios';
import CommentContext from './commentContext';
import CommentReducer from './commentReducer';

import {
  GET_COMMENTS,
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  SET_CURRENT_COMMENT,
  CLEAR_CURRENT_COMMENT,
  COMMENT_ERROR,
} from '../types';

const CommentState = (props) => {
  const initialState = {
    comments: null,
    currentComment: null,
    error: null,
  };
  const [state, dispatch] = useReducer(CommentReducer, initialState);

  // Get Comments
  const getComments = async (id) => {
    try {
      const res = await axios.get(`/api/comments/${id}`);

      dispatch({
        type: GET_COMMENTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: COMMENT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Add Comment
  const addComment = async (comment) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/comments', comment, config);

      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: COMMENT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Delete Comment
  const deleteComment = async (id) => {
    try {
      await axios.delete(`/api/comments/${id}`);

      dispatch({
        type: DELETE_COMMENT,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: COMMENT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Update Comment
  const updateComment = async (comment) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `/api/comments/${comment._id}`,
        comment,
        config
      );

      dispatch({
        type: UPDATE_COMMENT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: COMMENT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Set Current Comment
  const setCurrentComment = (comment) => {
    dispatch({ type: SET_CURRENT_COMMENT, payload: comment });
  };

  // Clear Current Comment
  const clearCurrentComment = () => {
    dispatch({ type: CLEAR_CURRENT_COMMENT });
  };

  return (
    <CommentContext.Provider
      value={{
        comments: state.comments,
        currentComment: state.currentComment,
        error: state.error,
        getComments,
        addComment,
        updateComment,
        deleteComment,
        setCurrentComment,
        clearCurrentComment,
      }}
    >
      {props.children}
    </CommentContext.Provider>
  );
};

export default CommentState;
