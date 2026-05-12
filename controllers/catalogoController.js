const catalogoService = require("../services/catalogoService");

function responderError(res, error) {
    if (error.statusCode) {
        return res.status(error.statusCode).json({
            ok: false,
            error: error.message
        });
    }

    return res.status(500).json({
        ok: false,
        error: error.message
    });
}

function verProductos(req, res) {
    try {
        const productos = catalogoService.obtenerProductos();

        res.json({
            ok: true,
            total: productos.length,
            productos: productos
        });

    } catch (error) {
        responderError(res, error);
    }
}

function verStats(req, res) {
    try {
        const productos = catalogoService.obtenerProductos();
        const stats = catalogoService.obtenerStats(productos);

        res.json({
            ok: true,
            stats: stats
        });

    } catch (error) {
        responderError(res, error);
    }
}

function buscarProductos(req, res) {
    try {
        const categoria = req.query.categoria;

        if (!categoria || categoria.trim() === "") {
            return res.status(400).json({
                ok: false,
                error: "Debes indicar una categoria. Ejemplo: /buscar?categoria=Lacteos"
            });
        }

        const productos = catalogoService.obtenerProductos();
        const filtrados = catalogoService.buscarPorCategoria(productos, categoria);

        res.json({
            ok: true,
            categoria: categoria,
            total: filtrados.length,
            productos: filtrados
        });

    } catch (error) {
        responderError(res, error);
    }
}

module.exports = {
    verProductos,
    verStats,
    buscarProductos
};
