import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import BlogContext from '../../context/blog/blogContext';
import { Link } from 'react-router-dom';

const AllBlogItem = ({ blog }) => {
  const blogContext = useContext(BlogContext);
  const { setCurrent } = blogContext;

  const { title, date, image, detail, footer } = blog;

  return (
    <div className='card'>
      <h3 className='text-primary text-left p-nb'>{title} </h3>
      <div className='text-left p-nt'>{dateFormat(date, 'mmmm, dd, yyyy')}</div>
      {image && <img src={image} alt='' />}
      <ul className='list'>
        {detail && <p className='text-left px-1 detail'>{detail}</p>}
        {footer && <li className='text-left px-1'>{footer}</li>}
      </ul>
      <div className='p-2 text-left'>
        <Link
          to={`/blog/blogpost`} //${title}`}
          style={{ color: '#1976d2' }}
          onClick={() => setCurrent(blog)}
        >
          Read More...
        </Link>{' '}
        {/* <i className='fas fa-book-open' style={{ color: '#1976d2' }}></i> */}
      </div>
    </div>
  );
};

AllBlogItem.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default AllBlogItem;
