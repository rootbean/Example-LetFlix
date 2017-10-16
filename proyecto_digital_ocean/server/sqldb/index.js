/**
 * Sequelize initialization module
 */

'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _environment = require('../config/environment');

var _environment2 = _interopRequireDefault(_environment);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = {
    Sequelize: _sequelize2.default,
    sequelize: new _sequelize2.default(_environment2.default.sequelize.uri, _environment2.default.sequelize.options)
};

// Insert models below
db.Qualification = db.sequelize.import('../api/qualification/qualification.model');
db.FavoriteShow = db.sequelize.import('../api/favorite-show/favorite-show.model');
db.Comment = db.sequelize.import('../api/comment/comment.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');

(0, _keys2.default)(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

module.exports = db;
//# sourceMappingURL=index.js.map
