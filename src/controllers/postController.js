const ApiError = require('../services/apiError');

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const Post = require('../models/Post');

exports.index = async (req, res, next) => {
  const posts = await Post.find().sort('-createdAt');

  return res.json(posts);
};

exports.store = async (req, res, next) => {
  const { author, place, description, hashtags } = req.body;
  const { filename: image } = req.file;

  const [name] = image.split('.');
  const fileName = `${name}.jpg`;

  await sharp(req.file.path)
    .resize(500)
    .jpeg({ quality: 70 })
    .toFile(path.resolve(req.file.destination, 'resized', fileName));

  fs.unlinkSync(req.file.path);

  const post = await Post.create({
    author,
    place,
    description,
    hashtags,
    image: fileName
  });

  req.io.emit('post', post);

  res.json(post);
};

exports.like = async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  post.likes += 1;

  await post.save();

  req.io.emit('like', post);

  return res.json(post);
};
