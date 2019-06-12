const ApiError = require('../services/apiError');

const sharp = require('sharp');
const Post = require('../models/Post');

exports.index = async (req, res, next) => {
  const posts = await Post.find().sort('-createdAt');

  return res.json(posts);
};

exports.store = async (req, res, next) => {
  const { author, place, description, hashtags } = req.body;
  const { filename: image } = req.file;

  const post = await Post.create({
    author,
    place,
    description,
    hashtags,
    image
  });

  res.json(post);
};

exports.like = async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  post.likes += 1;

  await post.save();

  return res.json(post);
};
