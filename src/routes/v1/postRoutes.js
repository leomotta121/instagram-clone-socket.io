const express = require('express');
const router = express.Router();

const isAuth = require('../../services/isAuth');

const { index, store } = require('../../controllers/postController');

// GET /v1/post/index
router.get('/index', index);

// POST /v1/post/store
router.post('/store', store);

module.exports = router;
