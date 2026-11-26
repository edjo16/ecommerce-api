# API de comercio electrónico — README de instalación, pruebas, CI y evidencias

**Universidad Tecnológica de Panamá · Asignación N.º 1: Suite automatizada de pruebas de software**

Este único README integra las instrucciones y reglas funcionales originales de la API con la guía de reproducibilidad de la suite de pruebas, el pipeline de integración continua, el análisis estático, las corridas de mutación y el índice de evidencias. Las reglas originales se conservan: una prueba que las incumpla representa un hallazgo, no una razón para cambiar la especificación.

## Estado de la entrega

| Elemento | Valor |
| --- | --- |
| Repositorio | https://github.com/edjo16/ecommerce-api |
| Rama de trabajo y entrega | `task3-lint-triage-fuzz` |
| Pull request | `master ← task3-lint-triage-fuzz`, **sin fusionar** (enlace: https://github.com/edjo16/ecommerce-api/pull/new/task3-lint-triage-fuzz) |
| Commit de código verificado en CI | `1e928eb` |
| Corrida verde del commit de código | https://github.com/edjo16/ecommerce-api/actions/runs/45745868188 (ESLint ✅, Jest ✅) |
| Índice de evidencias | [`reports/INDICE-EVIDENCIAS.md`](reports/INDICE-EVIDENCIAS.md) |
| Informe final en PDF | [`reports/informe-final-calidad.pdf`](reports/informe-final-calidad.pdf) |

## Entorno utilizado

| Componente | Versión / configuración |
| --- | --- |
| Node.js (local) | `v22.12.0` (Windows) |
| Node.js (CI) | `22` con `actions/setup-node@v4`, runner `ubuntu-latest` |
| npm | `10.x` |
| Jest | `^29.7.0` |
| Supertest | `^7.0.0` |
| Stryker | `@stryker-mutator/core` y `jest-runner` `^8.6.0` |
| ESLint | `^9.16.0` con `@eslint/js` (`eslint:recommended`) |
| Persistencia | Sequelize `^6.37.5` + SQLite (`sqlite3`) |
| Archivo de bloqueo | `package-lock.json` presente |

Las versiones corresponden al entorno utilizado para obtener las evidencias, no a una prueba de compatibilidad universal.

## Instalación

Deben tener `npm` instalado. Para eso, sigan las indicaciones en la siguiente página: [Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

1. Instalar las dependencias (copia limpia, recomendado porque usa el archivo de bloqueo):

```bash
npm ci
```

En PowerShell (Windows), usar `npm.cmd` para evitar bloqueos de `npm.ps1`:

```powershell
npm.cmd ci
```

Si prefieren una instalación local sin archivo de bloqueo, `npm install` también funciona.

**SQLite:** la dependencia `sqlite3` contiene componentes nativos. Si falla la instalación, comprobar primero la versión de Node.js y la salida del error.

2. Levantar el servidor:

```bash
npm start
```

Este comando crea la base de datos en SQLite (`db.sqlite`) y todas las tablas necesarias.

## Levantar el servidor

El servidor escucha en el puerto 3000:

```bash
curl http://localhost:3000/products
```

Si no tienen `curl`, pueden usar [Postman](https://www.postman.com/) o [Insomnia](https://insomnia.rest/).

## Rutas canónicas

El servidor monta los routers sin el prefijo `/api/v1`:

| Recurso | Rutas principales |
| --- | --- |
| Productos | `GET /products`, `POST /products`, `GET /products/category/:categoryId` |
| Categorías | `GET /categories`, `POST /categories` |
| Carrito | `POST /cart/:userId`, `POST /cart/:cartId/items`, `GET /cart/:cartId/items`, `POST /cart/:cartId/checkout`, `GET /cart/:cartId/order` |

Algunas pruebas construyen una aplicación Express aislada y montan el mismo router bajo `/api/products` o `/api/carts`. Ese prefijo pertenece al arnés de la prueba; no es la URL del servidor levantado con `npm start`.

## Reglas

Estas reglas son la especificación del carrito y del cobro. Si una respuesta del servidor no las cumple, esa diferencia es un hallazgo: no se reescribe la regla para que coincida con el código.

### Alta de un ítem

`CartService.addItemToCart(cartId, productId, quantity)` agrega la cantidad solo cuando el producto existe y `quantity` es un entero mayor que cero que no supera el inventario. Si el producto ya está en el carrito, la cantidad nueva es la suma, y esa suma tampoco puede superar el inventario.

### Ítem y carrito de la URL

El ítem que se actualiza con `PUT /cart/:cartId/items/:itemId`, o se elimina con `DELETE /cart/:cartId/items/:itemId`, pertenece al carrito indicado en la URL.

### Total al consultar el carrito

`GET /cart/:cartId/items` usa el precio y el `taxRate` vigentes del producto:

- subtotal de línea = cantidad × precio
- impuesto de línea = subtotal de línea × `taxRate`
- `summary.subtotal` = suma de los subtotales de línea
- `summary.totalTax` = suma de los impuestos de línea
- `summary.total` = `summary.subtotal` + `summary.totalTax`

Esa consulta no aplica cupón ni envío. No es el total cobrado.

### Cobro

`POST /cart/:cartId/checkout`. El cupón es opcional:

```json
{ "coupon": { "type": "percent", "value": 0.1, "minSubtotal": 50 } }
```

`type` es `percent` o `fixed`. Solo se acepta un cupón: si `coupon` es un arreglo, el cobro se rechaza. El umbral de envío es 50 y la tarifa es 5. Esos valores no viajan en el cuerpo; si el cliente los envía, no se usan. Están en `services/pricing.js` (`SHIPPING_THRESHOLD` y `SHIPPING_FEE`). `priceCheckout(items, coupon)` es pura: no toca la base de datos. Cada ítem es `{ quantity, unitPrice, taxRate }`.

El cobro se rechaza, sin modificar el inventario, cuando ocurre cualquiera de estas condiciones:

- el carrito no existe
- el id de carrito no es numérico
- el carrito no tiene ítems
- el carrito ya fue cobrado
- alguna cantidad no es un entero mayor que cero
- el inventario de algún producto es menor que la cantidad de esa línea
- el precio es negativo, o `taxRate` no está entre 0 y 1
- el cupón no cumple lo de abajo

Cupón:

- `percent`: `value` es una fracción mayor que 0 y a lo sumo 1 (`0.1` es 10 %). Exige `minSubtotal` mayor o igual que 0. Si el subtotal es menor que ese mínimo, el cobro se rechaza. Si es igual, el cupón aplica.
- `fixed`: `value` es un monto mayor que 0. Se redondea al centavo y después se compara con el subtotal. Si lo supera, el cobro se rechaza. Si es igual, la base queda en 0.
- No se acumulan. Un cupón `fixed` no consulta `minSubtotal`.

El cálculo, en este orden:

1. El precio unitario se redondea al centavo más cercano. Si el centavo cae exactamente a la mitad, se redondea alejándose de cero. `price` y `taxRate` se guardan como FLOAT: un decimal que el binario no representa puede entrar al cálculo ya distinto del valor escrito.
2. El subtotal de línea es ese precio por la cantidad. El subtotal del pedido es la suma de las líneas.
3. El descuento se calcula sobre ese subtotal.
4. El descuento se reparte en el orden de las líneas, en proporción al subtotal de cada una, redondeado al centavo y sin pasar del descuento que todavía no se ha repartido. La última línea recibe el resto. Cada descuento de línea queda entre 0 y el subtotal de esa línea, y la suma es el descuento del pedido.
5. El impuesto de cada línea es (subtotal de línea − descuento de línea) × `taxRate`, redondeado al centavo. El impuesto del pedido es la suma. El impuesto va después del descuento.
6. La base es subtotal − descuento. Si la base es mayor o igual que 50, el envío es 0. Si es menor, el envío es 5.
7. El total es base + impuesto + envío.

La respuesta y `GET /cart/:cartId/order` expresan los montos en unidades, no en centavos. `priceCheckout` devuelve esos mismos montos y también los enteros en centavos (`subtotalCents`, `discountCents`, `taxableCents`, `taxCents`, `shippingCents`, `totalCents`, y los equivalentes en cada línea).

El pedido guarda el resultado. Un cambio posterior del precio no lo modifica. El carrito pasa a `checked_out` y un segundo cobro se rechaza. El inventario de cada producto baja en la cantidad de su línea. Si una línea no alcanza, no se descuenta ninguna. Dos cobros simultáneos pueden leer el mismo inventario antes de grabar y descontar de menos.

`POST`, `PUT` y `DELETE` de ítems no consultan `checked_out`. `addItemToCart` tampoco. Un ítem agregado después del cobro no entra en el pedido. `GET /cart/:cartId/items` sigue calculando con el precio vigente.

`GET /cart/:cartId/order` devuelve el pedido. Si el carrito no existe, o todavía no hay pedido, responde 404.

El cuerpo de un cobro sin cupón, de dos unidades a 100 con `taxRate` 0.07, tiene `subtotal` 200, `discount` 0, `taxable` 200, `tax` 14, `shipping` 0 y `total` 214. Con una unidad a 40 y `taxRate` 0, el envío es 5 y el total es 45. Con una unidad a 50 y `taxRate` 0, el envío es 0 y el total es 50.

### Texto de los errores

El JSON es `{ "error": "<texto>" }`.

| Situación | Estado | Texto |
| --- | --- | --- |
| Carrito inexistente | 404 | `Cart doesn't exist` |
| Id de carrito no numérico | 400 | `Cart ID should be a number` |
| Carrito sin ítems | 400 | `Cart is empty` |
| Carrito ya cobrado | 400 | `Cart already checked out` |
| Cantidad que no es un entero mayor que cero | 400 | `Quantity must be a positive integer` |
| Inventario insuficiente | 400 | `Not enough inventory available` |
| Producto de la línea inexistente | 400 | `Product not found` |
| Precio negativo | 400 | `Price must be zero or greater` |
| `taxRate` fuera de 0 a 1 | 400 | `Tax rate must be between 0 and 1` |
| `coupon` es un arreglo u otro valor que no es objeto | 400 | `Only one coupon is allowed` |
| `type` distinto de `percent` y de `fixed` | 400 | `Coupon type must be percent or fixed` |
| `value` que no es un número mayor que cero | 400 | `Coupon value must be greater than zero` |
| Porcentaje mayor que 1 | 400 | `Percent coupon cannot exceed 1` |
| Porcentaje sin mínimo válido | 400 | `Percent coupon requires a minimum subtotal` |
| Subtotal por debajo del mínimo | 400 | `Coupon minimum not met` |
| Monto fijo mayor que el subtotal | 400 | `Coupon exceeds subtotal` |
| Pedido todavía no creado | 404 | `Order not found` |

## Pruebas

### Comandos

Desde la raíz del proyecto:

```powershell
$env:NODE_ENV = 'test'
npm.cmd test
```

En Linux o macOS:

```bash
NODE_ENV=test npm test
```

**Advertencia:** `NODE_ENV=test` es obligatorio. Las pruebas de rutas llaman a `sequelize.sync({ force: true })`; sin esa variable, Sequelize usa `./db.sqlite` y se borrarían sus tablas. Con `NODE_ENV=test`, la base es SQLite **en memoria** (`models/index.js`). El pipeline de CI define la misma variable en el job `test`.

Para ejecutar en serie, como en la evidencia académica:

```powershell
$env:NODE_ENV = 'test'
npm.cmd test -- --runInBand
```

### Resultado actual

Último resultado en el commit de código (`1e928eb`):

- **9 suites** y **125 pruebas**, todas en PASS.
- De esas 125, **2 son `it.failing`** (CP-05 y CP-06). Documentan los defectos H-01 y H-02 y pasan porque el defecto sigue presente. Si el servicio se corrige, la prueba fallará y debe cambiarse a `it`.

Hallazgos de la evidencia académica:

| Hallazgo | Caso | Entrada | Resultado observado bajo mocks | Resultado esperado | Estado en la suite |
| --- | --- | --- | --- | --- | --- |
| H-01 | CP-05 | Cantidad `0` | La promesa se resolvió | Debía rechazarse | `it.failing` (documenta el defecto) |
| H-02 | CP-06 | Cantidad `-1` | La promesa se resolvió | Debía rechazarse | `it.failing` (documenta el defecto) |

Los hallazgos provienen de pruebas unitarias con mocks; no prueban una inserción real de esas cantidades en SQLite.

### Alcance de la suite automatizada

La entrega académica documenta **22 casos CP-01 a CP-22** para servicios de carrito y productos, incluyendo clases válidas, inválidas y límites. Se utilizan **Jest** para las aserciones y **Supertest** para algunas pruebas de rutas HTTP.

| Archivo | Pruebas | Propósito |
| --- | ---: | --- |
| `tests/services/cartService.test.js` | en el resto | CP-02 a CP-09, CP-19 a CP-22 (carrito; CP-05 y CP-06 como `it.failing`) |
| `tests/services/productService.test.js` | en el resto | CP-10 a CP-18 (productos y categorías) |
| `tests/routes/*.test.js` | en el resto | Rutas de carrito, productos y categorías con Supertest |
| `tests/services/pricing.test.js` | 38 | Suite propia de `services/pricing.js` (mutación) |
| `tests/services/pricing.fuzz.test.js` | 4 | Prueba de propiedades (fuzz) de `priceCheckout` |
| `tests/ai-generated/pricing.ai-original.test.js` | 15 | Pruebas generadas por IA sin editar (comparación) |
| `tests/ai-generated/pricing.ai-reviewed.test.js` | 34 | Pruebas generadas por IA tras revisión (comparación) |

Las pruebas de `tests/ai-generated/` se conservan separadas porque son el insumo de la comparación con IA. Jest las ejecuta junto con el resto.

### Separación entre servidor real y aplicación aislada de Supertest

La API principal utiliza los prefijos `/cart`, `/products` y `/categories`, según el apartado **Rutas canónicas**. En `tests/routes/cart.test.js`, la aplicación Express aislada se configura así:

```javascript
const app = express();
app.use(bodyParser.json());
app.use('/api/carts', cartRouter);
```

Por ello, el caso CP-07 utiliza `GET /api/carts/99999/items` en esa aplicación de prueba, mientras que el servidor normal expone las rutas de carrito bajo `/cart`. No se deben confundir ambos prefijos.

### Base de datos y preparación de pruebas

En `models/index.js`, cuando `NODE_ENV=test`, Sequelize utiliza SQLite **en memoria**, con `storage: ':memory:'`. En otro entorno, la configuración utiliza `./db.sqlite`. En `tests/setup/testDb.js`, `initTestDb()` realiza `sequelize.sync({ force: true })` y `closeTestDb()` cierra la conexión.

**Advertencia:** `force: true` recrea las tablas de la base de datos conectada. Antes de ejecutar pruebas hay que establecer `NODE_ENV=test`; evitar ejecutarlas contra una base persistente de trabajo.

## Cobertura

```powershell
$env:NODE_ENV = 'test'
npm.cmd run test:coverage
```

El script ejecuta `jest --coverage --detectOpenHandles --forceExit`. Salida registrada: `reports/coverage-run.txt`.

| Archivo | Sentencias | Ramas | Funciones | Líneas | Líneas sin cubrir |
| --- | ---: | ---: | ---: | ---: | --- |
| `services/pricing.js` | 100 % | **100 %** | 100 % | 100 % | — |
| `services/cartService.js` | 84.78 % | **83.33 %** | 83.33 % | 84.78 % | 93–103 |
| `services/productService.js` | 84.21 % | **84.61 %** | 62.50 % | 84.21 % | 7–11, 37, 87, 92, 95 |
| Proyecto completo (`All files`) | 69.49 % | 68.24 % | 53.84 % | 69.05 % | — |

Los dos servicios asignados superan el mínimo académico de **70 % de ramas por servicio**. El porcentaje global incluye módulos de rutas que no se evaluaron con ese mínimo.

Cobertura de ramas de `cartService.js` y `productService.js` en la entrega académica: 83.33 % y 84.61 %. Las líneas 93–103 de `cartService.js` (actualizar y eliminar ítems) siguen sin cubrir y se documentan como trabajo futuro.

## Lint

```bash
npm run lint
```

El script ejecuta `npx eslint models services routes` con la configuración `eslint.config.mjs` (`@eslint/js` recommended). La regla `eqeqeq` no forma parte de `eslint:recommended`.

- Salida limpia del commit final: `reports/lint-clean.txt` (exit code 0).
- Corrida en rojo con 5 violaciones de 2 reglas (`no-unused-vars` ×4 y `no-undef` ×1): `reports/lint-red.txt`, y el triage en `reports/triage-lint.md`.

## Mutación con Stryker

La mutación se aplica a **un único servicio**: `services/pricing.js`. Se usan tres configuraciones, una por corrida comparable. Cada una apunta a su propio archivo de Jest mediante `jest.configFile`, así que no hay que mover archivos entre corridas.

| Corrida | Configuración | Archivo de Jest | Pruebas | Score | Muertos | Sobrevivientes | Sin cobertura | Evidencia |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| Baseline (antes de la mejora) | — (ver nota) | `tests/services/pricing.test.js` antes de la mejora | 34 | **85.51 %** | 176 | 30 | 0 | `reports/mutation-baseline.txt` |
| Suite propia (después) | `stryker.pricing.config.json` | `jest.stryker.suite-propia.config.js` | 38 | **90.34 %** | 186 | 20 | 0 | `reports/stryker/suite-propia/` |
| Modelo tal cual (IA) | `stryker.ia-original.config.json` | `jest.stryker.ia-original.config.js` | 15 | **69.57 %** | 143 | 53 | 10 | `reports/stryker/ia-original/` |
| Modelo revisado (IA + analista) | `stryker.ia-revisada.config.json` | `jest.stryker.ia-revisada.config.js` | 34 | **91.79 %** | 189 | 17 | 0 | `reports/stryker/ia-revisada/` |

Las tres corridas comparables de la Tarea 2 son: suite propia, modelo tal cual y modelo revisado. Las tres se reprodujeron con los comandos siguientes y dieron exactamente los mismos números.

### Comandos

```powershell
npx stryker run stryker.pricing.config.json
npx stryker run stryker.ia-original.config.json
npx stryker run stryker.ia-revisada.config.json
```

Cada comando escribe su reporte HTML en `reports/stryker/<corrida>/mutation.html`. Para guardar el registro de texto, redirigir la salida a `log.txt` en esa misma carpeta.

`npx stryker run` sin argumentos usa `stryker.config.json`, la configuración original del proyecto, que muta todos los servicios. No se usó para las métricas.

### Notas de interpretación

- **Baseline:** se obtuvo con la suite propia antes de añadir las cuatro pruebas de la mejora, por lo que el archivo de pruebas de esa versión no está versionado. La evidencia es el texto `reports/mutation-baseline.txt`. Para reproducirla, se necesita esa versión de la suite.
- **Mutantes equivalentes:** algunos sobrevivientes son equivalentes (no cambian el comportamiento observable). Por ejemplo, el guard `typeof x !== 'number'` es redundante con `Number.isFinite(x)`. No se pueden matar sin cambiar el código. La clasificación completa está en `reports/sobrevivientes-baseline.md`.
- **Pendiente:** un mutante de la línea 159 (`if (true)` para cupones `fixed`) sigue vivo en la suite propia. Se corrige con la aserción `expect(result.coupon.type).toBe('fixed')`. No se aplicó para no alterar la medición registrada.

## Integración continua (GitHub Actions)

El pipeline está en `.github/workflows/ci.yml` y se ejecuta en **cada push y cada pull request**.

| Job | Qué ejecuta | Variables |
| --- | --- | --- |
| `lint` (ESLint) | `npm ci` y `npm run lint` | — |
| `test` (Jest) | `npm ci` y `npm test` | `NODE_ENV=test` |

Ambos jobs usan Node.js 22 y `ubuntu-latest`. El job falla si falla el comando correspondiente, así que una suite roja o un lint rojo marca el run como fallido.

### Verificación del pipeline

| Corrida | Rama | Commit | ESLint | Jest | Enlace |
| --- | --- | --- | --- | --- | --- |
| Commit de código (verde) | `task3-lint-triage-fuzz` | `1e928eb` | ✅ pasa | ✅ pasa | https://github.com/edjo16/ecommerce-api/actions/runs/45745868188 |
| Lint en rojo (demostración) | `ci/demo-lint-rojo` | `685a086` | ❌ falla | ✅ pasa | https://github.com/edjo16/ecommerce-api/actions/runs/45745435188 |
| Suite en rojo (demostración) | `ci/demo-test-rojo` | `69bdc8b` | ✅ pasa | ❌ falla | https://github.com/edjo16/ecommerce-api/actions/runs/45745455864 |

Las dos ramas `ci/demo-*` existen solo para demostrar que el job correspondiente falla. Son ramas de evidencia; pueden eliminarse cuando se cierre la entrega.

Una corrida fallida por la suite no es un error del pipeline: es el comportamiento esperado. Por eso los defectos H-01 y H-02 se marcaron con `it.failing` y no con `skip` ni eliminados: el pipeline sigue verde mientras el defecto exista, y deja de estarlo cuando se corrige el servicio.

## Evidencias

- Índice con cada evidencia, ruta, commit y enlace: [`reports/INDICE-EVIDENCIAS.md`](reports/INDICE-EVIDENCIAS.md).
- Documento de entregables y riesgo residual: [`reports/entregables-calidad.md`](reports/entregables-calidad.md).
- Informe final en PDF: [`reports/informe-final-calidad.pdf`](reports/informe-final-calidad.pdf).

## Limitaciones

- El pull request sigue abierto y sin fusionar; no se integró en `master`.
- El riesgo de sobreventa por lectura concurrente del inventario (documentado en el README, sección Cobro) no se reprodujo con una prueba concurrente.
- Los defectos H-01 y H-02 no se corrigieron, porque la especificación se conserva como hallazgo.
- Las ramas `ci/demo-*` son artificiales; no forman parte del código entregable.

## Verificación de reproducibilidad

Se verificó la instalación y ejecución de la suite desde una copia limpia del proyecto (`npm ci`), con Node.js v22 y npm 10. En la última ejecución local (`NODE_ENV=test npm test`): **9 suites, 125 pruebas, 125 PASS**. Las dos pruebas `it.failing` cuentan como PASS porque confirman el defecto. La cobertura de ramas de los servicios asignados supera el 70 %. Los resultados de CI están en la tabla de la sección anterior.

**Contenido sugerido del ZIP de entrega:** carpetas `models/`, `routes/`, `services/`, `tests/`, `.github/`, `reports/` y demás código fuente necesario; `package.json`, `package-lock.json`, un único `README.md` y los reportes. No incluir `node_modules`, credenciales, archivos `.env` con secretos ni copias duplicadas del README.
