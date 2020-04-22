import React from 'react';
import PropTypes from 'prop-types';

const AllBlogItem = ({ blog }) => {
  const { title, date, image, detail, footer } = blog;

  return (
    <div className='card'>
      <h3 className='text-primary text-left p-nb'>{title} </h3>
      <div className='text-left p-nt'>{date}</div>
      {image && <img src={image} alt='' />}
      <ul className='list'>
        {detail && <li className='text-left px-2'>{detail}</li>}
        {footer && <li className='text-left px-2'>{footer}</li>}
      </ul>
    </div>
  );
};

AllBlogItem.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default AllBlogItem;
