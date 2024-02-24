const express = require('express');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database'); // Asegúrate de que la ruta sea correcta basada en tu estructura de proyecto

// Intento de conexión para verificar que todo funcione correctamente con la nueva base de datos
sequelize.authenticate()
  .then(() => console.log('Conexión establecida con la base de datos.'))
  .catch(err => console.error('No se pudo conectar a la base de datos:', err));

const authentication = require('./controllers/authentication.controller.js');
const authorization = require('./middlewares/authorization.js');

// Server
const app = express();
app.set("port", 4000);

// Iniciamos el servidor
app.listen(app.get("port"), () => {
  console.log("Servidor corriendo en puerto", app.get("port"));
});

// Configuración
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieParser());

// Rutas
app.get("/", authorization.soloPublico, (req, res) => res.sendFile(__dirname + "/pages/login.html"));
app.get("/register", authorization.soloPublico, (req, res) => res.sendFile(__dirname + "/pages/register.html"));
app.get("/admin", authorization.soloAdmin, (req, res) => res.sendFile(__dirname + "/pages/admin/admin.html"));
app.post("/api/register", authentication.register);
app.post("/api/login", authentication.login);
