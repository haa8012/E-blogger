import React, { useContext, useRef, useEffect } from 'react';
import BlogContext from '../../context/blog/blogContext';

const BlogFilter = () => {
  const blogContext = useContext(BlogContext);
  const text = useRef('');

  const { filterBlogs, clearFilter, filtered } = blogContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterBlogs(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <div style={{ display: 'flex' }}>
        {/* <button title='Search' type='submit'>
          <svg
            version='1.1'
            viewBox='0 0 32 32'
            width='16'
            height='16'
            aria-hidden='false'
          >
            <path d='M31 28.64l-7.57-7.57a12.53 12.53 0 1 0-2.36 2.36l7.57 7.57zm-17.5-6a9.17 9.17 0 1 1 6.5-2.64 9.11 9.11 0 0 1-6.5 2.67z'></path>
          </svg>
          <span> Search</span>
        </button>{' '} */}
        <input
          className='search'
          ref={text}
          type='text'
          placeholder='Search Blogs...'
          onChange={onChange}
        />
      </div>
      {/* <i className='fa fa-search' aria-hidden='true'>
      </i> */}
    </form>
  );
};

export default BlogFilter;
