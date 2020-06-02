import React, { useState, useContext, useEffect } from 'react';
import CommentContext from '../../context/comment/commentContext';

function CommentForm({ id }) {
  const commentContext = useContext(CommentContext);
  const {
    addComment,
    currentComment,
    updateComment,
    clearCurrentComment,
  } = commentContext;

  useEffect(() => {
    if (currentComment !== null) {
      setCmnt(currentComment);
    } else {
      setCmnt({
        id: id,
        content: '',
      });
    }
  }, [currentComment]);

  const [cmnt, setCmnt] = useState({ id: id, content: '' });

  const onChange = (e) => {
    setCmnt({ ...cmnt, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (currentComment === null) {
      addComment(cmnt);
    } else {
      updateComment(cmnt);
    }
    clearAll();
  };
  const clearAll = () => {
    clearCurrentComment();
  };
  const { content } = cmnt;

  return (
    <div
      style={{
        background: '#eee',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        border: '1px dashed #c7c7c7',
      }}
    >
      <form onSubmit={onSubmit}>
        <input type='text' name='content' value={content} onChange={onChange} />
        <input
          type='submit'
          value={currentComment ? 'Update Comment' : 'Add Comment'}
          className='btn btn-primary btn-block'
        />

        {/* <button className='btn btn-dark btn-block' onClick={onSubmit}>
        Add Comment
      </button> */}
      </form>
    </div>
  );
}

export default CommentForm;
