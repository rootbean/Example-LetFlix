'use strict';

var express = require('express');
var controller = require('./comment.controller');

var router = express.Router();

router.get('/show/:idShow', controller.findByIdShow);
router.post('/', controller.create);

module.exports = router;
//# sourceMappingURL=index.js.map
