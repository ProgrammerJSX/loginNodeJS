//authentication.controller.js

const Usuario = require('../models/usuario.js'); // Ajusta la ruta según la estructura de tu proyecto

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Cambia `jsonwebtoken` a `jwt` aquí si prefieres usar `jwt.sign`

const dotenv = require('dotenv');

//usaremos un array temporal mientras creamos la base de datos luego att johan

dotenv.config();

const usuarios = [{
   user: "jesucristo",
    email: "jesucristo@gmail.com",
    password: "$2a$05$mtTFi6OJRdeDkMvBHBfYr.iw5KS7WIYWLUxhCdnmF5dPCkw3nXoQ."
}]


async function login(req, res) {
    const { user, password } = req.body;
    try {
      const usuario = await Usuario.findOne({ where: { user } });
      if (!usuario) {
        return res.status(400).send({ message: "Usuario no encontrado." });
      }
  
      const validPassword = await bcrypt.compare(password, usuario.password);
      if (!validPassword) {
        return res.status(400).send({ message: "Contraseña incorrecta." });
      }
  
      // Generar el token JWT usando JWT_EXPIRATION de .env
      const token = jwt.sign(
        { userId: usuario.id, username: usuario.user },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION } // Utiliza el valor de .env para la expiración
      );
  
      // Configurar opciones de cookie
      const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly: true // La cookie solo es accesible por el servidor web
      };
  
      // Enviar cookie al cliente
      res.cookie('jwt', token, cookieOptions);
  
      res.send({ message: "Login exitoso." });
    } catch (error) {
      res.status(500).send({ message: "Error al intentar iniciar sesión.", error: error.message });
    }
  }
  
  
  

async function register(req, res) {
    const { user, email, password } = req.body;
    try {
      // Verificar si el usuario o email ya existen
      const userExists = await Usuario.findOne({ where: { user } });
      const emailExists = await Usuario.findOne({ where: { email } });
  
      if (userExists || emailExists) {
        return res.status(400).send({ message: "El usuario o correo ya están registrados." });
      }
  
      // Encriptar contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Crear nuevo usuario
      const newUser = await Usuario.create({
        user,
        email,
        password: hashedPassword
      });
  
      res.status(201).send({ message: "Usuario registrado exitosamente.", user: newUser });
    } catch (error) {
      res.status(500).send({ message: "Error al registrar usuario", error: error.message });
    }
  }
  

module.exports = {
    usuarios,
    login,
    register
  }