const express = require('express');
const multer = require('multer');
const uploadConfig = require('../../services/upload');
const router = express.Router();

const isAuth = require('../../services/isAuth');
const upload = multer(uploadConfig);

const { index, store, like } = require('../../controllers/postController');

// GET /v1/post/index
router.get('/index', index);

// POST /v1/post/store
router.post('/store', upload.single('image'), store);

// POST /v1/post/like/:id
router.post('/like/:id', like);

module.exports = router;
