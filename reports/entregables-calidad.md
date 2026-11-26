# Entregables de calidad — API de comercio electrónico

**Proyecto:** `ecommerce-app` (Express + Sequelize + SQLite)
**Módulo bajo análisis:** `services/pricing.js` (cálculo de cobro: descuentos, impuesto y envío)
**Rama de trabajo:** `task3-lint-triage-fuzz` (publicada en `origin`; ver sección 6)
**Entorno:** Node.js v22.12.0 en Windows; Jest 29.7; Stryker 8.x (`@stryker-mutator/core` ^8.6.0 según `package.json`); ESLint 9 con `eslint:recommended`.
**Rol:** analista de calidad.

## 0. Resumen

| Tarea | Resultado principal | Estado |
|-------|---------------------|--------|
| 1. Mutación (Stryker) | Score 85.51 % → 90.34 % con la misma configuración; 6 sobrevivientes clasificados; 6 mutantes de oráculo débil muertos (líneas 23, 33 y 159) | Completada, con un pendiente documentado |
| 2. Pruebas con IA | Modelo tal cual 69.57 %; modelo revisado 91.79 %; suite propia 90.34 % | Completada |
| 3. Lint, triage y fuzz | Lint limpio en el commit final; corrida roja con 5 violaciones de 2 reglas; prueba fuzz de 500 entradas; riesgo residual redactado | Completada; PR creado manualmente (sección 6) |

Hallazgos previos no corregidos (fuera de alcance, por regla del README): **H-01** (CP-05, cantidad 0 aceptada) y **H-02** (CP-06, cantidad negativa aceptada). Las pruebas siguen fallando a propósito; la suite completa tiene 125 pruebas, 2 fallan, 123 pasan.

---

## 1. Tarea 1 — Pruebas de mutación

### 1.1 Pasos ejecutados

1. Se verificó la línea base de la suite: 34 pruebas, 32 PASS y 2 FAIL (H-01/H-02), igual que en la evidencia académica.
2. Se añadió `testPathIgnorePatterns` para excluir `.stryker-tmp/`, porque Jest recogía los sandboxes de Stryker y duplicaba fallos.
3. Se eligió **un único servicio**: `services/pricing.js`, por ser una función pura sin base de datos (sin mocks frágiles) y con reglas numéricas que las mutaciones pueden alterar.
4. Se creó `stryker.pricing.config.json` (mutate: `services/pricing.js`, runner Jest, `coverageAnalysis: perTest`).
5. Se escribió la suite propia `tests/services/pricing.test.js` (38 pruebas) cubriendo envío, cupones, reparto de descuento, validaciones y límites.
6. Se ejecutó Stryker → **baseline**: 85.51 %.
7. Se clasificaron los sobrevivientes (ver 1.3).
8. Se mejoraron las pruebas para los oráculos débiles y se volvió a ejecutar Stryker **sin cambiar la configuración** → **después**: 90.34 %.

### 1.2 Entregables

| Entregable | Archivo |
|------------|---------|
| Configuración | `stryker.pricing.config.json` |
| Reporte baseline (texto) | `reports/mutation-baseline.txt` (+ `reports/mutation-baseline/`) |
| Reporte después (texto) | `reports/mutation-despues.txt` (+ `reports/mutation-despues/mutation.html`) |
| Reporte HTML | `reports/mutation/mutation.html` (última corrida) |
| Tabla de sobrevivientes | `reports/sobrevivientes-baseline.md` |
| Pruebas mejoradas | `tests/services/pricing.test.js` |

Nota: el HTML de la corrida baseline se sobrescribió por las corridas posteriores; su evidencia completa es el texto `reports/mutation-baseline.txt`, que contiene el mismo score y la lista de mutantes.

### 1.3 Sobrevivientes clasificados (6 mínimo)

| # | Archivo | Línea | Operador | Estado | Clase | Razón |
|---|---------|-------|----------|--------|-------|-------|
| 1 | services/pricing.js | 23:7 | ConditionalExpression | Muerto | Oráculo débil | No había prueba con cupón string; se añadió |
| 2 | services/pricing.js | 33:9 | EqualityOperator (`> 1` → `>= 1`) | Muerto | Límite | Faltaba el valor frontera `value = 1`; se añadió |
| 3 | services/pricing.js | 93:9 | ConditionalExpression / LogicalOperator | Sobrevive | Equivalente | `Number.isFinite` ya rechaza no-números; el `typeof` es redundante |
| 4 | services/pricing.js | 159:7 | ConditionalExpression (`→ true`) | Sobrevive (1 de 5) | Oráculo débil parcial | Cupón `fixed` sin aserción de `coupon.type`. **Pendiente** |
| 5 | services/pricing.js | 64:7 | ConditionalExpression | Sobrevive | Equivalente | Retorno temprano que devuelve los mismos ceros |
| 6 | services/pricing.js | 70:19 | EqualityOperator (`< → <=`) | Sobrevive | Equivalente | Índice extra que nunca se lee |

### 1.4 Mutantes de oráculo débil o no alcanzados

- Mutantes de oráculo débil o no alcanzados que pasaron a muertos: **6**
  - Línea 23: 1 mutante.
  - Línea 33: 1 mutante.
  - Línea 159: 4 de 5 mutantes (queda `if (true)`, pendiente de la sección 1.6).
- Se pedían al menos 3, así que se cumple. Línea 93 no cuenta: sus mutantes son equivalentes y no son matables.

### 1.5 Score antes y después (misma configuración)

| Métrica | Baseline | Después | Diferencia |
|---------|----------|---------|------------|
| Mutation score | 85.51 % | 90.34 % | +4.83 pp |
| Muertos | 176 | 186 | +10 |
| Sobrevivientes | 30 | 20 | −10 |
| Timeouts | 1 | 1 | 0 |

### 1.6 Pendiente técnico

Añadir `expect(result.coupon.type).toBe('fixed')` en la prueba de cupón fijo de `tests/services/pricing.test.js` debería matar el mutante restante de la línea 159. No se aplicó en esta entrega para no alterar la medición "después" que ya quedó registrada.

---

## 2. Tarea 2 — Comparación de pruebas con IA

### 2.1 Pasos ejecutados

1. **Prompt** a partir del código de `pricing.js` y las reglas A1 del README (umbral 50/5, cupones, orden de cálculo, errores). El prompt no menciona mutantes ni Stryker → `reports/prompt-ia.md`.
2. **Generación** de pruebas por el modelo, sin editar → `tests/ai-generated/pricing.ai-original.test.js` (15 pruebas, 15 PASS).
3. **Revisión crítica** por el analista: se añadieron aserciones sobre campos intermedios (`coupon.type`, `taxable`, descuentos por línea), los límites `value = 1` y `minSubtotal` igual al subtotal, y validaciones de tipo → `tests/ai-generated/pricing.ai-reviewed.test.js` (34 pruebas, 34 PASS).
4. **Stryker** sobre cada variante aislada (solo su archivo de prueba activo), con la misma configuración.
5. **Comparación** y memo.

### 2.2 Resultados

| Variante | Pruebas | Score | Muertos | Sobrevivientes | Sin cobertura |
|----------|---------|-------|---------|----------------|---------------|
| Suite propia | 38 | 90.34 % | 186 | 20 | 0 |
| Modelo tal cual | 15 | 69.57 % | 143 | 53 | 10 |
| Modelo revisado | 34 | 91.79 % | 189 | 17 | 0 |

Conclusión: el modelo sin revisión deja 10 mutantes sin cubrir y oráculos débiles. Tras la revisión, supera a la suite propia por 1.45 pp, aunque la diferencia es pequeña y las supervivencias residuales son en gran parte equivalentes.

### 2.3 Entregables

| Entregable | Archivo |
|------------|---------|
| Prompt | `reports/prompt-ia.md` |
| Pruebas originales (IA tal cual) | `tests/ai-generated/pricing.ai-original.test.js` |
| Pruebas revisadas | `tests/ai-generated/pricing.ai-reviewed.test.js` |
| Reportes | `reports/mutation-ai-original.txt`, `reports/mutation-ai-reviewed.txt`, carpetas `reports/mutation-ai-*/` |
| Tabla comparativa | sección 2.2 de este documento y `reports/memo-ia-comparacion.md` |
| Memo | `reports/memo-ia-comparacion.md` |
| Registro de IA | sección "Registro de IA" de `reports/memo-ia-comparacion.md` |

### 2.4 Corrección al memo

En una primera versión del memo se afirmó que la línea 93 y la línea 159 las mataban todas las variantes. La verificación contra los reportes mostró que la línea 93 es equivalente en las tres variantes y que la línea 159 sigue con un mutante vivo en la suite propia. El memo ya está corregido.

---

## 3. Tarea 3 — Análisis estático, triage y fuzz

### 3.1 Salida de lint en el commit final

Comando: `npm run lint` (= `npx eslint models services routes`), commit final `services/pricing.js` idéntico a `master`.
Archivo: `reports/lint-clean.txt`

```
> ecommerce-app@1.0.0 lint
> npx eslint models services routes
```

Exit code 0, sin errores ni advertencias.

### 3.2 Introducción de violaciones y corrida en rojo

Se introdujeron **5 violaciones de 2 reglas** existentes en `services/pricing.js`, en un commit propio de la rama:

- `no-unused-vars` × 4 (`dummyCompare`, `unusedVarOne`, `unusedVarTwo`, `nuncaInvocada`)
- `no-undef` × 1 (`variableQueNoExiste`, dentro de una función nunca invocada)

Salida real (`reports/lint-red.txt`, exit code 1):

```
C:\Users\edgar\UTP\ecommerce-api\services\pricing.js
  174:10  error  'dummyCompare' is defined but never used           no-unused-vars
  185:7   error  'unusedVarOne' is assigned a value but never used  no-unused-vars
  186:5   error  'unusedVarTwo' is assigned a value but never used  no-unused-vars
  189:10  error  'nuncaInvocada' is defined but never used          no-unused-vars
  190:10  error  'variableQueNoExiste' is not defined               no-undef

✖ 5 problems (5 errors, 0 warnings)
```

Nota: `==` en `dummyCompare` no se reportó porque `eslint:recommended` no incluye `eqeqeq`.

### 3.3 Triage

Documento completo: `reports/triage-lint.md`. Resumen:

| # | Regla | Hallazgo | Severidad | Acción |
|---|-------|----------|-----------|--------|
| 1 | no-undef | `variableQueNoExiste` | Alta (latente) | ReferenceError si se invocara; eliminado |
| 2 | no-unused-vars | `nuncaInvocada` | Media | Código muerto que oculta el hallazgo 1; eliminado |
| 3 | no-unused-vars | `dummyCompare` | Baja | Código muerto; eliminado |
| 4 | no-unused-vars | `unusedVarOne` | Baja | Eliminado |
| 5 | no-unused-vars | `unusedVarTwo` | Baja | Eliminado |

### 3.4 Prueba complementaria: fuzz / propiedades

Archivo: `tests/services/pricing.fuzz.test.js`

| Elemento | Detalle |
|----------|---------|
| Generador | 1–4 ítems por entrada. Con probabilidad 0.85, ítem válido (cantidad 1–10, precio 0–200 con dos decimales, taxRate en {0, 0.07, 0.16, 0.5, 1}); en otro caso, ítem inválido (cantidad 0/−1/2.5, precio −5/'100'/null, taxRate −0.1/1.5). Cupón: null (10 %), percent con value 0.01–1 y minSubtotal 0–20 (45 %), fixed con value 0.01–30 (35 %), o cupón inválido (10 %). |
| Semilla | Fija (`20261125`), reproducible |
| Número de entradas | **500** totales: **313 válidas** y **187 inválidas** (la prueba exige más de 50 de cada grupo) |
| Oráculo, entradas válidas | `total = taxable + tax + shipping`; `shipping = 0` si `taxable ≥ 50`, si no 5; montos finitos y no negativos; no lanza error |
| Oráculo, entradas inválidas | `priceCheckout` debe lanzar error; si acepta la entrada, es fallo |
| Insumo concreto 1 | 1 ítem, cantidad 1, precio 100, taxRate 0.07, sin cupón → subtotal 100, impuesto 7, envío 0, total 107 |
| Insumo concreto 2 | 2 ítems de 40 (cantidad 2, taxRate 0) con cupón fixed 30 → subtotal 80, descuento 30, base 50, envío 0, total 50 |
| Resultado | **PASS** (4 de 4 pruebas del archivo). Ningún fallo en las 500 entradas |

Historial del fuzz (honesto): la primera ejecución falló en 3 casos. Eran errores del oráculo del analista, no de `pricing.js`: el validador de cupones no consideraba que `minSubtotal` depende del subtotal de los ítems. Se corrigió el oráculo. Después, el conteo mostró que solo 21 de 500 entradas eran válidas, así que el generador se sesgó hacia entradas válidas y se añadió la aserción de mínimo de casos en cada grupo.

### 3.5 Riesgo residual de la API

**Riesgo:** sobreventa o descuento insuficiente de inventario por actualización perdida en el cobro concurrente.

- **Descripción.** `CheckoutService.checkout` lee `product.inventory` dentro de la transacción, sin bloqueo ni actualización condicional, y luego guarda el valor absoluto (`product.inventory -= quantity; product.save()`). Dos cobros simultáneos sobre el mismo producto pueden leer el mismo stock; el segundo guardado sobrescribe el descuento del primero. El inventario queda mayor que el real y se pueden vender unidades que no existen.
- **Plausibilidad.** Alta: el propio README lo reconoce en la sección Cobro ("Dos cobros simultáneos pueden leer el mismo inventario antes de grabar y descontar de menos"), el endpoint es público y la transacción de SQLite es `DEFERRED`, que no evita la lectura obsoleta.
- **Impacto.** Alto: pedidos sin stock, cancelaciones manuales y reputación. Probabilidad: media con tráfico concurrente; baja con el volumen actual.
- **Evidencia.** Identificado por inspección de código y de la regla documentada. **No reproducido** en esta entrega: no hay prueba concurrente.
- **Mitigación propuesta.** Decremento relativo y condicional: `UPDATE Products SET inventory = inventory - :qty WHERE id = :id AND inventory >= :qty`, verificando las filas afectadas dentro de la transacción; prueba de concurrencia con `Promise.all` sobre SQLite de archivo.
- **Riesgo residual tras la mitigación.** Bajo mientras la base sea SQLite de un solo proceso. Con varias instancias hará falta bloqueo a nivel de base de datos.

---

## 4. Mapa de archivos entregados

| Ruta | Contenido |
|------|-----------|
| `stryker.pricing.config.json` | Configuración de Stryker (único servicio) |
| `package.json` | `testPathIgnorePatterns` para `.stryker-tmp/` |
| `.gitignore` | Excluye `.stryker-tmp/` |
| `tests/services/pricing.test.js` | Suite propia (38 pruebas) |
| `tests/services/pricing.fuzz.test.js` | Prueba fuzz/propiedades (4 pruebas) |
| `tests/ai-generated/pricing.ai-original.test.js` | Pruebas generadas por IA sin editar |
| `tests/ai-generated/pricing.ai-reviewed.test.js` | Pruebas generadas por IA tras revisión |
| `reports/prompt-ia.md` | Prompt |
| `reports/sobrevivientes-baseline.md` | Tabla de sobrevivientes |
| `reports/memo-ia-comparacion.md` | Memo comparativo y registro de IA |
| `reports/mutation-*.txt`, `reports/mutation-*/`, `reports/mutation/` | Reportes de Stryker |
| `reports/lint-red.txt` | Corrida roja de lint |
| `reports/lint-clean.txt` | Salida limpia de lint en el commit final |
| `reports/triage-lint.md` | Triage de hallazgos |
| `reports/entregables-calidad.md` | Este documento |

---

## 5. Incidentes y correcciones durante el trabajo

| # | Incidente | Acción |
|---|-----------|--------|
| 1 | Jest ejecutaba también los sandboxes de Stryker en `.stryker-tmp/` | `testPathIgnorePatterns` y `.gitignore` |
| 2 | `--config` no existe en Stryker 8 CLI | Se pasa la configuración como argumento posicional |
| 3 | La primera corrida "solo IA" incluyó la suite propia en `tests/tmp-hold/`, invalidando esa medición | Se descartó, se aisló cada variante y se repitió. Los números publicados son de las corridas aisladas |
| 4 | Se borró por error `pricing.ai-reviewed.test.js.disabled` durante la limpieza | Se recreó con el mismo texto de la versión revisada. Tras recrearlo **no se volvió a medir** su score; el 91.79 % proviene de la corrida original |
| 5 | Atribución errónea de la línea 93 como "muerta" y de la 159 como "muerta del todo" | Corregido tras verificar contra `reports/*.txt` |
| 6 | Triage inicial decía que `no-undef` rompería la carga del módulo | Corregido: la referencia estaba dentro de una función nunca invocada |
| 7 | Fuzz: oráculo de cupones incorrecto y generador sesgado a entradas inválidas | Corregidos (sección 3.4) |
| 8 | Triage inicial mencionaba `eqeqeq` como violada | Corregido: `eqeqeq` no está en `eslint:recommended` |
| 9 | Se escribió un valor esperado de envío incorrecto en una prueba y se corrigió antes de medir | Corregido |

Limitaciones: `gh` no está instalado, así que el PR no se pudo crear desde la terminal; `db.sqlite` no se modificó; los defectos H-01/H-02 no se corrigieron porque la regla del README obliga a conservar la especificación.

---

## 6. Solicitud de fusión (sin fusionar)

- **Rama:** `task3-lint-triage-fuzz` publicada en `origin` (`https://github.com/edjo16/ecommerce-api`).
- **Commits:**
  1. `[TEST] Tareas 1 y 2: mutación con Stryker sobre pricing.js y comparación de pruebas con IA`
  2. `[TEST] Tarea 3: violaciones intencionales de lint (corrida en rojo)`
  3. `[TEST] Tarea 3: lint limpio, triage y prueba fuzz de priceCheckout`
  4. Ajustes de fuzz, correcciones de documentación (commit de cierre)
- **PR:** `master ← task3-lint-triage-fuzz`. **Sin fusionar.**
- **Enlace para crear el PR:** `https://github.com/edjo16/ecommerce-api/pull/new/task3-lint-triage-fuzz`
- **Estado:** rama publicada; el PR debe abrirse con el enlace anterior, porque no hay GitHub CLI ni credenciales disponibles en este entorno para crearlo automáticamente.
