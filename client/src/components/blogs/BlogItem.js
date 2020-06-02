import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import BlogContext from '../../context/blog/blogContext';
import dateFormat from 'dateformat';

const BlogItem = ({ blog }) => {
  const blogContext = useContext(BlogContext);
  const { deleteBlog, deleteImage, setCurrent, clearCurrent } = blogContext;

  const { _id, title, date, image, detail, footer, type } = blog;

  const onDelete = () => {
    deleteBlog(_id);
    deleteImage(image.split('/').pop());
    clearCurrent();
  };

  const onEdit = () => {
    setCurrent(blog);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <div className='card'>
      <h3 className='text-primary text-left p-nb'>
        {title}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' + (type === 'public' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <div className='text-left p-nt'>{dateFormat(date, 'mmmm, dd, yyyy')}</div>
      {image && <img src={image} alt='' />}
      <ul className='list'>
        {detail && <li className='text-left px-2'>{detail}</li>}
        {footer && <li className='text-left px-2'>{footer}</li>}
      </ul>
      <p className='p-2 text-right'>
        <button className='btn btn-dark btn-sm ' onClick={onEdit}>
          Edit
        </button>
        <button className='btn btn-danger btn-sm ' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

BlogItem.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default BlogItem;
