const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/catalogo", require("./routes/catalogoRoutes"));

const PUERTO = 3000;

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
    console.log("GET http://localhost:3000/api/catalogo/productos");
    console.log("GET http://localhost:3000/api/catalogo/stats");
    console.log("GET http://localhost:3000/api/catalogo/buscar?categoria=Lacteos");
});
