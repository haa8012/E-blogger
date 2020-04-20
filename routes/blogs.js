const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// const upload = multer({ dest: __dirname + '/uploads/images' });

const User = require('../models/User');
const Blog = require('../models/Blog');

// @route     GET api/blogs/all
// @desc      Get all blogs
// @access    Public
router.get('/all', async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({
      date: -1,
    });
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/blogs
// @desc      Get all user's blogs
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/blogs
// @desc      Add new blogs
// @access    Private
router.post(
  '/',
  [auth, [check('title', 'Title is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, image, detail, footer, type } = req.body;

    try {
      const newBlog = new Blog({
        title,
        image,
        detail,
        footer,
        type,
        user: req.user.id,
      });

      const blog = await newBlog.save();

      res.json(blog);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     PUT api/blogs/:id
// @desc      Update blogs
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const { title, image, detail, footer, type } = req.body;

  // Build blog object
  const blogFields = {};
  if (title) blogFields.title = title;
  if (image) blogFields.image = image;
  if (detail) blogFields.detail = detail;
  if (footer) blogFields.footer = footer;
  if (type) blogFields.type = type;

  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ msg: 'blog not found' });

    // Make sure user owns blog
    if (blog.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: blogFields },
      { new: true }
    );

    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/blogs/:id
// @desc      Delete blog
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ msg: 'blog not found' });

    // Make sure user owns blog
    if (blog.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Blog.findByIdAndRemove(req.params.id);

    res.json({ msg: 'blog removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// // @route     Post api/blogs/:id
// // @desc      Post Blog Image
// // @access    Private
// router.post('/upload', [auth, upload.single('photo')], (req, res) => {
//   if (req.file) {
//     res.json(req.file);
//   } else throw 'error';
// });

module.exports = router;
