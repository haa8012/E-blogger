import BlogContext from '../../context/blog/blogContext';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import SocialShare from './SocialShare';
import { Helmet } from 'react-helmet';
import thump from '../layout/logo.png';

import axios from 'axios';

const BlogDisplay = () => {
  const { id } = useParams();
  useEffect(() => {
    getBlog(id);
  }, []);

  const [currBlog, setCurrBlog] = useState({
    title: '',
    date: '',
    image: '',
    detail: '',
    footer: '',
  });

  const getBlog = async (id) => {
    try {
      const res = await axios.get(`/api/blogs/${id}`);
      setCurrBlog(res.data);
    } catch (err) {
      console.log('error', err);
    }
  };

  const { title, date, image, detail, footer } = currBlog;
  return (
    <div className='card-full'>
      <Helmet>
        <meta property='og:image' content={thump} />
        <meta property='og:title' content={title} />
        <meta
          property='og:description'
          content='Description that will show in the preview'
        />
        <meta property='og:url' content={String(window.location)} />
      </Helmet>
      <div className='share-banner'>
        <h3 className='text-primary text-left p-nb'> {title} </h3>
        <SocialShare image={image} title={title} />
      </div>
      <div className='text-left p-nt'>{dateFormat(date, 'mmmm, dd, yyyy')}</div>
      {image && <img src={image} alt='' />}
      <ul className='list'>
        {detail && <li className='text-left px-2'>{detail}</li>}
        {footer && <li className='text-left px-2'>{footer}</li>}
      </ul>
      <div className='p-2'>
        <Link
          to='/blogs'
          // onClick={() => clearCurrent()}
          style={{ color: '#1976d2' }}
        >
          Return Home
        </Link>{' '}
        <i className='fas fa-home' style={{ color: '#1976d2' }}></i>
      </div>
    </div>
  );
};

export default BlogDisplay;
