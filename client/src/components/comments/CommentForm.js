import React from 'react';

function CommentForm() {
  const addComment = () => {};
  return (
    <div
      style={{
        background: '#eee',
        padding: 20,
        margin: 10,
        borderRadius: 5,
        border: '1px dashed #c7c7c7',
      }}
    >
      <input type='text' />
      <button className='btn btn-dark btn-block' onClick={addComment}>
        Add Comment
      </button>
    </div>
  );
}

export default CommentForm;
