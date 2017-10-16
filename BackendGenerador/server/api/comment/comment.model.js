'use strict';

module.exports = function(sequelize, DataTypes) {
  let Comment = sequelize.define('Comments', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    registerDate: {
      type: DataTypes.DATE,
      defaulValue: new Date()
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaulValue: true
    },
    show: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Comment.associate = function(models){

    //ManyToOne
    Comment.belongsTo(models.User, {
      onDelete: 'RESTRICT',
      foreignKey: {
        field: 'user',
        name: 'user',
        allowNull: false
      }
    });

    Comment.belongsTo(models.Comment, {
      onDelete: 'RESTRICT',
      foreignKey: {
        field: 'replies',
        name: 'replies',
        allowNull: true
      }
    });

    //OneToMany
    Comment.hasMany(models.Comment, {
      as: 'repliesList',
      foreignKey: {
        field: 'replies',
        name: 'replies',
        allowNull: true
      }
    });    
  }

  return Comment;
}
