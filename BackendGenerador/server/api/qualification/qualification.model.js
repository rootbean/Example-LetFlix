'use strict';

module.exports = function(sequelize, DataTypes) {
  let Qualification = sequelize.define('Qualifications', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    value: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    show: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Qualification.associate = function(models){
    //ManyToOne
    Qualification.belongsTo(models.User, {
      onDelete: 'RESTRICT',
      foreignKey: {
        field: 'user',
        name: 'user',
        allowNull: false
      }
    });
  }

  return Qualification;
}
