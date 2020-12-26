'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Tower.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    floorCount: DataTypes.INTEGER,
    officeCount: DataTypes.INTEGER,
    rating: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tower',
  });
  return Tower;
};