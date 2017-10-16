/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.Qualification = db.sequelize.import('../api/qualification/qualification.model');
db.FavoriteShow = db.sequelize.import('../api/favorite-show/favorite-show.model');
db.Comment = db.sequelize.import('../api/comment/comment.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

module.exports = db;
