const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/mi_blog");

    console.log("Conectado Correctamente a la DB mi_blod👌👌");
  } catch (error) {
    console.log(error);
    throw new Error("No se a conectado a la base de datos");
  }
};

module.exports = {
  connection,
};
