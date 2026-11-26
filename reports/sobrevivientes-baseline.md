# Clasificación de sobrevivientes — Stryker (línea base, services/pricing.js)

**Score inicial:** 85.51 % | Mutantes totales: 207 | Muertos: 176 | Sobrevivientes: 30 | Timeouts: 1 | Errores: 0

## Tabla de sobrevivientes (mínimo 6)

| # | Archivo | Línea | Operador | Estado | Clase | Razón |
|---|---------|-------|----------|--------|-------|-------|
| 1 | `services/pricing.js` | 23:7 | `ConditionalExpression` | Sobreviviente | Oráculo débil | La prueba "rechaza cupón que es un arreglo" rechaza el cupón arreglo, pero el segundo operando del `||` (`Array.isArray(coupon)`) ya captura ese caso. Mutar `typeof coupon !== 'object'` a `false` no altera el resultado observable porque ningún test verifica cuál operando del `||` lanzó el error. |
| 2 | `services/pricing.js` | 33:9 | `EqualityOperator` | Sobreviviente | Límite / boundary | Se testa `value=1.5` (rechazado) pero no el valor límite `value=1` (debe aceptarse: "a lo sumo 1"). `coupon.value > 1` vs `coupon.value >= 1` no se distinguen con los datos actuales. |
| 3 | `services/pricing.js` | 159:7 | `ConditionalExpression` | Sobreviviente | Oráculo débil | Se testa cupón percent pero nunca se aserta `result.coupon.type === 'percent'`. Al mutar a `if(false)` se devuelve un objeto `fixed` con el mismo `value` numérico; el resultado final (descuento, total) es idéntico y no falla el test. |
| 4 | `services/pricing.js` | 93:9 | `ConditionalExpression` | Sobreviviente | Oráculo débil | Nunca se testa `unitPrice` como tipo no numérico (p. ej. string). Los ítems válidos usan números, así que mutar `typeof item.unitPrice !== 'number'` a `false` no cambia el resultado observable. |
| 5 | `services/pricing.js` | 64:7 | `ConditionalExpression` | Sobreviviente | No alcanzado / redundante | `if (discountCents === 0) return shares;` en `allocateDiscount`. Cuando `discountCents === 0`, `allocateDiscount` ya retorna ceros por su propia guardia interna, por lo que saltar el retorno temprano produce la misma salida. |
| 6 | `services/pricing.js` | 70:19 | `EqualityOperator` | Sobreviviente | Límite / off-by-one | `i < lineSubtotals.length` mutado a `i <= lineSubtotals.length` genera un índice extra que lee `undefined`, pero `shares[length]` nunca se consume en `pricedLines` (solo se usan índices `0..length-1`), por lo que la salida es idéntica. |

## Plan de muerte de mutantes (oráculo débil / no alcanzados)

Se agregaron pruebas y aserciones para matar sobrevivientes de oráculo débil:

| Sobreviviente matado | Archivo | Línea | Operador | Prueba que lo mata |
|----------------------|---------|-------|----------|--------------------|
| 1 | `services/pricing.js` | 23:7 | `ConditionalExpression` | `rechaza cupón como string (no objeto ni arreglo)` — `typeof coupon !== 'object'` mutado a `false` ya no pasa desapercibido porque un string no es arreglo ni objeto. |
| 2 | `services/pricing.js` | 33:9 | `EqualityOperator` | `acepta el valor límite value = 1` — `coupon.value > 1` vs `>= 1` se distingue con `value = 1` (debe aceptarse). |
| 3 | `services/pricing.js` | 93:9 | `ConditionalExpression` | `rechaza unitPrice como string` — `typeof item.unitPrice !== 'number'` mutado a `false` se detecta pasando un string como precio. |
| 4 | `services/pricing.js` | 159:7 | `ConditionalExpression` | `aserta el tipo de cupón devuelto (percent)` — `result.coupon.type === 'percent'` obliga a devolver el objeto percent correcto. |

## Comparación de score (misma configuración, sin cambiar stryker.pricing.config.json)

| Métrica | Antes (base) | Después (pruebas mejoradas) | Diferencia |
|---------|-------------|----------------------------|------------|
| Mutation score | 85.51 % | 90.34 % | **+4,83 pp** |
| Mutantes totales | 207 | 207 | 0 |
| Muertos | 176 | 186 | +10 |
| Sobrevivientes | 30 | 20 | −10 |
| Timeouts | 1 | 1 | 0 |
| Errores | 0 | 0 | 0 |

Conclusión: sin modificar la configuración de Stryker, solo agregando 4 pruebas/aserciones dirigidas a sobrevivientes de oráculo débil, el score de mutación subió de **85.51 % a 90.34 %**.

