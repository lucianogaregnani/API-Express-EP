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
        as:'administrador',
        foreignKey:'adminId'
      })

      this.belongsTo(models.Instituto, {
        as:'instituto',
        foreignKey:'institutoId'
      })

    }
  }
  Carrera.init({
    nombre: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Carrera',
  });
  return Carrera;
};