'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carrera extends Model {

    static associate(models) {
      this.hasMany(models.Materia, {
        as:'materia',
        foreignKey:'carreraId'
      })

      this.belongsTo(models.User, {
        as:'director',
        foreignKey:'directorId'
      })

      this.belongsTo(models.Instituto, {
        as:'instituto',
        foreignKey:'institutoId'
      })

    }
  }
  Carrera.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Carrera',
  });
  return Carrera;
};