import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import PropTypes from 'prop-types';
import ImageUploader from 'quill-image-uploader';
import Compressor from 'compressorjs';
import axios from 'axios';

// #2 register module
Quill.register('modules/imageUploader', ImageUploader);

function Editor(props) {
  const [content, setContent] = useState({ editorHtml: '', theme: 'snow' });

  const { editorHtml, theme } = content;

  const handleChange = (html) => {
    setContent({ ...content, editorHtml: html });
  };

  const handleThemeChange = (newTheme) => {
    if (newTheme === 'core') newTheme = null;
    setContent({ ...content, theme: newTheme });
  };

  return (
    <div>
      <ReactQuill
        theme={theme}
        onChange={handleChange}
        value={editorHtml}
        modules={Editor.modules}
        formats={Editor.formats}
        bounds={'.app'}
        placeholder={props.placeholder}
      />
    </div>
  );
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
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

      ////////////////////////////////////////////////////
      /// Original Code - Public API
      ////////////////////////////////////////////////////
      // return new Promise((resolve, reject) => {

      //   const formData = new FormData();
      //   formData.append('image', file);

      //   fetch(
      //     'https://api.imgbb.com/1/upload?key=d36eb6591370ae7f9089d85875e56b22',
      //     {
      //       method: 'POST',
      //       body: formData,
      //     }

      //   )
      //     .then((response) => response.json())
      //     .then((result) => {
      //       console.log(result);
      //       resolve(result.data.url);
      //     })
      //     .catch((error) => {
      //       reject('Upload failed');
      //       console.error('Error:', error);
      //     });
      // });
    },
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
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
Editor.propTypes = {
  placeholder: PropTypes.string,
};

export default Editor;
