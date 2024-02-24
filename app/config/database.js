//database.js

const { Sequelize } = require('sequelize');

// Nueva configuración de conexión para Sequelize con los detalles actualizados de la base de datos
const sequelize = new Sequelize('database01test', 'postgres', '1234567890', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
