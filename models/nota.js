'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nota extends Model {

  }
  Nota.init({
    primerParcial: DataTypes.INTEGER,
    segundoParcial: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Nota',
  });
  return Nota;
};