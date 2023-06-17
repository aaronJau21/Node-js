// Importaciones
const jwt = require("jsonwebtoken");
const moment = require("moment");

const libJWT = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
  if (!req.headers.authentication) {
    return res.status(403).json({
      status: "Error",
      msg: "La peticion no tiene la cabecera de autenticacion",
    });
  }

  let token = req.headers.authentication.replace(/['"]+/g, "");
  // let token = req.headers.authentication.split(" ")[1];

  try {
    let payload = jwt.verify(token, libJWT);
    //  console.log(payload.exp)

    if (moment().unix() >= payload.exp) {
      return res.status(401).send({ error: "Token expired" });
    }

    req.user = payload;
  } catch (error) {
    return res.status(404).json({
      status: "error",
      msg: "Token invalido",
      error,
    });
  }

  next();
};

module.exports = authMiddleware;
