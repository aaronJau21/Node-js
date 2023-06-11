const validator = require("validator");
const Articulo = require("../models/Articles.js");

const prueba = (req, res) => {
  return res.status(200).json({
    msg: "Accion de prueba",
  });
};

const crear = (req, res) => {
  // Recoger parametros por POST
  let parametros = req.body;

  // Validar datos
  try {
    let titulo =
      !validator.isEmpty(parametros.titulo) &&
      validator.isLength(parametros.titulo, { min: 5 });
    let contenido = !validator.isEmpty(parametros.contenido);

    if (!titulo || !contenido) {
      throw new Error("No se a validado la informacion");
    }
    // Crear el objeto a guardar
    const articulo = new Articulo(parametros);

    // Asignar valores a objeto basado en el modelo
    articulo.save();

    // Devolver el resultado
    return res.status(200).json({
      status: "success",
      articulo: articulo,
      msg: "Articulo guardado",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "error",
      msg: "Falta datos por enviar",
    });
  }
};

const conseguirArticulos = (req, res) => {
  let consulta = Articulo.find({})
    .then((resp) => {
      if (resp.length === 0) {
        return res.status(400).json({
          status: "error",
          msg: "No se han encontrado artículos",
        });
      }

      return res.json({
        status: "success",
        data: resp,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        msg: "Error al obtener los artículos",
        error: err.message,
      });
    });
};

module.exports = {
  prueba,
  crear,
  conseguirArticulos,
};
