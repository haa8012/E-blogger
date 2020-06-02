import React, { useContext, useEffect, Fragment } from 'react';
import CommentContext from '../../context/comment/commentContext';

import CommentForm from './CommentForm';
import BlogComment from './BlogComment';

function BlogComments({ id }) {
  const commentContext = useContext(CommentContext);

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

  return (
    <Fragment>
      <CommentForm id={id} />
      <div className='comment-container'>
        {blogComments != null ? (
          blogComments.map((comment) => <BlogComment comment={comment} />)
        ) : (
          <div></div>
        )}
      </div>
    </Fragment>
  );
}

export default BlogComments;
