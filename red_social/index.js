// Importaciones
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db/connection.js");
const userRoutes = require("./routes/UserRouter.js");

// Conexion a la base de datos
db();

// Crear servirdor node
const app = express();
const port = process.env.PORT || 3900;

// Cors
app.use(cors());

// datos del body a obj js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rutas
app.use("/api/v1/user", userRoutes);

// Escuchar servidor
app.listen(port, () => {
  console.log(`Corriendo desde express en el puerto: ${port}`);
});
