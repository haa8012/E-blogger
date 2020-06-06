const express = require('express');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const imagemin = require('imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const sharp = require('sharp');
const isJpg = require('is-jpg');
const fs = require('fs');

// https://codeytek.com/file-or-image-uploads-on-amazon-web-services-aws-using-react-node-and-express-js-aws-sdk/
//https://www.udemy.com/course/mern-react-node-aws/
// const awsConfig = require('../config/aws-config');
// const config = require('config');

const router = express.Router();

/**
 * PROFILE IMAGE STORING STARTS
 */
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS,
  Bucket: process.env.AWS_BUCKET,
  region: 'us-east-1',
});

/**
 * Single Upload
 */
// const profileImgUpload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: AWS_BUCKET,
//     acl: 'public-read',
//     key: (req, file, cb) => {
//       cb(
//         null,
//         path.basename(file.originalname, path.extname(file.originalname)) +
//           '-' +
//           Date.now() +
//           path.extname(file.originalname)
//       );
//     },
//   }),
//   limits: { fileSize: 10000000 }, // In bytes: 2000000 bytes = 2 MB
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// }).single('img');

/**
 * Single Upload with image resize
 */
const profileImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    acl: 'public-read',
    limits: { fileSize: 20000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
    key: (req, file, cb) => {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          '-original-' +
          Date.now() +
          path.extname(file.originalname)
      );
    },
    // shouldTransform: function (req, file, cb) {
    //   cb(null, /^image/i.test(file.mimetype));
    // },
    // transforms: [
    //   {
    //     id: 'original',
    //     key: (req, file, cb) => {
    //       cb(
    //         null,
    //         path.basename(file.originalname, path.extname(file.originalname)) +
    //           '-original-' +
    //           Date.now() +
    //           path.extname(file.originalname)
    //       );
    //     },
    //     transform: function (req, file, cb) {
    //       cb(null, sharp().resize(700, null).toFormat('jpeg'));
    //     },
    //   },
    //   {
    //     id: 'thumbnail',
    //     key: (req, file, cb) => {
    //       cb(
    //         null,
    //         path.basename(file.originalname, path.extname(file.originalname)) +
    //           '-thumbnail-' +
    //           Date.now() +
    //           path.extname(file.originalname)
    //       );
    //     },
    //     transform: function (req, file, cb) {
    //       cb(null, sharp().resize(100, 100).toFormat('jpeg'));
    //     },
    //   },
    // ],
  }),
}).single('img');

/**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

/**
 * @route POST /api/profile/business-img-upload
 * @desc Upload post image
 * @access public
 */
router.post('/image-upload', auth, (req, res) => {
  // if (req.file.size > 500000) {
  //   sharp;
  // }

  // console.log('file uploaded: ', req.file);
  // sharp(req.file).toBuffer((err, data, info) => {
  //   console.log(data);
  //   uploadBuffer(data);
  // });
  // const img = imgToBuffer(req.file);

  profileImgUpload(req, res, (error) => {
    console.log('requestOkokok', req.file);

    if (error) {
      console.log('errors', error);
      res.json({ error: error });
    } else {
      // If File not found
      if (req.file === undefined) {
        console.log('Error: No File Selected!');
        res.json('Error: No File Selected');
      } else {
        // If Success
        // const { key, location } = req.file;
        const { key } = req.file;
        const location = `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${key}`;
        res.json({
          key,
          location,
        });
      }
    }
  });
});

router.delete('/image-upload/:key', auth, async (req, res) => {
  const deleteParam = {
    Bucket: process.env.AWS_BUCKET,
    Delete: {
      Objects: [{ Key: req.params.key }],
    },
  };
  try {
    s3.deleteObjects(deleteParam, function (err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        res.json({ status: 'success!', data });
        console.log('delete', data);
      }
    });
  } catch (err) {
    console.log(err, err.stack);
  }
});

//////////////////////////////////////////////
//
//////////////////////////////////////////////
const imgToBuffer = (uploadedImage) => {
  try {
    img = fs.readFileSync(uploadedImage);
    let str = img.toString('base64');
    return Buffer.from(str, 'base64');
  } catch (err) {
    console.log(err);
  }
};

const convertToJpg = async (input) => {
  if (isJpg(input)) {
    return input;
  }

  return sharp(input).jpeg().toBuffer();
};

const uploadBuffer = async (buffer) => {
  const miniBuffer = await imagemin.buffer(buffer, {
    plugins: [convertToJpg, mozjpeg({ quality: 85 })],
  });

  const Key = 'phot.jpg';

  await s3
    .upload({
      Bucket: process.env.AWS_BUCKET,
      Key,
      Body: miniBuffer,
    })
    .promise();
  console.log('uploaded to s3...');
  return Key;
};

//////////////////////////////////////////////
//
//////////////////////////////////////////////
/**
 * BUSINESS GALLERY IMAGES
 * MULTIPLE FILE UPLOADS
 */
// Multiple File Uploads ( max 4 )
const uploadsBusinessGallery = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          '-' +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: { fileSize: 200000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array('imgs', 4);
/**
 * @route POST /api/profile/multiple-file-upload
 * @desc Upload business Gallery images
 * @access public
 */
router.post('/multiple-file-upload', auth, (req, res) => {
  uploadsBusinessGallery(req, res, (error) => {
    console.log('files', req.files);
    if (error) {
      console.log('errors', error);
      res.json({ error: error });
    } else {
      // If File not found
      if (req.files === undefined) {
        console.log('Error: No File Selected!');
        res.json('Error: No File Selected');
      } else {
        // If Success
        let fileArray = req.files,
          fileLocation;
        const galleryImgLocationArray = [];
        for (let i = 0; i < fileArray.length; i++) {
          fileLocation = fileArray[i].location;
          console.log('filenm', fileLocation);
          galleryImgLocationArray.push(fileLocation);
        }
        // Save the file name into database
        res.json({
          filesArray: fileArray,
          locationArray: galleryImgLocationArray,
        });
      }
    }
  });
});

module.exports = router;
