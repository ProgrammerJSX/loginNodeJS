const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario'); // Asegúrate de que esta ruta sea correcta según tu estructura de proyecto

dotenv.config();

function soloAdmin(req, res, next) {
  revisarCookie(req).then(esValido => {
    if (esValido) {
      return next();
    }
    return res.redirect("/");
  }).catch(err => {
    console.error('Error al verificar la cookie:', err);
    return res.redirect("/");
  });
}

function soloPublico(req, res, next) {
  revisarCookie(req).then(esValido => {
    if (!esValido) {
      return next();
    }
    return res.redirect("/admin");
  }).catch(err => {
    console.error('Error al verificar la cookie:', err);
    return res.redirect("/admin");
  });
}

function revisarCookie(req) {
  return new Promise((resolve, reject) => {
    try {
      const cookie = req.headers.cookie;
      if (!cookie) {
        return resolve(false);
      }
      const cookieJWT = cookie
        .split('; ')
        .find(cookie => cookie.startsWith('jwt='))
        .slice(4); // Extrae el valor del JWT de la cookie
      const decodificada = jwt.verify(cookieJWT, process.env.JWT_SECRET); // Decodifica el JWT
      
      // Realiza una consulta a la base de datos
      Usuario.findOne({ where: { user: decodificada.user } })
        .then(usuario => {
          if (!usuario) {
            resolve(false);
          } else {
            resolve(true);
          }
        })
        .catch(err => {
          console.error('Error al buscar el usuario en la base de datos:', err);
          reject(err);
        });
    } catch (err) {
      console.error('Error al verificar la cookie:', err);
      resolve(false);
    }
  });
}

module.exports = {
  soloAdmin,
  soloPublico,
};
