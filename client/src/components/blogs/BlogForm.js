import React, { useState, useContext, useEffect } from 'react';
import BlogContext from '../../context/blog/blogContext';
// import FileUpload from './FileUpload';
import axios from 'axios';

const BlogForm = () => {
  const blogContext = useContext(BlogContext);

  const {
    addBlog,
    updateBlog,
    clearCurrent,
    deleteImage,
    current,
  } = blogContext;

  useEffect(() => {
    if (current !== null) {
      setBlog(current);
    } else {
      setBlog({
        title: '',
        image: '',
        detail: '',
        footer: '',
        type: 'private',
      });
    }
  }, [blogContext, current]);

  const [blog, setBlog] = useState({
    title: '',
    image: '',
    detail: '',
    footer: '',
    type: 'private',
  });

  const { title, image, detail, footer, type } = blog;

  const onChange = async (e) => {
    if (e.target.name === 'photo') {
      /////////////////
      // Upload to save server
      /////////////////
      // const formData = new FormData();
      // formData.append('file', e.target.files[0]);
      // try {
      //   const res = await axios.post('/api/upload', formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   });

      //   const { fileName, filePath } = res.data;
      //   console.log(res);
      //   setBlog({
      //     ...blog,
      //     image: filePath,
      //   });
      // } catch (err) {
      //   if (err.response.status === 500) {
      //     console.log('There was a problem with the server');
      //   } else {
      //     console.log(err.response.data.msg);
      //   }
      // }

      /////////////////
      // Upload to AWS
      /////////////////
      const data = new FormData();
      data.append('img', e.target.files[0], e.target.files[0].name);
      try {
        const res = await axios.post('/api/image-upload', data, {
          headers: {
            accept: 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          },
        });

        if (current && (image !== null || image != '')) {
          console.log('replace image...');
          deleteImage(image.split('/').pop());
        }

        setBlog({
          ...blog,
          image: res.data.location,
        });
      } catch (err) {
        if (err.response.status === 500) {
          console.log('There was a problem with the server');
        } else {
          console.log(err.response.data.msg);
        }
      }
    } else {
      setBlog({
        ...blog,
        [e.target.name]: e.target.value, //changed it to accomodate file uploads
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addBlog(blog);
    } else {
      updateBlog(blog);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };
  // const onKeydown = (e) => {
  //   // e.preventDefault();
  //   console.log(e.target);
  //   // e.target.setStyle({'cssText': ''})
  //   e.target.cssText = 'height:auto; padding:0';
  //   e.target.cssText = 'height:' + e.target.scrollHeight + 'px';
  // };

  return (
    <div className='form-container-sp'>
      <form
        onSubmit={onSubmit}
        // action='/upload'
        // method='post'
        // encType='multipart/form-data'
      >
        <h2 className='text-primary'>{current ? 'Edit Blog' : 'Add Blog'}</h2>
        <input
          type='text'
          placeholder='Title'
          name='title'
          value={title}
          onChange={onChange}
        />
        {/* <FileUpload></FileUpload> */}
        {/* <input id='file-upload' type='file' onChange={onChange}></input> */}
        <label htmlFor='file-upload' className='custom-file-upload'>
          <i className='fas fa-cloud-upload-alt'></i> Upload image
        </label>
        <input
          id='file-upload'
          type='file'
          accept='image/*'
          name='photo'
          onChange={onChange}
        />
        <input
          type='text'
          placeholder='imageURI'
          name='image'
          value={image}
          onChange={onChange}
        />
        {/* https://codepen.io/vsync/pen/czgrf
      dynamicly changing text area */}
        <textarea
          rows='3'
          // columns='50'
          id='detail'
          placeholder='Detail'
          name='detail'
          value={detail}
          onChange={onChange}
          // onKeyDown={onKeydown}
        ></textarea>
        <input
          type='text'
          placeholder='Footer'
          name='footer'
          value={footer}
          onChange={onChange}
        />
        <h5>Blog Type</h5>
        <input
          type='radio'
          name='type'
          value='private'
          checked={type === 'private'}
          onChange={onChange}
        />{' '}
        Private{' '}
        <input
          type='radio'
          name='type'
          value='public'
          checked={type === 'public'}
          onChange={onChange}
        />{' '}
        Public
        <div>
          <input
            type='submit'
            value={current ? 'Update Blog' : 'Add Blog'}
            className='btn btn-primary btn-block'
          />
        </div>
        {current && (
          <div>
            <button className='btn btn-light btn-block' onClick={clearAll}>
              Clear
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default BlogForm;
