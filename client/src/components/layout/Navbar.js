// import React, { Fragment, useContext, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import AuthContext from '../../context/auth/authContext';
// import BlogContext from '../../context/blog/blogContext';

// const Navbar = ({ title, icon }) => {
//   const authContext = useContext(AuthContext);
//   const blogContext = useContext(BlogContext);

//   const { isAuthenticated, logout, user, loadUser } = authContext;
//   const { clearBlogs } = blogContext;

//   useEffect(() => {
//     loadUser();
//     // eslint-disable-next-line
//   }, []);

//   const onLogout = () => {
//     logout();
//     clearBlogs();
//   };

//   const authLinks = (
//     <Fragment>
//       <h3>
//         <Link to='/'> Edit Blogs {'    '}</Link>
//       </h3>

//       <ul>
//         <li>
//           Hello <span style={{ fontWeight: 700 }}>{user && user.name}</span>
//         </li>
//         <li>
//           <a onClick={onLogout} href='#!'>
//             {' '}
//             {'     '}
//             <i className='fas fa-sign-out-alt' />{' '}
//             <span className='hide-sm'>Logout</span>
//           </a>
//         </li>
//       </ul>
//     </Fragment>
//   );

//   const guestLinks = (
//     <Fragment>
//       <ul>
//         <li>
//           <Link to='/register'>Register</Link>
//         </li>
//         <li>
//           <Link to='/login'>Login</Link>
//         </li>
//       </ul>
//     </Fragment>
//   );

//   return (
//     <div className='navbar bg-light'>
//       <h3>
//         <Link to='/Blogger'>
//           <i className={icon} /> {title}
//         </Link>
//         <Link to='/blogger'>Blogs </Link>
//         <Link to='/About'>About </Link>
//       </h3>

//       {isAuthenticated ? authLinks : guestLinks}
//     </div>
//   );
// };

// Navbar.propTypes = {
//   title: PropTypes.string.isRequired,
//   icon: PropTypes.string,
// };

// Navbar.defaultProps = {
//   title: "Jackie's Blogger",
//   icon: 'fas fa-id-card-alt',
// };

// export default Navbar;

import React, { Fragment, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import BlogContext from '../../context/blog/blogContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const blogContext = useContext(BlogContext);

  const { isAuthenticated, logout, user, loadUser } = authContext;
  const { clearBlogs } = blogContext;
  const [navState, setNavState] = useState(false);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line

    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navlinks = document.querySelectorAll('.nav-links li');

    if (burger) {
      burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navlinks.forEach((link, index) => {
          if (link.style.animation) {
            link.style.animation = '';
          } else {
            console.log(index / 9 + 0.6);
            link.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 9 + 0.3
            }s`;
          }
          burger.classList.toggle('burger-toggle');
        });
      });
    }

    navlinks.forEach((link, index) => {
      link.addEventListener('click', () => {
        navlinks.forEach((link) => {
          link.style.opacity = 1;
        });

        nav.classList.toggle('nav-active');
        burger.classList.toggle('burger-toggle');
      });
    });

    // return () => {
    //   console.log('done...');
    // };
  }, []);

  // useEffect(() => {
  //   const nav = document.querySelector('.nav-links');
  //   const navlinks = document.querySelectorAll('.nav-links li');

  //   navlinks.forEach((link, index) => {
  //     link.addEventListener('click', () => {
  //       navlinks.forEach((link) => {
  //         link.style.opacity = 1;
  //       });
  //     });
  //   });
  // }, [navState]);

  const onLogout = () => {
    logout();
    clearBlogs();
  };

  const authLinks = (
    <Fragment>
      <li>
        <Link to='/'> Edit Blogs {'    '}</Link>
      </li>
      <li style={{ color: 'white' }}>
        Hello,
        <span style={{ color: 'white', fontWeight: 200 }}>
          {user && ' ' + user.name}
        </span>
      </li>
      <li onClick={() => setNavState(false)} style={{ opacity: 1 }}>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt' />
          <span>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login' onClick={() => setNavState(true)}>
          Login
        </Link>
      </li>
    </Fragment>
  );

  return (
    <nav>
      <div className='logo'>
        <h4>Jackie's Blogs</h4>
      </div>
      <ul className='nav-links'>
        <li>
          <Link to='/Blogger'>Home </Link>
        </li>
        <li>
          <Link to='/blogger'>Blogs </Link>
        </li>
        <li>
          <Link to='/About'>About </Link>
        </li>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
      <div className='burger'>
        <div className='line1'></div>
        <div className='line2'></div>
        <div className='line3'></div>
      </div>
    </nav>
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
