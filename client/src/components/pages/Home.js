import React from 'react';
import Blogs from '../blogs/Blogs';
import BlogForm from '../blogs/BlogForm';
import BlogFilter from '../blogs/BlogFilter';

const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <BlogForm />
      </div>
      <div>
        <BlogFilter />
        <Blogs />
      </div>
    </div>
  );
};

export default Home;
