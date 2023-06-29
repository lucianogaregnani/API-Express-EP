'use strict';
const bcrypt = require('bcryptjs')

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    async comparePassword(candidatePassword) {
      return await bcrypt.compare(candidatePassword, this.password)
    }

    static associate(models) {

      this.hasOne(models.Materia, {
        as:'materia',
        foreignKey:'profesorId'
      })

      this.hasOne(models.Carrera, {
        as:'carrera',
        foreignKey:'adminId'
      })

      this.belongsToMany(models.Materia, {
        through: models.Nota,
        foreignKey: 'alumnoId'
      })

      this.hasOne(models.Instituto, {
        as:'instituto',
        foreignKey:'adminId'
      })

    }

  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        try {
          let salt = bcrypt.genSaltSync(10);
          user.password = bcrypt.hashSync(user.password, salt);
        }
        catch(err) {
          throw new Error('Fallo el hash')
        }
      }
    },
    sequelize,
    modelName: 'User',
  });

  return User;
};