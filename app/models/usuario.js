const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta la ruta según tu estructura de proyecto

class Usuario extends Model {}

Usuario.init({
  // Atributos del modelo
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  sequelize, // La instancia de Sequelize
  modelName: 'Usuario',
  tableName: 'usuarios', // Opcional: especifica el nombre de la tabla si es diferente del nombre del modelo
  timestamps: false // Si tu tabla no tiene campos `createdAt` y `updatedAt`
});

module.exports = Usuario;
