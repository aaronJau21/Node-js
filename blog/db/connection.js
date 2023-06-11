const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect("Credenciales");

    console.log("Conectado Correctamente a la DB mi_blod👌👌");
  } catch (error) {
    console.log(error);
    throw new Error("No se a conectado a la base de datos");
  }
};

module.exports = {
  connection,
};
