'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = setup;

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _sha = require('sha512');

var _sha2 = _interopRequireDefault(_sha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function localAuthenticate(User, email, password, done) {
  User.find({
    where: {
      email: email.toLowerCase()
    }
  }).then(function (user) {
    if (!user) {
      return done(null, false, {
        message: 'This email is not registered.'
      });
    }
    if (password) {
      if (user.password === (0, _sha2.default)(password).toString('hex')) {
        return done(null, user);
      } else {
        return done(null, false, {
          message: 'The password is incorrect!.'
        });
      }
    } else {
      return done(authError);
    }
  }).catch(function (err) {
    return done(err);
  });
}

function setup(User /*, config*/) {
  _passport2.default.use(new _passportLocal.Strategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  }, function (email, password, done) {
    return localAuthenticate(User, email, password, done);
  }));
}
//# sourceMappingURL=passport.js.map
