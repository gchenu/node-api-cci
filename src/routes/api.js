const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();

router.use(auth);
const dataController = require('../controllers/data.controller');

router.get('/data', dataController.getCountryData);

module.exports = router;