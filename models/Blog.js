const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  title: {
    type: String,
    require: true,
  },
  detail: {
    type: String,
    require: true,
  },
  footer: {
    type: String,
  },
  type: {
    type: String,
    default: 'private',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('blog', BlogSchema);
