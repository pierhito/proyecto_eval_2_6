const express = require("express");
const router = express.Router();

const Ctrl = require("../controllers/catalogoController");

router.get("/productos", Ctrl.verProductos);
router.get("/stats", Ctrl.verStats);
router.get("/buscar", Ctrl.buscarProductos);
router.get("/scrape", Ctrl.verProductos);

module.exports = router;
