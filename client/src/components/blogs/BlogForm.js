// import React, { useState, useContext, useEffect } from 'react';
// import BlogContext from '../../context/blog/blogContext';
// import Compressor from 'compressorjs';
// // import Editor from '../../utils/Editor';
// import axios from 'axios';
// import ReactQuill, { Quill } from 'react-quill';
// import PropTypes from 'prop-types';
// import ImageUploader from 'quill-image-uploader';

// // #2 register module
// Quill.register('modules/imageUploader', ImageUploader);

// const BlogForm = () => {
//   const blogContext = useContext(BlogContext);
//   const regex = /src="(.*?)(?=".*?)/gm;

//   const {
//     addBlog,
//     updateBlog,
//     clearCurrent,
//     deleteImage,
//     setCurrent,
//     current,
//   } = blogContext;

//   useEffect(() => {
//     if (current !== null) {
//       setBlog(current);
//     } else {
//       setBlog({
//         title: '',
//         image: '',
//         detail: '',
//         footer: '',
//         type: 'private',
//         blogContent: '',
//         // images: [],
//       });
//     }
//     console.log('changed...', blog);
//   }, [blogContext, current]);

//   const [blog, setBlog] = useState({
//     title: '',
//     image: '',
//     detail: '',
//     footer: '',
//     type: 'private',
//     blogContent: '',
//     // images: [],
//   });

//   const onChange = async (e) => {
//     setBlog({
//       ...blog,
//       [e.target.name]: e.target.value, //changed it to accomodate file uploads
//     });
//   };

//   const onEditorChange = (html) => {
//     // //get image urls
//     // let m;
//     // let urls = [];
//     // while ((m = regex.exec(html)) !== null) {
//     //   // This is necessary to avoid infinite loops with zero-width matches
//     //   if (m.index === regex.lastIndex) {
//     //     regex.lastIndex++;
//     //   }
//     //   // The result can be accessed through the `m`-variable.
//     //   m.forEach((match, groupIndex) => {
//     //     urls.push(match.replace('src="', ''));
//     //   });
//     // }

//     // const imageURLS = [...new Set(urls)];
//     // if (imageURLS) {
//     //   // setBlog({ ...blog, images: imageURLS, blogContent: html });
//     // } else {
//     //   setBlog({ ...blog, blogContent: html });
//     // }

//     setBlog({ ...blog, blogContent: html });
//     console.log(blog);
//     console.log(current);
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     if (current === null) {
//       addBlog(blog);
//     } else {
//       console.log('blog before update:', blog);
//       updateBlog(blog);
//     }
//     clearAll();
//   };

//   const clearAll = () => {
//     clearCurrent();
//   };

//   const { title, detail, image, footer, type, blogContent } = blog;
//   return (
//     <div className='form-container-sp'>
//       <form onSubmit={onSubmit}>
//         <h2 className='text-primary'>{current ? 'Edit Blog' : 'Add Blog'}</h2>
//         <input
//           type='text'
//           placeholder='Title'
//           name='title'
//           value={title}
//           onChange={onChange}
//         />
//         <ReactQuill
//           onChange={onEditorChange}
//           value={blogContent}
//           modules={ReactQuill.modules}
//           formats={ReactQuill.formats}
//           bounds={'.app'}
//           placeholder='Write a blog...'
//         />
//         <h5>Blog Type</h5>
//         <input
//           type='radio'
//           name='type'
//           value='private'
//           checked={type === 'private'}
//           onChange={onChange}
//         />{' '}
//         Private{' '}
//         <input
//           type='radio'
//           name='type'
//           value='public'
//           checked={type === 'public'}
//           onChange={onChange}
//         />{' '}
//         Public
//         <div>
//           <input
//             type='submit'
//             value={current ? 'Update Blog' : 'Add Blog'}
//             className='btn btn-primary btn-block'
//           />
//         </div>
//         {current && (
//           <div>
//             <button className='btn btn-light btn-block' onClick={clearAll}>
//               Clear
//             </button>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// ReactQuill.modules = {
//   toolbar: [
//     [{ header: '1' }, { header: '2' }, { font: [] }],
//     [{ size: [] }],
//     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//     [
//       { list: 'ordered' },
//       { list: 'bullet' },
//       { indent: '-1' },
//       { indent: '+1' },
//     ],
//     [{ align: [] }],
//     ['link', 'image', 'video'],
//     ['clean'],
//   ],
//   clipboard: {
//     // toggle to add extra line breaks when pasting HTML:
//     matchVisual: false,
//   },
//   imageUploader: {
//     upload: (file) => {
//       return new Promise((resolve, reject) => {
//         try {
//           new Compressor(file, {
//             quality: 0.6,
//             width: 700,
//             async success(result) {
//               const data = new FormData();
//               // The third parameter is required for server

//               data.append('img', result, result.name);

//               const res = await axios.post('/api/image-upload', data, {
//                 headers: {
//                   accept: 'application/json',
//                   'Accept-Language': 'en-US,en;q=0.8',
//                   'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
//                 },
//               });

//               resolve(res.data.location);
//             },
//             error(err) {
//               console.log(err.message);
//             },
//           });
//         } catch (err) {
//           if (err.response.status === 500) {
//             console.log('There was a problem with the server');
//           } else {
//             console.log(err.response.data.msg);
//           }
//           reject(err);
//         }
//       });
//     },
//   },
// };
// /*
//  * Quill editor formats
//  * See https://quilljs.com/docs/formats/
//  */
// ReactQuill.formats = [
//   'header',
//   'font',
//   'size',
//   'bold',
//   'italic',
//   'underline',
//   'strike',
//   'blockquote',
//   'list',
//   'bullet',
//   'indent',
//   'align',
//   'link',
//   'image',
//   'video',
// ];

// /*
//  * PropType validation
//  */
// ReactQuill.propTypes = {
//   placeholder: PropTypes.string,
// };

// export default BlogForm;

//////////////////////////////////////////////
/// Old Code before implementing Text Editor
//////////////////////////////////////////////

import React, { useState, useContext, useEffect } from 'react';
import BlogContext from '../../context/blog/blogContext';
import Compressor from 'compressorjs';
import ReactQuill, { Quill } from 'react-quill';
import PropTypes from 'prop-types';
import ImageUploader from 'quill-image-uploader';
import axios from 'axios';

// #2 register module
Quill.register('modules/imageUploader', ImageUploader);

const BlogForm = () => {
  const blogContext = useContext(BlogContext);
  const regex = /src="(.*?)(?=".*?)/gm;
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
        blogContent: '',
      });
    }
  }, [blogContext, current]);

  const [blog, setBlog] = useState({
    title: '',
    image: '',
    detail: '',
    footer: '',
    type: 'private',
    blogContent: '',
  });

  const { title, image, detail, footer, type, blogContent } = blog;

  const onChange = async (e) => {
    if (e.target.name === 'photo') {
      /////////////////
      // Upload to AWS
      /////////////////

      try {
        const file = e.target.files[0];

        new Compressor(file, {
          quality: 0.6,
          width: 700,
          async success(result) {
            const data = new FormData();
            // The third parameter is required for server

            data.append('img', result, result.name);

            const res = await axios.post('/api/image-upload', data, {
              headers: {
                accept: 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
              },
            });

            if (current && (image !== null || image !== '')) {
              console.log('replacing image...');
              deleteImage(image.split('/').pop());
            }

            setBlog({
              ...blog,
              image: res.data.location,
            });
          },
          error(err) {
            console.log(err.message);
          },
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
  const onEditorChange = (html) => {
    // console.log('reado for an update...', blog);
    if (current) {
      // setBlog({ ...current, blogContent: html });
      // setBlog(current);
    } else {
    }
    setBlog({ ...blog, blogContent: html });
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
        <ReactQuill
          onChange={onEditorChange}
          value={blogContent}
          modules={ReactQuill.modules}
          formats={ReactQuill.formats}
          bounds={'.app'}
          placeholder='Write a blog...'
        />
        {/* <Editor placeholder={'Write something...'} /> */}
        {/* <FileUpload></FileUpload> */}
        {/* <input id='file-upload' type='file' onChange={onChange}></input> */}
        {/* <label htmlFor='file-upload' className='custom-file-upload'>
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
        /> */}
        {/* https://codepen.io/vsync/pen/czgrf
      dynamicly changing text area */}
        {/* <textarea
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
        /> */}
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

ReactQuill.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    [{ align: [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  imageUploader: {
    upload: (file) => {
      return new Promise((resolve, reject) => {
        try {
          new Compressor(file, {
            quality: 0.6,
            width: 700,
            async success(result) {
              const data = new FormData();
              // The third parameter is required for server

              data.append('img', result, result.name);

              const res = await axios.post('/api/image-upload', data, {
                headers: {
                  accept: 'application/json',
                  'Accept-Language': 'en-US,en;q=0.8',
                  'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                },
              });

              resolve(res.data.location);
            },
            error(err) {
              console.log(err.message);
            },
          });
        } catch (err) {
          if (err.response.status === 500) {
            console.log('There was a problem with the server');
          } else {
            console.log(err.response.data.msg);
          }
          reject(err);
        }
      });
    },
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
ReactQuill.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'align',
  'link',
  'image',
  'video',
];

/*
 * PropType validation
 */
ReactQuill.propTypes = {
  placeholder: PropTypes.string,
};

export default BlogForm;

//////////////////////////////////////////////////////
// Old logic working code without rich text editor ///
//////////////////////////////////////////////////////

//////////////////////////////////////////////
/// Old Code before implementing Text Editor
//////////////////////////////////////////////

// import React, { useState, useContext, useEffect } from 'react';
// import BlogContext from '../../context/blog/blogContext';
// import Compressor from 'compressorjs';
// // import Editor from '../../utils/Editor';
// import axios from 'axios';

// const BlogForm = () => {
//   const blogContext = useContext(BlogContext);

//   const {
//     addBlog,
//     updateBlog,
//     clearCurrent,
//     deleteImage,
//     current,
//   } = blogContext;

//   useEffect(() => {
//     if (current !== null) {
//       setBlog(current);
//     } else {
//       setBlog({
//         title: '',
//         image: '',
//         detail: '',
//         footer: '',
//         type: 'private',
//         blogContent: '',
//       });
//     }
//   }, [blogContext, current]);

//   const [blog, setBlog] = useState({
//     title: '',
//     image: '',
//     detail: '',
//     footer: '',
//     type: 'private',
//     blogContent: '',
//   });

//   const { title, image, detail, footer, type, blogContent } = blog;

//   const onChange = async (e) => {
//     if (e.target.name === 'photo') {
//       /////////////////
//       // Upload to AWS
//       /////////////////

//       try {
//         const file = e.target.files[0];

//         new Compressor(file, {
//           quality: 0.6,
//           width: 700,
//           async success(result) {
//             const data = new FormData();
//             // The third parameter is required for server

//             data.append('img', result, result.name);

//             const res = await axios.post('/api/image-upload', data, {
//               headers: {
//                 accept: 'application/json',
//                 'Accept-Language': 'en-US,en;q=0.8',
//                 'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
//               },
//             });

//             if (current && (image !== null || image !== '')) {
//               console.log('replacing image...');
//               deleteImage(image.split('/').pop());
//             }

//             setBlog({
//               ...blog,
//               image: res.data.location,
//             });
//           },
//           error(err) {
//             console.log(err.message);
//           },
//         });
//       } catch (err) {
//         if (err.response.status === 500) {
//           console.log('There was a problem with the server');
//         } else {
//           console.log(err.response.data.msg);
//         }
//       }
//     } else {
//       setBlog({
//         ...blog,
//         [e.target.name]: e.target.value, //changed it to accomodate file uploads
//       });
//     }
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     if (current === null) {
//       addBlog(blog);
//     } else {
//       updateBlog(blog);
//     }
//     clearAll();
//   };

//   const clearAll = () => {
//     clearCurrent();
//   };

//   return (
//     <div className='form-container-sp'>
//       <form
//         onSubmit={onSubmit}
//         // action='/upload'
//         // method='post'
//         // encType='multipart/form-data'
//       >
//         <h2 className='text-primary'>{current ? 'Edit Blog' : 'Add Blog'}</h2>
//         <input
//           type='text'
//           placeholder='Title'
//           name='title'
//           value={title}
//           onChange={onChange}
//         />
//         {/* <Editor placeholder={'Write something...'} /> */}
//         {/* <FileUpload></FileUpload> */}
//         {/* <input id='file-upload' type='file' onChange={onChange}></input> */}
//         <label htmlFor='file-upload' className='custom-file-upload'>
//           <i className='fas fa-cloud-upload-alt'></i> Upload image
//         </label>
//         <input
//           id='file-upload'
//           type='file'
//           accept='image/*'
//           name='photo'
//           onChange={onChange}
//         />
//         <input
//           type='text'
//           placeholder='imageURI'
//           name='image'
//           value={image}
//           onChange={onChange}
//         />
//         {/* https://codepen.io/vsync/pen/czgrf
//       dynamicly changing text area */}
//         <textarea
//           rows='3'
//           // columns='50'
//           id='detail'
//           placeholder='Detail'
//           name='detail'
//           value={detail}
//           onChange={onChange}
//           // onKeyDown={onKeydown}
//         ></textarea>
//         <input
//           type='text'
//           placeholder='Footer'
//           name='footer'
//           value={footer}
//           onChange={onChange}
//         />
//         <h5>Blog Type</h5>
//         <input
//           type='radio'
//           name='type'
//           value='private'
//           checked={type === 'private'}
//           onChange={onChange}
//         />{' '}
//         Private{' '}
//         <input
//           type='radio'
//           name='type'
//           value='public'
//           checked={type === 'public'}
//           onChange={onChange}
//         />{' '}
//         Public
//         <div>
//           <input
//             type='submit'
//             value={current ? 'Update Blog' : 'Add Blog'}
//             className='btn btn-primary btn-block'
//           />
//         </div>
//         {current && (
//           <div>
//             <button className='btn btn-light btn-block' onClick={clearAll}>
//               Clear
//             </button>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default BlogForm;
