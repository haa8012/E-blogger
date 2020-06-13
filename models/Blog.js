const mongoose = require('mongoose');
const imageSchema = mongoose.Schema({ image: String });
const BlogSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  title: {
    type: String,
    required: false,
  },
  detail: {
    type: String,
    required: false,
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
  blogContent: {
    type: String,
    required: false,
  },
  // images: [imageSchema],
});

module.exports = mongoose.model('blog', BlogSchema);
