const express = require("express");
const cors = require("cors");

const { connection } = require("./db/connection.js");
const rutas_articulo = require("./routes/ArticuloRouter.js");

// Conexion a la DB
connection();

// Servidor de Node
const app = express();
const port = 3900;

// Configurar cors
app.use(cors());

// Convertir body a obj js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rutas
app.use("/api/v1/blog", rutas_articulo);

app.listen(port, () => {
  console.log(`Servidor corriendo desde ${port}`);
});
