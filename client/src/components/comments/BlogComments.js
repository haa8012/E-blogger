import React, { useContext, useEffect, Fragment } from 'react';
import CommentContext from '../../context/comment/commentContext';
import UserContext from '../../context/auth/authContext';
import CommentForm from './CommentForm';

function BlogComments({ id }) {
  const commentContext = useContext(CommentContext);
  const userContext = useContext(UserContext);

  const { user } = userContext;

  const {
    comments,
    getComments,
    loading,
    setCurrentComment,
    deleteComment,
  } = commentContext;

  useEffect(() => {
    getComments(id);
    // eslint-disable-next-line
  }, []);

  const blogComments = comments;

  const onDelete = (id) => {
    deleteComment(id);
    // clearCurrent();
  };

  const onEdit = (comment) => {
    setCurrentComment(comment);
  };

  if (user !== null) {
    console.log('user logged in ');
  } else {
    console.log('No user logged in ');
  }

  return (
    <Fragment>
      <CommentForm id={id} />
      <div className='comment-container'>
        {blogComments != null ? (
          blogComments.map((comment) => (
            <div>
              <div className='comment' key={comment._id}>
                {comment.content}
              </div>
              {user && (
                <p className='p-2 text-right'>
                  {/* <button
                    className='btn btn-dark btn-sm '
                    onClick={onEdit(comment)}
                  >
                    Edit
                  </button>
                  <button className='btn btn-danger btn-sm ' onClick={onDelete}>
                    Delete
                  </button> */}
                </p>
              )}
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </Fragment>
  );
}

export default BlogComments;
