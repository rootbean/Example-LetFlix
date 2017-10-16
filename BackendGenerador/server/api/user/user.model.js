'use strict';

import sha512 from 'sha512';

module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define('Users', {

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
      },
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

  User.associate = function(models){
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
  }

  return User;
}