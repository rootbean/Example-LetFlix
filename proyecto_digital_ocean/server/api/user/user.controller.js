'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.create = create;
exports.show = show;

var _sha = require('sha512');

var _sha2 = _interopRequireDefault(_sha);

var _sqldb = require('../../sqldb');

var _environment = require('../../config/environment');

var _environment2 = _interopRequireDefault(_environment);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get list of users
 * restriction: 'admin'
 */
function index(req, res) {
  return _sqldb.User.findAll().then(function (users) {
    res.status(200).json(users);
  }).catch(function (err) {
    res.status(500).send(err);
  });
}

/**
 * Creates a new user
 */
function create(req, res) {

  var data = req.body;
  data.password = (0, _sha2.default)(req.body.password).toString('hex');
  return _sqldb.User.create(data).then(function (user) {
    return res.status(201).json('Created user!');
  }).catch(function (err) {
    res.status(500).send(err);
  });
}

/**
 * Get a single user
 */
function show(req, res, next) {
  var userId = req.params.id;

  return _sqldb.User.find({
    where: { id: userId },
    include: [{ model: _sqldb.FavoriteShow, as: 'favoritesShows' }]
  }).then(function (user) {
    if (!user) return res.status(404).end();

    res.json(user);
  }).catch(function (err) {
    return next(err);
  });
}
//# sourceMappingURL=user.controller.js.map
