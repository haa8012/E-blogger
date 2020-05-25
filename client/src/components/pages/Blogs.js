import React from 'react';
import AllBlogs from '../blogs/AllBlogs';
import BlogFilterAll from '../blogs/BlogFilterAll';

function Blogs() {
  return (
    <div className=''>
      <BlogFilterAll />
      <AllBlogs />
    </div>
  );
}

export default Blogs;
