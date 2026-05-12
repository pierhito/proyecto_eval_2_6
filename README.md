# Proyecto Evaluación 2.6 - Cheerio + Express

## Objetivo
Procesar un archivo HTML local usando Cheerio en backend con Node.js y Express.

## Instalación

```bash
npm install
```

## Ejecución

```bash
node server.js
```

## Endpoints

### Listar productos

```http
GET http://localhost:3000/api/catalogo/productos
```

### Estadísticas

```http
GET http://localhost:3000/api/catalogo/stats
```

Respuesta esperada:

```json
{
  "ok": true,
  "stats": {
    "total_productos": 3,
    "precio_minimo": 980,
    "precio_maximo": 2450,
    "precio_promedio": 1573.33
  }
}
```

### Buscar por categoría

```http
GET http://localhost:3000/api/catalogo/buscar?categoria=Lacteos
```

### Buscar sin parámetro

```http
GET http://localhost:3000/api/catalogo/buscar
```

Debe responder 400.

## Validación Tarea 2

Si Cheerio no encuentra elementos `.producto`, el sistema responde:

```json
{
  "ok": false,
  "error": "No se encontraron elementos .producto en el HTML"
}
```

con status HTTP 400.

Para probarlo, cambia temporalmente en `catalogo.html`:

```html
class="producto"
```

por:

```html
class="producto-inexistente"
```

Luego prueba cualquier endpoint, por ejemplo:

```http
GET http://localhost:3000/api/catalogo/productos
```

Después restaura `class="producto"`.

## Selectores usados

- `.producto`
- `.nombre`
- `.precio`
- `.categoria`
- `.stock`
- `data-id` con `.attr("data-id")`

## Git

```bash
git init
git add .
git commit -m "feat: proyecto evaluacion 2.6 adaptado sin mysql"
```

Para GitHub:

```bash
git branch -M main
git remote add origin URL_DEL_REPOSITORIO
git push -u origin main
```

## Nota
Esta versión adapta la Parte B a un proyecto sin MySQL. En vez de usar SQL y productoModel.js, calcula estadísticas y filtros desde los productos extraídos del HTML.
