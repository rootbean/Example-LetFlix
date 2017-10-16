'use strict';

var _sha = require('sha512');

var _sha2 = _interopRequireDefault(_sha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('Users', {

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    alias: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: {
        msg: 'The specified alias is already in use.'
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'The specified email address is already in use.'
      },
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    registerDate: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  });

  User.associate = function (models) {
    //OneToMany
    User.hasMany(models.Comment, {
      as: 'comments',
      foreignKey: {
        field: 'user',
        name: 'user',
        allowNull: false
      }
    });

    User.hasMany(models.FavoriteShow, {
      as: 'favoritesShows',
      foreignKey: {
        field: 'user',
        name: 'user',
        allowNull: false
      }
    });

    User.hasMany(models.Qualification, {
      as: 'qualifications',
      foreignKey: {
        field: 'user',
        name: 'user',
        allowNull: false
      }
    });
  };

  return User;
};
//# sourceMappingURL=user.model.js.map
