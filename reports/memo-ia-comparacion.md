# Comparación de pruebas con IA — Memo y resultados

## 1. Prompt enviado al modelo

Se preparó un prompt a partir del código fuente de `services/pricing.js` y las reglas funcionales (A1) del README (umbral de envío 50/5, validación de cupón, reglas de descuento e impuesto, clases válidas/inválidas/límites). El prompt **no mostró mutantes ni mencionó Stryker**; solo pidió pruebas unitarias con Jest para `priceCheckout`. Ver `reports/prompt-ia.md`.

## 2. Variantes ejecutadas

Cada variante se ejecutó de forma aislada (solo su archivo de prueba activo) con la misma configuración de Stryker (`stryker.pricing.config.json`, mutando solo `services/pricing.js`).

| Variante | Archivo de pruebas | N.º pruebas | Estado |
|----------|-------------------|-------------|--------|
| Suite propia (analista) | `tests/services/pricing.test.js` | 38 | Base del analista |
| Modelo tal cual (IA) | `tests/services/pricing.ai-original.test.js` | 15 | Sin editar, tal cual generó el modelo |
| Modelo revisado (IA + analista) | `tests/services/pricing.ai-reviewed.test.js` | 34 | Tras revisión del analista (oráculos fuertes, límites, aserciones de campos) |

## 3. Resultados de Stryker (mutation score sobre `services/pricing.js`)

| Métrica | Suite propia | IA tal cual | IA revisada |
|---------|-------------|-------------|-------------|
| Mutation score | **90.34 %** | **69.57 %** | **91.79 %** |
| Mutantes totales | 207 | 207 | 207 |
| Muertos | 186 | 143 | 189 |
| Sobrevivientes | 20 | 53 | 17 |
| Timeouts | 1 | 1 | 1 |
| Sin cobertura | 0 | 10 | 0 |
| Errores | 0 | 0 | 0 |

## 4. Tabla comparativa por dimensión

| Dimensión | Suite propia | IA tal cual | IA revisada |
|-----------|-------------|-------------|-------------|
| Cobertura de ramas (mutados) | Alta | Media (10 mutantes sin cubrir) | Alta |
| Oráculos (aserciones de campos) | Fuertes (subtotal, discount, taxable, tax, shipping, total, líneas, coupon.type) | Débiles (solo total/subtotal en la mayoría) | Fuertes |
| Casos límite (value=1, minSubtotal=0, taxRate 0/1, string cupón/precio) | Sí | No | Sí |
| Validación de tipos no numéricos | Sí | No | Sí |
| Aserción de `coupon.type` (percent/fixed) | Sí | No | Sí |
| Mutantes de oráculo débil eliminados | 4 (líneas 23, 33, 93, 159) | 0 | 4 (líneas 23, 33, 93, 159) |

## 5. Mutantes concretos citados

- **Línea 23:7** (`typeof coupon !== 'object'` → `false`): IA tal cual no lo mata porque no prueba un cupón como string. Tanto suite propia como IA revisada sí lo matan (prueba `rechaza cupón como string`).
- **Línea 33:9** (`coupon.value > 1` → `>= 1`): IA tal cual no testa el límite `value = 1`. Suite propia e IA revisada incluyen `acepta el valor límite value = 1` y lo matan.
- **Línea 93:9** (`typeof item.unitPrice !== 'number'` → `false`): IA tal cual no testa `unitPrice` como string. Suite propia e IA revisada lo matan.
- **Línea 159:7** (`if (coupon.type === 'percent')` → `false`): IA tal cual no aserta `result.coupon.type`. Suite propia e IA revisadas aseran el tipo del cupón devuelto.

## 6. Conclusiones del analista

1. **Las pruebas generadas por IA no son suficientes tal cual.** El modelo produjo 15 pruebas con oráculos débiles (verifica solo totales, no campos intermedios ni el objeto cupón devuelto) y omitió casos límite críticos (value=1, string como precio/cupón, taxRate en bordes), obteniendo un mutation score de solo 69.57 % y 10 mutantes sin cobertura.
2. **Una revisión humana cierra la brecha.** Tras añadir aserciones sobre campos (`coupon.type`, `taxable`, líneas de descuento), casos límite y validación de tipos, el score de la IA revisada sube a 91.79 %, ligeramente por encima de la suite propia (90.34 %).
3. **Recomendación:** usar IA como borrador inicial, pero siempre revisar y fortalecer oráculos y límites antes de aceptar las pruebas. La IA acelera la generación, pero no sustituye el juicio del analista en la selección de aserciones.

## Registro de IA

| Fecha | Modelo | Prompt | Pruebas generadas | Pruebas revisadas | Score IA tal cual | Score IA revisada |
|-------|--------|--------|-------------------|-------------------|-------------------|-------------------|
| 2026-11-25 | IA (este proceso) | `reports/prompt-ia.md` | `tests/services/pricing.ai-original.test.js` (15 pruebas) | `tests/services/pricing.ai-reviewed.test.js` (34 pruebas) | 69.57 % | 91.79 % |
