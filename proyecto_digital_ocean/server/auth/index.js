'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _environment = require('../config/environment');

var _environment2 = _interopRequireDefault(_environment);

var _sqldb = require('../sqldb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Passport Configuration
require('./local/passport').setup(_sqldb.User, _environment2.default);

var router = _express2.default.Router();

router.use('/local', require('./local').default);

exports.default = router;
//# sourceMappingURL=index.js.map
