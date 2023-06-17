const { Router } = require("express");
const { prueba, crear, conseguirArticulos, uno, borrar } = require("../controllers/ArticuloController");

const router = Router();

// Rutas de prueba

router.get("/", prueba);
router.post("/crear", crear);
router.get("/articulos/:ultimos?", conseguirArticulos);
router.get("/articulo/:id", uno);
router.delete('/articulo/:id', borrar)

module.exports = router;
