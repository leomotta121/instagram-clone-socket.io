const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../../services/passport')(passport);

const postRoutes = require('./postRoutes');

router.use('/post', postRoutes);

module.exports = router;
