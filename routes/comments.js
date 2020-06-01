const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// const upload = multer({ dest: __dirname + '/uploads/images' });

const User = require('../models/User');
const Blog = require('../models/Blog');
const Comment = require('../models/Comment');

// @route     GET api/comments
// @desc      Get all blog's comments
// @access    Public //Private
router.get('/:id', async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.id }).sort({
      date: -1,
    });
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/coments
// @desc      Add new comment
// @access    Private
router.post(
  '/',
  [auth, [check('content', 'Content is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content, id } = req.body;

    try {
      const newComment = new Comment({
        content,
        blog: id,
        user: req.user.id,
      });

      const comment = await newComment.save();

      res.json(comment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     PUT api/comments/:id
// @desc      Update comment
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const { content } = req.body;

  // Build comment object
  const commentFields = {};
  if (content) commentFields.content = content;

  try {
    let comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ msg: 'comment not found' });

    // Make sure user owns comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: commentFields },
      { new: true }
    );

    res.json(comment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/comments/:id
// @desc      Delete comment
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ msg: 'comment not found' });

    // Make sure user owns comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Comment.findByIdAndRemove(req.params.id);

    res.json({ msg: 'comment removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
