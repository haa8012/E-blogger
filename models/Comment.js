const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Blog',
  },
  content: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('comment', CommentSchema);
