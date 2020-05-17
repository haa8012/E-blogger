import React from 'react';
import AllBlogs from '../blogs/AllBlogs';
import BlogFilterAll from '../blogs/BlogFilterAll';

function Blogger() {
  return (
    <div className=''>
      <BlogFilterAll />
      <AllBlogs />
    </div>
  );
}

export default Blogger;
