'use strict';

var express = require('express');
var controller = require('./show.controller');

var router = express.Router();

router.get('/', controller.findAll);
router.get('/:id', controller.findById);

router.get('/byName/:query', controller.searchByShowName);

module.exports = router;
