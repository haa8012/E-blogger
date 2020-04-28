import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import BlogContext from '../../context/blog/blogContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const blogContext = useContext(BlogContext);

  const { isAuthenticated, logout, user, loadUser } = authContext;
  const { clearBlogs } = blogContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
    clearBlogs();
  };

  const authLinks = (
    <Fragment>
      <h3>
        <Link to='/'> Edit Blogs {'    '}</Link>
      </h3>

      <ul>
        <li>
          Hello <span style={{ fontWeight: 700 }}>{user && user.name}</span>
        </li>
        <li>
          <a onClick={onLogout} href='#!'>
            {' '}
            {'     '}
            <i className='fas fa-sign-out-alt' />{' '}
            <span className='hide-sm'>Logout</span>
          </a>
        </li>
      </ul>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <ul>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </Fragment>
  );

  return (
    <div className='navbar bg-light'>
      <h3>
        <Link to='/Blogger'>
          <i className={icon} /> {title}
        </Link>
        <Link to='/blogger'>Blogs </Link>
        <Link to='/About'>About </Link>
      </h3>

      {isAuthenticated ? authLinks : guestLinks}
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Jackie's Blogger",
  icon: 'fas fa-id-card-alt',
};

export default Navbar;
