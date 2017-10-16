'use strict';

module.exports = function (sequelize, DataTypes) {
  var FavoriteShow = sequelize.define('FavoritesShows', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    show: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  FavoriteShow.associate = function (models) {
    //ManyToOne
    FavoriteShow.belongsTo(models.User, {
      onDelete: 'RESTRICT',
      foreignKey: {
        field: 'user',
        name: 'user',
        allowNull: false
      }
    });
  };

  return FavoriteShow;
};
//# sourceMappingURL=favorite-show.model.js.map
