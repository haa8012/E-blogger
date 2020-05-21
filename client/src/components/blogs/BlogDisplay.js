import BlogContext from '../../context/blog/blogContext';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  PinterestIcon,
} from 'react-share';

const BlogDisplay = () => {
  const blogContext = useContext(BlogContext);
  const { current, clearCurrent } = blogContext;

  useEffect(() => {
    if (current !== null) {
      setBlog(current);
    } else {
      setBlog({
        title: '',
        date: '',
        image: '',
        detail: '',
        footer: '',
      });
    }
  }, [blogContext, current]);

  const [blog, setBlog] = useState({
    title: '',
    date: '',
    image: '',
    detail: '',
    footer: '',
  });

  const { title, date, image, detail, footer } = blog;
  const size = 25;
  const blogTitle = `Share ${String(window.location)}`;

  return (
    <div className='card-full'>
      {' '}
      <div className='share-banner'>
        <h3 className='text-primary text-left p-nb'> {title} </h3>
        <div>
          <EmailShareButton subject={blogTitle}>
            <EmailIcon size={size} round={true} />
          </EmailShareButton>
          <FacebookShareButton quote={blogTitle}>
            <FacebookIcon size={size} round={true} />
          </FacebookShareButton>
          <TwitterShareButton title={blogTitle}>
            <TwitterIcon size={size} round={true} />
          </TwitterShareButton>
          <WhatsappShareButton title={blogTitle} separator=':: '>
            <WhatsappIcon size={size} round={true} />
          </WhatsappShareButton>
          <LinkedinShareButton
            title={blogTitle}
            windowWidth={750}
            windowHeight={600}
          >
            <LinkedinIcon size={size} round={true} />
          </LinkedinShareButton>
          <PinterestShareButton
            url={String(window.location)}
            media={`${image}`}
            windowWidth={1000}
            windowHeight={730}
          >
            <PinterestIcon size={size} round={true} />
          </PinterestShareButton>
        </div>
      </div>
      <div className='text-left p-nt'>{dateFormat(date, 'mmmm, dd, yyyy')}</div>
      {image && <img src={image} alt='' />}
      <ul className='list'>
        {detail && <li className='text-left px-2'>{detail}</li>}
        {footer && <li className='text-left px-2'>{footer}</li>}
      </ul>
      <div className='p-2'>
        <Link
          to='/blogger'
          onClick={() => clearCurrent()}
          style={{ color: '#1976d2' }}
        >
          Return Home
        </Link>{' '}
        <i className='fas fa-home' style={{ color: '#1976d2' }}></i>
      </div>
    </div>
  );
};

BlogDisplay.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default BlogDisplay;
