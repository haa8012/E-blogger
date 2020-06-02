import React, { useContext, useEffect, Fragment } from 'react';
import UserContext from '../../context/auth/authContext';
import CommentContext from '../../context/comment/commentContext';
import dateFormat from 'dateformat';

function BlogComment({ comment }) {
  const userContext = useContext(UserContext);
  const { user } = userContext;

  const commentContext = useContext(CommentContext);

  const { setCurrentComment, deleteComment } = commentContext;

  const { content, _id, date } = comment;

  const onDelete = () => {
    deleteComment(_id);
    // clearCurrent();
  };

  const onEdit = () => {
    setCurrentComment(comment);
  };
  //   if (user._id === comment.user) {
  console.log('user: ', user);
  console.log('comment:', comment);
  //   }
  return (
    <div className='comment' key={_id}>
      <div className='text-left' style={{ fontSize: '12px', color: '#505050' }}>
        {dateFormat(date, 'mmmm, dd, yyyy')}
      </div>
      <p className='text-left'> {content}</p>

      {user && user._id === comment.user && (
        <p className='text-right'>
          <i
            className='far fa-edit'
            style={{ color: '', margin: 10 }}
            onClick={onEdit}
          ></i>
          {/* <button className='btn btn-dark btn-sm ' onClick={onEdit}>
            Edit
          </button> */}
          {/* <button className='btn btn-danger btn-sm ' onClick={onDelete}>
            Delete
          </button> */}
          <i
            className='far fa-trash-alt'
            style={{ color: 'red', margin: 10 }}
            onClick={onDelete}
          ></i>
        </p>
      )}
    </div>
  );
}

export default BlogComment;
