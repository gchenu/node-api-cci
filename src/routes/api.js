const express = require('express');
const router = express.Router();

const dataController = require('../controllers/data.controller');

router.get('/data', dataController.getCountryData);

module.exports = router;