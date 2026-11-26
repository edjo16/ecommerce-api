# Triage de hallazgos de lint — rama `task3-lint-triage-fuzz`

Configuración: `eslint.config.mjs` (`@eslint/js` recommended), script `npm run lint` = `npx eslint models services routes`.

## 1. Evidencia de corrida en rojo

Commit de la corrida roja: segundo commit de la rama (`[TEST] Tarea 3: violaciones intencionales de lint`).
Archivo: `reports/lint-red.txt`

```
C:\Users\edgar\UTP\ecommerce-api\services\pricing.js
  174:10  error  'dummyCompare' is defined but never used           no-unused-vars
  185:7   error  'unusedVarOne' is assigned a value but never used  no-unused-vars
  186:5   error  'unusedVarTwo' is assigned a value but never used  no-unused-vars
  189:10  error  'nuncaInvocada' is defined but never used          no-unused-vars
  190:10  error  'variableQueNoExiste' is not defined               no-undef

✖ 5 problems (5 errors, 0 warnings)
```

Resultado: exit code 1. Se introdujeron **5 violaciones de 2 reglas** (`no-unused-vars` ×4, `no-undef` ×1), tal como exige la tarea (mínimo 4 de 2 reglas).

Nota: se intentó también `eqeqeq` (comparaciones `==` en `dummyCompare`), pero la configuración `eslint:recommended` no incluye esa regla, por lo que no se reportó. Se documenta como límite de la configuración, no como hallazgo.

## 2. Evidencia de corrida limpia (commit final)

Commit final: tercer commit de la rama, `services/pricing.js` restaurado a la versión de `master`.
Archivo: `reports/lint-clean.txt` (salida de `npm run lint`, exit code 0, sin errores):

```
> ecommerce-app@1.0.0 lint
> npx eslint models services routes
```

## 3. Clasificación de hallazgos (triage)

| # | Regla | Ubicación | Hallazgo | Severidad | Análisis y acción | Estado |
|---|-------|-----------|----------|-----------|-------------------|--------|
| 1 | `no-undef` | `services/pricing.js:190:10` | `variableQueNoExiste` no definida | **Alta (latente)** | Referencia a un identificador inexistente. Hoy está dentro de `nuncaInvocada()`, así que no se ejecuta; si alguien llamara esa función lanzaría `ReferenceError` en tiempo de ejecución. Un linter es el único filtro que lo detecta, por eso el triage lo marca como prioridad. | Corregido en commit final (eliminado) |
| 2 | `no-unused-vars` | `services/pricing.js:189:10` | `nuncaInvocada` definida y no usada | Media | Código muerto que además contiene el hallazgo 1. Eliminar la función completa. | Corregido |
| 3 | `no-unused-vars` | `services/pricing.js:174:10` | `dummyCompare` definida y no usada | Baja | Código muerto; contiene comparaciones `==` que no son parte de la especificación. | Corregido |
| 4 | `no-unused-vars` | `services/pricing.js:185:7` | `unusedVarOne` asignada y no usada | Baja | Variable sin uso. Eliminar. | Corregido |
| 5 | `no-unused-vars` | `services/pricing.js:186:5` | `unusedVarTwo` asignada y no usada | Baja | Variable sin uso (declarada con `let` sin reasignar). Eliminar. | Corregido |

Criterio de severidad: un hallazgo es **alto** si puede causar un fallo en tiempo de ejecución en una ruta alcanzable; **medio** si es código muerto que oculta un defecto; **bajo** si solo afecta a la limpieza del código.

Corrección: en el commit final se eliminó todo el bloque de violaciones, dejando `services/pricing.js` idéntico a `master`. Así el commit final pasa `npm run lint` sin errores.

## 4. Solicitud de fusión (sin fusionar)

- Rama: `task3-lint-triage-fuzz` (creada desde `master`).
- Commits de la rama:
  1. Entregables de las Tareas 1 y 2 (mutación e IA).
  2. Violaciones intencionales de lint (corrida en rojo).
  3. Lint limpio, prueba fuzz y triage.
- Pull request: `master ← task3-lint-triage-fuzz`. **No se fusiona.** Se deja abierto para revisión, porque la rama contiene el historial rojo a propósito y los reviewers deben ver el antes y el después.
- Estado del PR: ver sección "Estado de publicación" en `reports/entregables-calidad.md`.
