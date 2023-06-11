const { Router } = require("express");
const { prueba, crear, conseguirArticulos } = require("../controllers/ArticuloController");

const router = Router();

// Rutas de prueba

router.get("/", prueba);
router.post("/crear", crear);
router.get("/articulos", conseguirArticulos);

module.exports = router;
