'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Materia extends Model {

    static associate(models) {
      this.belongsTo(models.User, {
        as:'profesor',
        foreignKey:'profesorId'
      })

      this.belongsTo(models.Carrera, {
        as:'carrera',
        foreignKey:'carreraId'
      })

      this.belongsToMany(models.User, {
        as:'alumnos',
        through: models.Nota,
        foreignKey: 'materiaId'
      })

    }
  }
  Materia.init({
    nombre: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Materia',
  });
  return Materia;
};