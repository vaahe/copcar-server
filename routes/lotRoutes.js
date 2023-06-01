const express = require('express');
const router = express.Router();

const { getLotImages } = require('../controllers/lotController');

router.get('/:id', getLotImages);

module.exports = router;