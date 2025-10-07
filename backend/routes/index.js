const express = require('express');
const router = express.Router();
const commentRoutes = require('./commentRoutes');
const downloadRoutes = require('./downloadRoutes');

router.use('/comments', commentRoutes);
router.use('/download', downloadRoutes);

module.exports = router;