'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instituto extends Model {
    static associate(models) {
      this.hasMany(models.Carrera, {
        as:'carrera',
        foreignKey:'institutoId'
      })

      this.belongsTo(models.User, {
        as:'director',
        foreignKey:'directorId'
      })
    }
  }
  Instituto.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Instituto',
  });
  return Instituto;
};