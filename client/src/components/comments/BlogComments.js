import React, { useContext, useEffect, Fragment } from 'react';
import CommentContext from '../../context/comment/commentContext';
import CommentForm from './CommentForm';

function BlogComments({ id }) {
  const commentContext = useContext(CommentContext);
  const { comments, getComments, loading } = commentContext;

  useEffect(() => {
    getComments(id);
    // eslint-disable-next-line
  }, []);

  const blogComments = comments;

  return (
    <Fragment>
      <CommentForm />
      <div className='comment-container'>
        {blogComments != null ? (
          blogComments.map((comment) => (
            <div className='comment'>{comment.content}</div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </Fragment>
  );
}

export default BlogComments;
