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
        as:'administrador',
        foreignKey:'adminId'
      })
    }
  }
  Instituto.init({
    nombre: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Instituto',
  });
  return Instituto;
};