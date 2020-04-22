const express = require('express');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
// https://codeytek.com/file-or-image-uploads-on-amazon-web-services-aws-using-react-node-and-express-js-aws-sdk/
// const awsConfig = require('../config/aws-config');
// const config = require('config');

const router = express.Router();
const AWS_BUCKET = 'blogger-imageuploads';

/**
 * PROFILE IMAGE STORING STARTS
 */
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS,
  Bucket: AWS_BUCKET,
  region: 'us-east-1',
});

/**
 * Single Upload
 */
const profileImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWS_BUCKET,
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
  limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
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
  // console.log(process.env);
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
        const location = `https://${AWS_BUCKET}.s3.amazonaws.com/${key}`;
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
    Bucket: AWS_BUCKET,
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

/**
 * BUSINESS GALLERY IMAGES
 * MULTIPLE FILE UPLOADS
 */
// Multiple File Uploads ( max 4 )
const uploadsBusinessGallery = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWS_BUCKET,
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
  limits: { fileSize: 10000000 }, // In bytes: 2000000 bytes = 2 MB
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
