'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuthenticated = isAuthenticated;
exports.signToken = signToken;

var _environment = require('../config/environment');

var _environment2 = _interopRequireDefault(_environment);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _composableMiddleware = require('composable-middleware');

var _composableMiddleware2 = _interopRequireDefault(_composableMiddleware);

var _sqldb = require('../sqldb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateJwt = (0, _expressJwt2.default)({
  secret: _environment2.default.secrets.session
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return (0, _composableMiddleware2.default)()
  // Validate jwt
  .use(function (req, res, next) {
    // allow access_token to be passed through query parameter as well
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = 'Bearer ' + req.query.access_token;
    }
    // IE11 forgets to set Authorization header sometimes. Pull from cookie instead.
    if (req.query && typeof req.headers.authorization === 'undefined') {
      req.headers.authorization = 'Bearer ' + req.cookies.token;
    }
    validateJwt(req, res, next);
  })
  // Attach user to request
  .use(function (req, res, next) {
    _sqldb.User.find({
      where: {
        id: req.user.id
      }
    }).then(function (user) {
      if (!user) {
        return res.status(401).end();
      }
      req.user = user;
      next();
    }).catch(function (err) {
      return next(err);
    });
  });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id, alias) {
  return _jsonwebtoken2.default.sign({ id: id, alias: alias }, _environment2.default.secrets.session, {
    expiresIn: 60 * 60 * 5
  });
}
//# sourceMappingURL=auth.service.js.map
