# Clasificación de sobrevivientes — Stryker sobre `services/pricing.js`

Configuración: `stryker.pricing.config.json` (mutate: `services/pricing.js`, runner Jest, `coverageAnalysis: perTest`). No se cambió entre corridas.

**Score inicial:** 85.51 % (176 muertos, 30 sobrevivientes, 1 timeout, 207 mutantes).
Evidencia: `reports/mutation-baseline.txt` y `reports/mutation/mutation.html`.

## 1. Tabla de sobrevivientes (6 clasificados)

Clases usadas: **Oráculo débil** (el test ejecuta el código pero no verifica el resultado que el mutante cambia), **Límite** (falta un valor frontera), **Equivalente** (el mutante no cambia el comportamiento observable).

| # | Archivo | Línea | Operador | Estado (tras mejora) | Clase | Razón |
|---|---------|-------|----------|----------------------|-------|-------|
| 1 | `services/pricing.js` | 23:7 | `ConditionalExpression` (`typeof coupon !== 'object'` → `false`) | **Muerto** | Oráculo débil | Ninguna prueba enviaba un cupón string. Al quedar solo `Array.isArray`, el string pasaba y fallaba con otro mensaje. Se añadió la prueba `rechaza cupón como string`. |
| 2 | `services/pricing.js` | 33:9 | `EqualityOperator` (`coupon.value > 1` → `>= 1`) | **Muerto** | Límite | No existía prueba con `value = 1`, valor frontera que debe aceptarse. Se añadió `acepta el valor límite value = 1`. |
| 3 | `services/pricing.js` | 93:9 | `ConditionalExpression` / `LogicalOperator` sobre `typeof item.unitPrice !== 'number'` | **Sobrevive** | **Equivalente** | `Number.isFinite(x)` ya devuelve `false` para cualquier no-número, así que el `typeof` es redundante. La prueba con string se añadió, pero no puede matar estos mutantes sin cambiar el código. No se cuenta como muerto. |
| 4 | `services/pricing.js` | 159:7 | `ConditionalExpression` (`coupon.type === 'percent'` → `true`) | **Sobrevive** (1 de 5) | Oráculo débil (parcial) | Se mataron 4 de 5 mutantes de esta línea al aserta `result.coupon.type === 'percent'`. Queda `if (true)`: con un cupón `fixed` el mutante devuelve un objeto `percent` con `minSubtotal: NaN`, pero la prueba de `fixed` no aserta `coupon.type`. **Pendiente:** añadir `expect(result.coupon.type).toBe('fixed')` en la prueba de cupón fijo. |
| 5 | `services/pricing.js` | 64:7 | `ConditionalExpression` (`discountCents === 0` → `false`) | Sobrevive | Equivalente | El bloque `if` solo devuelve `shares`, que ya son ceros por la inicialización de `new Array(n).fill(0)`. Saltarlo no cambia la salida. |
| 6 | `services/pricing.js` | 70:19 | `EqualityOperator` (`i < length` → `i <= length`) | Sobrevive | Equivalente | La iteración extra escribe en `shares[length]`, índice que nunca se lee; la salida es idéntica. |

## 2. Plan de muerte de mutantes

Se pidió matar al menos 3 mutantes de oráculo débil o no alcanzados. Resultado real:

- **Muertos completos:** líneas 23 (1 mutante) y 33 (1 mutante).
- **Muerto parcial:** línea 159 (4 de 5 mutantes). El restante requiere aserción de `fixed`.
- **No muertos por equivalencia:** línea 93 (los mutantes con `typeof` redundante).

Por tanto se cumple el mínimo (≥ 3) con 2 completos y 1 parcial, y se documenta el pendiente.

## 3. Comparación de score (misma configuración)

| Métrica | Antes (baseline) | Después | Diferencia |
|---------|------------------|---------|------------|
| Mutation score | 85.51 % | 90.34 % | +4.83 pp |
| Muertos | 176 | 186 | +10 |
| Sobrevivientes | 30 | 20 | −10 |
| Timeouts | 1 | 1 | 0 |
| Errores | 0 | 0 | 0 |

Evidencia: `reports/mutation-baseline.txt`, `reports/mutation-despues.txt`.

Nota: las 20 supervivencias restantes mezclan dos tipos. Los guards `typeof` redundantes con `Number.isFinite` (líneas 29, 36, 93, 96) y los bucles/retornos equivalentes (líneas 64, 70, 71) son equivalentes; no se pueden matar sin cambiar el código. El mutante `if (true)` de la línea 159 sí es matable con la aserción pendiente. No se cambió la configuración para mejorar el score.
