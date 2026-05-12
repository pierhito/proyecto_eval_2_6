const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

function crearError(mensaje, statusCode) {
    const error = new Error(mensaje);
    error.statusCode = statusCode;
    return error;
}

function obtenerProductos() {
    const rutaArchivo = path.join(__dirname, "..", "catalogos", "catalogo.html");

    if (!fs.existsSync(rutaArchivo)) {
        throw crearError("No existe el archivo catalogo.html", 404);
    }

    const html = fs.readFileSync(rutaArchivo, "utf8");

    if (!html.trim()) {
        throw crearError("El archivo HTML está vacío", 400);
    }

    const $ = cheerio.load(html);

    if ($(".producto").length === 0) {
        throw crearError("No se encontraron elementos .producto en el HTML", 400);
    }

    let productos = [];

    $(".producto").each(function () {
        let id = $(this).attr("data-id");
        let nombre = $(this).find(".nombre").text().trim();
        let precio = $(this).find(".precio").text().trim();
        let categoria = $(this).find(".categoria").text().trim();
        let stock = $(this).find(".stock").text().trim();

        productos.push({
            id: Number(id),
            nombre: nombre,
            precio: Number(precio),
            categoria: categoria,
            stock: Number(stock)
        });
    });

    return productos;
}

function obtenerStats(productos) {
    const precios = productos.map(producto => producto.precio);

    const total_productos = productos.length;
    const precio_minimo = Math.min(...precios);
    const precio_maximo = Math.max(...precios);

    const suma = precios.reduce(function (acumulador, precio) {
        return acumulador + precio;
    }, 0);

    const precio_promedio = Number((suma / total_productos).toFixed(2));

    return {
        total_productos: total_productos,
        precio_minimo: precio_minimo,
        precio_maximo: precio_maximo,
        precio_promedio: precio_promedio
    };
}

function buscarPorCategoria(productos, categoria) {
    const categoriaBuscada = categoria.trim().toLowerCase();

    const filtrados = productos.filter(function (producto) {
        return producto.categoria.toLowerCase() === categoriaBuscada;
    });

    return filtrados;
}

module.exports = {
    obtenerProductos,
    obtenerStats,
    buscarPorCategoria
};
